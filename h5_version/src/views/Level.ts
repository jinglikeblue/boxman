class Level extends egret.Sprite
{
    private _map: GameMap;
    private _control: ControlLayer;
    public constructor(levelVO: LevelVO)
    {
        super();
        this._map = new GameMap(levelVO);
        this._map.x = (DataCenter.stage.stageWidth - MapInfo.GROUND_SIZE) / 2;
        this._map.y = (DataCenter.stage.stageHeight - MapInfo.GROUND_SIZE) / 2;
        this._control = new ControlLayer();

        this.addChild(this._map);
        this.addChild(this._control);  
    }
}