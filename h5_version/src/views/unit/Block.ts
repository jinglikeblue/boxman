class Block extends AUnit
{
    private _blockVO: BlockVO;
    private _img: egret.Bitmap;

    public constructor(vo: BlockVO)
    {
        super(vo);
        this._blockVO = vo;
        this.init();
    }

    private init(): void
    {
        this._img = ResUtil.createBitmap("block_png");
        this._img.x = -25;
        this._img.y = -37;
        this.addChild(this._img);
    }
}