var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameMap = (function (_super) {
    __extends(GameMap, _super);
    function GameMap(levelVO) {
        _super.call(this);
        this._levelVO = levelVO;
        this.initUnits();
    }
    //初始化游戏的单元
    GameMap.prototype.initUnits = function () {
        for (var k in this._levelVO.units) {
            var unit = this._levelVO.units[k];
            switch (unit.unitType) {
                case UnitType.BLOCK:
                    break;
                case UnitType.BOX:
                    break;
                case UnitType.ROLE:
                    break;
            }
        }
    };
    return GameMap;
})(egret.Sprite);
//# sourceMappingURL=GameMap.js.map