var Box = (function (_super) {
    __extends(Box, _super);
    function Box(vo) {
        _super.call(this, vo);
        this._boxVO = vo;
        this.init();
    }
    var __egretProto__ = Box.prototype;
    __egretProto__.init = function () {
        this._img = ResUtil.createBitmap(Box.NORMAL);
        this._img.x = -24;
        this._img.y = -37;
        this.addChild(this._img);
        this._move = new MoveCompute();
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    __egretProto__.dispose = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    __egretProto__.enterFrameHandler = function (e) {
        if (this._boxVO.state == Box.MOVE_STATE) {
            if (true == this._move.update()) {
                this._boxVO.state = Box.STAND_STATE;
                this.onBoxMoved();
            }
            this.x = this._move.nowX;
            this.y = this._move.nowY;
        }
    };
    __egretProto__.onBoxMoved = function () {
        this.refresh();
        NoticeManager.sendNotice(new GameNotice(GameNotice.BOX_MOVED));
    };
    __egretProto__.refresh = function () {
        var useAssetName;
        if (MoveUtil.checkGridIsTarget(this._boxVO.gridX, this._boxVO.gridY)) {
            if (this._usingAssetName != Box.NORMAL) {
                this._usingAssetName = Box.ON_TARGET;
                this._img.texture = ResUtil.createTexture(Box.ON_TARGET);
            }
        }
        else {
            if (this._usingAssetName != Box.NORMAL) {
                this._usingAssetName = Box.NORMAL;
                this._img.texture = ResUtil.createTexture(Box.NORMAL);
            }
        }
    };
    __egretProto__.push = function (dir) {
        var newGrid = MoveUtil.getMovedGrid(this._boxVO.gridX, this._boxVO.gridY, dir);
        if (newGrid) {
            var newGridUnit = MoveUtil.getGridUnit(newGrid, DataCenter.level);
            if (null == newGridUnit) {
                this.moveToGrid(newGrid, DataCenter.level);
                return true;
            }
        }
        return false;
    };
    __egretProto__.put = function (dir) {
        var levelVO = DataCenter.level;
        if (this._boxVO.state == Box.MOVE_STATE) {
            this._boxVO.state = Box.STAND_STATE;
        }
        var newGrid = MoveUtil.getMovedGrid(this._boxVO.gridX, this._boxVO.gridY, dir);
        MoveUtil.updateGridDic(this._boxVO.gridX, this._boxVO.gridY, newGrid.x, newGrid.y, levelVO);
        this._boxVO.gridX = newGrid.x;
        this._boxVO.gridY = newGrid.y;
        this.x = this.getGridPosX(newGrid.x);
        this.y = this.getGridPosY(newGrid.y);
        this.onBoxMoved();
    };
    __egretProto__.moveToGrid = function (newGrid, levelVO) {
        AudioDevice.playEffect("push_mp3");
        //DataCenter.getInstance().audioDevice.play("push", new AudioSetting(1, 2));
        MoveUtil.updateGridDic(this._boxVO.gridX, this._boxVO.gridY, newGrid.x, newGrid.y, levelVO);
        this._boxVO.state = Box.MOVE_STATE;
        this._boxVO.gridX = newGrid.x;
        this._boxVO.gridY = newGrid.y;
        var newX = MapInfo.TILE_SIZE * this._boxVO.gridX + (MapInfo.TILE_SIZE >> 1);
        var newY = MapInfo.TILE_SIZE * this._boxVO.gridY + (MapInfo.TILE_SIZE >> 1);
        this._move.reset(this.x, this.y, newX, newY, 0.3);
    };
    Box.NORMAL = "box_png";
    Box.ON_TARGET = "box_on_target_png";
    Box.MOVE_STATE = 1;
    Box.STAND_STATE = 0;
    return Box;
})(AUnit);
Box.prototype.__class__ = "Box";
//# sourceMappingURL=Box.js.map