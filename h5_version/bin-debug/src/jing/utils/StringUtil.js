//字符串处理类
var StringUtil = (function () {
    function StringUtil() {
    }
    //格式化字符串
    StringUtil.format = function (input) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < args.length; ++i) {
            input = input.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
        }
        return input;
    };
    return StringUtil;
})();
//# sourceMappingURL=StringUtil.js.map