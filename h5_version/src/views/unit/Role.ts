class Role extends AUnit
{
    public static MOVE_STATE: number = 1;
    public static STAND_STATE: number = 0;

    private _standAssetsName: any = {};
    private _moveAssetsName: any = {};
    private _mc: egret.MovieClip;
    private _roleVO: RoleVO;
    private _move: MoveCompute;
    private _moveDir: number = Direction.NONE;
    private _bootSound: egret.Sound;

    public constructor(vo: RoleVO)
    {
        super(vo);
        this._roleVO = vo;
        this.init();
    }

    private init(): void
    {
        this._standAssetsName[Direction.UP] = "stand_up";
        this._standAssetsName[Direction.DOWN] = "stand_down";
        this._standAssetsName[Direction.LEFT] = "stand_left";
        this._standAssetsName[Direction.RIGHT] = "stand_right";

        this._moveAssetsName[Direction.UP] = "move_up";
        this._moveAssetsName[Direction.DOWN] = "move_down";
        this._moveAssetsName[Direction.LEFT] = "move_left";
        this._moveAssetsName[Direction.RIGHT] = "move_right";

        this._move = new MoveCompute();
        this.refresh();

        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }

    public dispose(): void
    {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        super.dispose();
    }

    private enterFrameHandler(e: egret.Event): void
    {
        if (this._roleVO.state == Role.MOVE_STATE)
        {
            var isArrived: Boolean = this._move.update();
            this.x = this._move.nowX;
            this.y = this._move.nowY;

            if (isArrived)
            {
                this._roleVO.state = Role.STAND_STATE;

                if (this._moveDir != Direction.NONE)
                {
                    this.move(this._moveDir);
                }

                if (this._roleVO.state == Role.STAND_STATE)
                {
                    if (null != this._bootSound)
                    {
                        AudioDevice.pause("boot_mp3");
                        this._bootSound = null;
                    }
                    this.refresh();
                }
            }
        }
    }

    public refresh(): void
    {
        var assetName: string;
        switch (this._roleVO.state)
        {
            case Role.STAND_STATE:
                assetName = this._standAssetsName[this._roleVO.dir];
                break;
            case Role.MOVE_STATE:
                assetName = this._moveAssetsName[this._roleVO.dir];
                break;
        }

        if (null == assetName)
        {
            return;
        }

        if (this._mc)
        {
            if (this._mc.name == assetName)
            {
                return;
            }

            if (this._mc.parent)
            {
                this.removeChild(this._mc);
            }

        }

        this._mc = ResUtil.createMovieClip("role", assetName);
        this._mc.name = assetName;
        this._mc.x = -50;
        this._mc.y = -66;
        this.addChild(this._mc);
        this._mc.play(-1);
    }


    public move(dir: number): void
    {
        this._moveDir = dir;

        if (this._roleVO.state == Role.MOVE_STATE || this._moveDir == Direction.NONE)
        {
            return;
        }

        var needRefresh: Boolean = false;

        if (dir != this._roleVO.dir)
        {
            this._roleVO.dir = dir;
            needRefresh = true;
        }

        var newGrid: egret.Point = MoveUtil.getMovedGrid(this._roleVO.gridX, this._roleVO.gridY, dir);

        if (newGrid)
        {
            var newGridUnit: AUnitVO = MoveUtil.getGridUnit(newGrid, DataCenter.level);

            //如果目标位置上没有单位或者不是阻挡，则可以移动过去
            if (null == newGridUnit)
            {
                this.moveToGrid(newGrid, DataCenter.level);
                needRefresh = true;
                //recordStep(dir);
            }
            else if (UnitType.BOX == newGridUnit.unitType)
            {
                var box: Box = <Box>AUnit.getUnit(newGridUnit.id);

                if (box.push(dir))
                {
                    this.recordStep(dir, box.vo.id, this._roleVO.gridX, this._roleVO.gridY);
                    this.moveToGrid(newGrid, DataCenter.level);
                    needRefresh = true;
                }
            }
        }

        if (needRefresh)
        {
            this.refresh();
        }
    }

    private moveToGrid(newGrid: egret.Point, levelVO: LevelVO): void
    {
        if (null == this._bootSound)
        {
            this._bootSound = AudioDevice.playEffect("boot_mp3", true);
        }
        MoveUtil.updateGridDic(this._roleVO.gridX, this._roleVO.gridY, newGrid.x, newGrid.y, levelVO);
        this._roleVO.state = Role.MOVE_STATE;
        this._roleVO.gridX = newGrid.x;
        this._roleVO.gridY = newGrid.y;
        var newX: number = this.getGridPosX(this._roleVO.gridX);
        var newY: number = this.getGridPosX(this._roleVO.gridY);
        this._move.reset(this.x, this.y, newX, newY, 0.2);
    }

    private recordStep(dir: number, boxId: number, startGridX: number, startGridY: number): void
    {
        var steps: StepVO[] = DataCenter.level.steps;
        steps.push(new StepVO(dir, boxId, startGridX, startGridY));
    }

    public backStep(): void
    {
        var levelVO: LevelVO = DataCenter.level;
        var steps: StepVO[] = levelVO.steps;
        if (steps.length > 0)
        {
            var stepVO: StepVO = steps.pop();
            var oppositeDir: number = MoveUtil.getOppositeDirection(stepVO.moveDir);

            if (Role.MOVE_STATE == this._roleVO.state)
            {
                this._roleVO.state = Role.STAND_STATE;
            }
            MoveUtil.updateGridDic(this._roleVO.gridX, this._roleVO.gridY, stepVO.startGridX, stepVO.startGridY, levelVO);
            this._roleVO.dir = stepVO.moveDir;
            this._roleVO.gridX = stepVO.startGridX;
            this._roleVO.gridY = stepVO.startGridY;
            this.x = this.getGridPosX(this._roleVO.gridX);
            this.y = this.getGridPosY(this._roleVO.gridY);
            this.refresh();
            if (stepVO.boxId > 0)
            {
                (<Box>AUnit.getUnit(stepVO.boxId)).put(oppositeDir);
            }
        }
    }
} 