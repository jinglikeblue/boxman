var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AUnit = (function (_super) {
    __extends(AUnit, _super);
    function AUnit(vo) {
        _super.call(this);
        this._vo = vo;
        AUnit.registUnit(vo.id, this);
    }
    Object.defineProperty(AUnit.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        enumerable: true,
        configurable: true
    });
    AUnit.registUnit = function (id, unit) {
        this._unitDic[id] = unit;
    };
    AUnit.unregistUnit = function (id) {
        this._unitDic[id] = null;
        delete this._unitDic[id];
    };
    AUnit.resetUnitDic = function () {
        this._unitDic = {};
    };
    AUnit.getUnit = function (id) {
        return this._unitDic[id];
    };
    AUnit.prototype.dispose = function () {
        AUnit.unregistUnit(this._vo.id);
    };
    AUnit.prototype.getGridPosX = function (gridX) {
        return MapInfo.TILE_SIZE * gridX + (MapInfo.TILE_SIZE >> 1);
    };
    AUnit.prototype.getGridPosY = function (gridY) {
        return MapInfo.TILE_SIZE * gridY + (MapInfo.TILE_SIZE >> 1);
    };
    AUnit._unitDic = {};
    return AUnit;
})(egret.Sprite);
//# sourceMappingURL=AUnit.js.map