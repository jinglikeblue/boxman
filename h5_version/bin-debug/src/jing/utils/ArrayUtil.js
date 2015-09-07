var ArrayUtil = (function () {
    function ArrayUtil() {
    }
    /**
     * 调用外部方法
     */
    ArrayUtil.random = function (inputArray) {
        inputArray = inputArray.concat();
        var outputArray = [];
        var i = 0;
        while (i < inputArray.length) {
            var randomIndex = Math.floor(inputArray.length * Math.random());
            outputArray.push(inputArray[randomIndex]);
            inputArray.splice(randomIndex, 1);
        }
        return outputArray;
    };
    return ArrayUtil;
})();
//# sourceMappingURL=ArrayUtil.js.map