var IntUtil = (function () {
    function IntUtil() {
    }
    var __egretProto__ = IntUtil.prototype;
    /**
    * 混合两个字节以下的数字, 单个数字最大值0xFFFF
    * @param x
    * @param y
    * @return
    *
    */
    IntUtil.mixedTwoInt = function (x, y) {
        return x | y << 16;
    };
    /**
     * 从混合数字中抽离出两个数字
     * @param value
     * @return
     *
     */
    IntUtil.unmixedTwoInt = function (value) {
        var x = value & 0xFFFF;
        var y = value >> 16;
        return new egret.Point(x, y);
    };
    return IntUtil;
})();
IntUtil.prototype.__class__ = "IntUtil";
//# sourceMappingURL=IntUtil.js.map