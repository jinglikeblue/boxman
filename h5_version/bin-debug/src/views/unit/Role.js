var Role = (function (_super) {
    __extends(Role, _super);
    function Role(vo) {
        _super.call(this, vo);
        this._standAssetsName = {};
        this._moveAssetsName = {};
        this._moveDir = Direction.NONE;
        this._roleVO = vo;
        this.init();
    }
    var __egretProto__ = Role.prototype;
    __egretProto__.init = function () {
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
    };
    __egretProto__.dispose = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        _super.prototype.dispose.call(this);
    };
    __egretProto__.enterFrameHandler = function (e) {
        if (this._roleVO.state == Role.MOVE_STATE) {
            var isArrived = this._move.update();
            this.x = this._move.nowX;
            this.y = this._move.nowY;
            if (isArrived) {
                this._roleVO.state = Role.STAND_STATE;
                if (this._moveDir != Direction.NONE) {
                    this.move(this._moveDir);
                }
                if (this._roleVO.state == Role.STAND_STATE) {
                    if (null != this._bootSound) {
                        AudioDevice.pause("boot_mp3");
                        this._bootSound = null;
                    }
                    this.refresh();
                }
            }
        }
    };
    __egretProto__.refresh = function () {
        var assetName;
        switch (this._roleVO.state) {
            case Role.STAND_STATE:
                assetName = this._standAssetsName[this._roleVO.dir];
                break;
            case Role.MOVE_STATE:
                assetName = this._moveAssetsName[this._roleVO.dir];
                break;
        }
        if (null == assetName) {
            return;
        }
        if (this._mc) {
            if (this._mc.name == assetName) {
                return;
            }
            if (this._mc.parent) {
                this.removeChild(this._mc);
            }
        }
        this._mc = ResUtil.createMovieClip("role", assetName);
        this._mc.name = assetName;
        this._mc.x = -50;
        this._mc.y = -66;
        this.addChild(this._mc);
        this._mc.play(-1);
    };
    __egretProto__.move = function (dir) {
        this._moveDir = dir;
        if (this._roleVO.state == Role.MOVE_STATE || this._moveDir == Direction.NONE) {
            return;
        }
        var needRefresh = false;
        if (dir != this._roleVO.dir) {
            this._roleVO.dir = dir;
            needRefresh = true;
        }
        var newGrid = MoveUtil.getMovedGrid(this._roleVO.gridX, this._roleVO.gridY, dir);
        if (newGrid) {
            var newGridUnit = MoveUtil.getGridUnit(newGrid, DataCenter.level);
            //如果目标位置上没有单位或者不是阻挡，则可以移动过去
            if (null == newGridUnit) {
                this.moveToGrid(newGrid, DataCenter.level);
                needRefresh = true;
            }
            else if (UnitType.BOX == newGridUnit.unitType) {
                var box = AUnit.getUnit(newGridUnit.id);
                if (box.push(dir)) {
                    this.recordStep(dir, box.vo.id, this._roleVO.gridX, this._roleVO.gridY);
                    this.moveToGrid(newGrid, DataCenter.level);
                    needRefresh = true;
                }
            }
        }
        if (needRefresh) {
            this.refresh();
        }
    };
    __egretProto__.moveToGrid = function (newGrid, levelVO) {
        if (null == this._bootSound) {
            this._bootSound = AudioDevice.playEffect("boot_mp3", true);
        }
        MoveUtil.updateGridDic(this._roleVO.gridX, this._roleVO.gridY, newGrid.x, newGrid.y, levelVO);
        this._roleVO.state = Role.MOVE_STATE;
        this._roleVO.gridX = newGrid.x;
        this._roleVO.gridY = newGrid.y;
        var newX = this.getGridPosX(this._roleVO.gridX);
        var newY = this.getGridPosX(this._roleVO.gridY);
        this._move.reset(this.x, this.y, newX, newY, 0.2);
    };
    __egretProto__.recordStep = function (dir, boxId, startGridX, startGridY) {
        var steps = DataCenter.level.steps;
        steps.push(new StepVO(dir, boxId, startGridX, startGridY));
    };
    __egretProto__.backStep = function () {
        var levelVO = DataCenter.level;
        var steps = levelVO.steps;
        if (steps.length > 0) {
            var stepVO = steps.pop();
            var oppositeDir = MoveUtil.getOppositeDirection(stepVO.moveDir);
            if (Role.MOVE_STATE == this._roleVO.state) {
                this._roleVO.state = Role.STAND_STATE;
            }
            MoveUtil.updateGridDic(this._roleVO.gridX, this._roleVO.gridY, stepVO.startGridX, stepVO.startGridY, levelVO);
            this._roleVO.dir = stepVO.moveDir;
            this._roleVO.gridX = stepVO.startGridX;
            this._roleVO.gridY = stepVO.startGridY;
            this.x = this.getGridPosX(this._roleVO.gridX);
            this.y = this.getGridPosY(this._roleVO.gridY);
            this.refresh();
            if (stepVO.boxId > 0) {
                AUnit.getUnit(stepVO.boxId).put(oppositeDir);
            }
        }
    };
    Role.MOVE_STATE = 1;
    Role.STAND_STATE = 0;
    return Role;
})(AUnit);
Role.prototype.__class__ = "Role";
//# sourceMappingURL=Role.js.map