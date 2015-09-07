class AUnit extends egret.Sprite
{
    private _vo: AUnitVO;

    public get vo(): AUnitVO
    {
        return this._vo;
    }

    private static _unitDic: any = {};
    private static registUnit(id: number, unit: AUnit): void
    {
        this._unitDic[id] = unit;
    }
    private static unregistUnit(id: number): void
    {
        this._unitDic[id] = null;
        delete this._unitDic[id];
    }

    public static resetUnitDic(): void
    {
        this._unitDic = {};
    }

    public static getUnit(id: number): AUnit
    {
        return this._unitDic[id];
    }


    public constructor(vo: AUnitVO)
    {
        super();
        this._vo = vo;
        AUnit.registUnit(vo.id, this);
    }

    public dispose(): void
    {
        AUnit.unregistUnit(this._vo.id);
    }

    public getGridPosX(gridX: number): number
    {
        return MapInfo.TILE_SIZE * gridX + (MapInfo.TILE_SIZE >> 1);
    }

    public getGridPosY(gridY: number): number
    {
        return MapInfo.TILE_SIZE * gridY + (MapInfo.TILE_SIZE >> 1);
    }
} 