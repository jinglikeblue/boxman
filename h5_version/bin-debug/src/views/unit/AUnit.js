var AUnit = (function (_super) {
    __extends(AUnit, _super);
    function AUnit(vo) {
        _super.call(this);
        this._vo = vo;
        AUnit.registUnit(vo.id, this);
    }
    var __egretProto__ = AUnit.prototype;
    Object.defineProperty(__egretProto__, "vo", {
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
    __egretProto__.dispose = function () {
        AUnit.unregistUnit(this._vo.id);
    };
    __egretProto__.getGridPosX = function (gridX) {
        return MapInfo.TILE_SIZE * gridX + (MapInfo.TILE_SIZE >> 1);
    };
    __egretProto__.getGridPosY = function (gridY) {
        return MapInfo.TILE_SIZE * gridY + (MapInfo.TILE_SIZE >> 1);
    };
    AUnit._unitDic = {};
    return AUnit;
})(egret.Sprite);
AUnit.prototype.__class__ = "AUnit";
//# sourceMappingURL=AUnit.js.map