class GameMap extends egret.Sprite
{
    private _levelVO: LevelVO;
    public constructor(levelVO:LevelVO)
    {
        super();
        this._levelVO = levelVO;
        this.initUnits()
    }

    //初始化游戏的单元
    private initUnits(): void
    {
        for (var k in this._levelVO.units)
        {
            var unit: AUnitVO = this._levelVO.units[k];
            switch (unit.unitType)
            {
                case UnitType.BLOCK:
                    break;
                case UnitType.BOX:
                    break;
                case UnitType.ROLE:
                    break;
            }
        }
    }
}