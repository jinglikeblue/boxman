var ExtendUtil = (function () {
    function ExtendUtil() {
    }
    /**
     * 调用外部方法
     */
    ExtendUtil.callWindow = function (funName) {
        if (null == window[funName]) {
            //alert("找不到外部方法：" + funName);
            return null;
        }
        var result = window[funName]();
        return result;
    };
    return ExtendUtil;
})();
//# sourceMappingURL=ExtendUtil.js.map