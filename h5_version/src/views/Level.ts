class Level extends egret.Sprite
{
    private _map: GameMap;
    private _control: ControlLayer;
    public constructor(levelVO: LevelVO)
    {
        super();
        this._map = new GameMap(levelVO);
        this._control = new ControlLayer();

        this.addChild(this._map);
        this.addChild(this._control);

        //this._map.width = DataCenter.stage.stageWidth;
        this._map.scaleY = this._map.scaleX = DataCenter.stage.stageWidth / this._map.width;
    }
}