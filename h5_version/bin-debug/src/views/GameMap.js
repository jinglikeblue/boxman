var GameMap = (function (_super) {
    __extends(GameMap, _super);
    function GameMap(levelVO) {
        _super.call(this);
        this._levelVO = levelVO;
        this.initUnits();
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        NoticeManager.addNoticeAction(GameNotice.MAKE_ROLE_MOVE, this.moveNotice, this);
        NoticeManager.addNoticeAction(GameNotice.BOX_MOVED, this.boxMovedNotice, this);
        NoticeManager.addNoticeAction(GameNotice.BACK_STEP, this.backStepNotice, this);
    }
    var __egretProto__ = GameMap.prototype;
    __egretProto__.dispose = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        NoticeManager.removeNoticeAction(GameNotice.MAKE_ROLE_MOVE, this.moveNotice, this);
        NoticeManager.removeNoticeAction(GameNotice.BOX_MOVED, this.boxMovedNotice, this);
        NoticeManager.removeNoticeAction(GameNotice.BACK_STEP, this.backStepNotice, this);
    };
    __egretProto__.backStepNotice = function (n) {
        this._role.backStep();
    };
    __egretProto__.boxMovedNotice = function (n) {
        this.checkLevelComplete();
    };
    __egretProto__.moveNotice = function (n) {
        this._role.move(n.data);
    };
    __egretProto__.enterFrameHandler = function (e) {
        this.deepSort();
    };
    //初始化游戏的单元
    __egretProto__.initUnits = function () {
        var obj;
        for (var k in this._levelVO.units) {
            var unitVO = this._levelVO.units[k];
            switch (unitVO.unitType) {
                case UnitType.BLOCK:
                    obj = new Block(unitVO);
                    break;
                case UnitType.BOX:
                    obj = new Box(unitVO);
                    obj.refresh();
                    break;
                case UnitType.ROLE:
                    this._role = new Role(unitVO);
                    obj = this._role;
                    break;
            }
            if (obj) {
                obj.x = MapInfo.TILE_SIZE * unitVO.gridX + (MapInfo.TILE_SIZE >> 1);
                obj.y = MapInfo.TILE_SIZE * unitVO.gridY + (MapInfo.TILE_SIZE >> 1);
                this.addChild(obj);
            }
        }
        for (var k in this._levelVO.targetGrid) {
            var targetVO = this._levelVO.targetGrid[k];
            obj = new Target(targetVO);
            obj.x = MapInfo.TILE_SIZE * targetVO.gridX + (MapInfo.TILE_SIZE >> 1);
            obj.y = MapInfo.TILE_SIZE * targetVO.gridY + (MapInfo.TILE_SIZE >> 1);
            this.addChild(obj);
        }
        this.deepSort();
        this.checkLevelComplete();
    };
    __egretProto__.deepSort = function () {
        var childCount = this.numChildren;
        var list = [];
        var targets = [];
        for (var i = 0; i < childCount; i++) {
            var child = this.getChildAt(i);
            if (child instanceof Target) {
                targets.push(child);
            }
            else {
                this.sortInsertChilds(child, list);
            }
        }
        childCount = list.length;
        for (i = 0; i < childCount; i++) {
            this.addChildAt(list[i], i);
        }
        childCount = targets.length;
        for (i = 0; i < childCount; i++) {
            this.addChildAt(targets[i], 0);
        }
    };
    __egretProto__.sortInsertChilds = function (child, list) {
        var listLength = list.length;
        var temp;
        for (var i = 0; i < listLength; i++) {
            temp = list[i];
            if (child.y < temp.y) {
                list.splice(i, 0, child);
                return;
            }
            else if (child.y == temp.y) {
                if (child.x < temp.x) {
                    list.splice(i, 0, child);
                    return;
                }
            }
        }
        list.push(child);
    };
    __egretProto__.checkLevelComplete = function () {
        var levelVO = DataCenter.level;
        for (var flag in levelVO.targetGrid) {
            var unitVO = levelVO.gridDic[flag];
            if (null == unitVO || unitVO.unitType != UnitType.BOX) {
                return;
            }
        }
        //能到这里说明关卡通过了
        NoticeManager.sendNotice(new GameNotice(GameNotice.LEVEL_COMPLETE));
    };
    return GameMap;
})(egret.Sprite);
GameMap.prototype.__class__ = "GameMap";
//# sourceMappingURL=GameMap.js.map