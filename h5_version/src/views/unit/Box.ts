class Box extends AUnit
{
    public static NORMAL: string = "box_png";
    public static ON_TARGET: string = "box_on_target_png";

    public static MOVE_STATE: number = 1;
    public static STAND_STATE: number = 0;

    private _boxVO: BoxVO;
    private _img: egret.Bitmap;
    private _move: MoveCompute;
    private _usingAssetName: string;

    public constructor(vo: BoxVO)
    {
        super(vo);
        this._boxVO = vo;
        this.init();
    }

    private init(): void
    {
        this._img = ResUtil.createBitmap(Box.NORMAL);
        this._img.x = -24;
        this._img.y = -37;
        this.addChild(this._img);

        this._move = new MoveCompute();
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }

    public dispose(): void
    {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }

    private enterFrameHandler(e: egret.Event): void
    {
        if (this._boxVO.state == Box.MOVE_STATE)
        {
            if (true == this._move.update())
            {
                this._boxVO.state = Box.STAND_STATE;

                this.onBoxMoved();
            }

            this.x = this._move.nowX;
            this.y = this._move.nowY;
        }
    }

    private onBoxMoved(): void
    {
        this.refresh();

        NoticeManager.sendNotice(new GameNotice(GameNotice.BOX_MOVED));
    }

    public refresh(): void
    {
        var useAssetName: String;
        if (MoveUtil.checkGridIsTarget(this._boxVO.gridX, this._boxVO.gridY))
        {
            if (this._usingAssetName != Box.NORMAL)
            {
                this._usingAssetName = Box.ON_TARGET;
                this._img.texture = ResUtil.createTexture(Box.ON_TARGET);
            }
        }
        else
        {
            if (this._usingAssetName != Box.NORMAL)
            {
                this._usingAssetName = Box.NORMAL;
                this._img.texture = ResUtil.createTexture(Box.NORMAL);
            }
        }
    }

    public push(dir: number): boolean
    {
        var newGrid: egret.Point = MoveUtil.getMovedGrid(this._boxVO.gridX, this._boxVO.gridY, dir);
        if (newGrid)
        {
            var newGridUnit: AUnitVO = MoveUtil.getGridUnit(newGrid, DataCenter.level);

            if (null == newGridUnit)
            {
                this.moveToGrid(newGrid, DataCenter.level);
                return true;
            }
        }
        return false;
    }

    public put(dir: number): void
    {
        var levelVO: LevelVO = DataCenter.level;
        if (this._boxVO.state == Box.MOVE_STATE)
        {
            this._boxVO.state = Box.STAND_STATE;
        }
        var newGrid: egret.Point = MoveUtil.getMovedGrid(this._boxVO.gridX, this._boxVO.gridY, dir);
        MoveUtil.updateGridDic(this._boxVO.gridX, this._boxVO.gridY, newGrid.x, newGrid.y, levelVO);
        this._boxVO.gridX = newGrid.x;
        this._boxVO.gridY = newGrid.y;
        this.x = this.getGridPosX(newGrid.x);
        this.y = this.getGridPosY(newGrid.y);


        this.onBoxMoved();
    }

    private moveToGrid(newGrid: egret.Point, levelVO: LevelVO): void
    {
        AudioDevice.playEffect("push_mp3");
        //DataCenter.getInstance().audioDevice.play("push", new AudioSetting(1, 2));
        MoveUtil.updateGridDic(this._boxVO.gridX, this._boxVO.gridY, newGrid.x, newGrid.y, levelVO);
        this._boxVO.state = Box.MOVE_STATE;
        this._boxVO.gridX = newGrid.x;
        this._boxVO.gridY = newGrid.y;
        var newX: number = MapInfo.TILE_SIZE * this._boxVO.gridX + (MapInfo.TILE_SIZE >> 1);
        var newY: number = MapInfo.TILE_SIZE * this._boxVO.gridY + (MapInfo.TILE_SIZE >> 1);
        this._move.reset(this.x, this.y, newX, newY, 0.3);
    }
} 