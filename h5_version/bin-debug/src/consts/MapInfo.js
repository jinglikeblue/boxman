var MapInfo = (function () {
    function MapInfo() {
    }
    var __egretProto__ = MapInfo.prototype;
    //因为是正方形区域，所以X和Y轴都是一样的数据
    MapInfo.TILE_SIZE = 48;
    MapInfo.TILE_COUNT = 16;
    MapInfo.GROUND_SIZE = 48 * 16;
    return MapInfo;
})();
MapInfo.prototype.__class__ = "MapInfo";
//# sourceMappingURL=MapInfo.js.map