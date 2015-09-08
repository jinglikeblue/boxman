class Target extends AUnit
{
    private _img: egret.Bitmap;

    private _targetVO: TargetVO;
    public constructor(vo:TargetVO)
    {
        super(vo);
        this._targetVO = vo;
        this.init();
    }

    private init(): void
    {
        this._img = ResUtil.createBitmap("target_jpg");
        this._img.x = -24;
        this._img.y = -24;
        this.addChild(this._img);
    }
} 