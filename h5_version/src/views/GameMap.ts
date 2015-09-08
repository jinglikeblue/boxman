class GameMap extends egret.Sprite
{
    private _role: Role;

    private _levelVO: LevelVO;
    public constructor(levelVO: LevelVO)
    {
        super();
        this._levelVO = levelVO;
        this.initUnits()

        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        NoticeManager.addNoticeAction(GameNotice.MAKE_ROLE_MOVE, this.moveNotice, this);
        NoticeManager.addNoticeAction(GameNotice.BOX_MOVED, this.boxMovedNotice, this);
        NoticeManager.addNoticeAction(GameNotice.BACK_STEP, this.backStepNotice, this);
    }

    public dispose(): void
    {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        NoticeManager.removeNoticeAction(GameNotice.MAKE_ROLE_MOVE, this.moveNotice, this);
        NoticeManager.removeNoticeAction(GameNotice.BOX_MOVED, this.boxMovedNotice, this);
        NoticeManager.removeNoticeAction(GameNotice.BACK_STEP, this.backStepNotice, this);
    }

    private backStepNotice(n: GameNotice): void
    {
        this._role.backStep();
    }

    private boxMovedNotice(n: GameNotice): void
    {
        this.checkLevelComplete();
    }

    private moveNotice(n: GameNotice): void
    {
        this._role.move(n.data);
    }

    private enterFrameHandler(e: egret.Event): void
    {
        this.deepSort();
    }

    //初始化游戏的单元
    private initUnits(): void
    {
        var obj: AUnit;
        for (var k in this._levelVO.units)
        {
            var unitVO: AUnitVO = this._levelVO.units[k];
            switch (unitVO.unitType)
            {
                case UnitType.BLOCK:
                    obj = new Block(unitVO);
                    break;
                case UnitType.BOX:
                    obj = new Box(<BoxVO>unitVO);
                    (<Box>obj).refresh();
                    break;
                case UnitType.ROLE:
                    this._role = new Role(<RoleVO>unitVO);
                    obj = this._role;
                    break;
            }

            if (obj)
            {
                obj.x = MapInfo.TILE_SIZE * unitVO.gridX + (MapInfo.TILE_SIZE >> 1);
                obj.y = MapInfo.TILE_SIZE * unitVO.gridY + (MapInfo.TILE_SIZE >> 1);
                this.addChild(obj);
            }
        }

        for (var k in this._levelVO.targetGrid)
        {
            var targetVO: TargetVO = this._levelVO.targetGrid[k];
            obj = new Target(targetVO);
            obj.x = MapInfo.TILE_SIZE * targetVO.gridX + (MapInfo.TILE_SIZE >> 1);
            obj.y = MapInfo.TILE_SIZE * targetVO.gridY + (MapInfo.TILE_SIZE >> 1);
            this.addChild(obj);
        }

        this.deepSort();
        this.checkLevelComplete();
    }

    private deepSort(): void
    {
        var childCount: number = this.numChildren;
        var list: any[] = [];

        var targets: any[] = [];
        for (var i: number = 0; i < childCount; i++)
        {
            var child: egret.DisplayObject = this.getChildAt(i);
            if (child instanceof Target)
            {
                targets.push(child);
            }
            else
            {
                this.sortInsertChilds(child, list);
            }
        }

        childCount = list.length;
        for (i = 0; i < childCount; i++)
        {
            this.addChildAt(list[i], i);
        }

        childCount = targets.length;
        for (i = 0; i < childCount; i++)
        {
            this.addChildAt(targets[i], 0);
        }
    }

    private sortInsertChilds(child: egret.DisplayObject, list: any[]): void
    {
        var listLength: number = list.length;
        var temp: egret.DisplayObject;
        for (var i: number = 0; i < listLength; i++)
        {
            temp = list[i];
            if (child.y < temp.y)
            {
                list.splice(i, 0, child);
                return;
            }
            else if (child.y == temp.y)
            {
                if (child.x < temp.x)
                {
                    list.splice(i, 0, child);
                    return;
                }
            }

        }

        list.push(child);
    }

    private checkLevelComplete(): void
    {
        var levelVO: LevelVO = DataCenter.level;
        for (var flag in levelVO.targetGrid)
        {
            var unitVO: AUnitVO = levelVO.gridDic[flag];
            if (null == unitVO || unitVO.unitType != UnitType.BOX)
            {
                return;
            }
        }
			
        //能到这里说明关卡通过了
        NoticeManager.sendNotice(new GameNotice(GameNotice.LEVEL_COMPLETE));
    }
}