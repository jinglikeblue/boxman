var Notice = (function () {
    function Notice(type, data) {
        if (data === void 0) { data = null; }
        this._type = type;
        this._data = data;
    }
    var __egretProto__ = Notice.prototype;
    Object.defineProperty(__egretProto__, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return Notice;
})();
Notice.prototype.__class__ = "Notice";
//# sourceMappingURL=Notice.js.map