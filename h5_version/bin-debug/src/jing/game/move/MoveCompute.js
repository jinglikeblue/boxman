//移动处理类
var MoveCompute = (function () {
    function MoveCompute() {
    }
    var __egretProto__ = MoveCompute.prototype;
    Object.defineProperty(__egretProto__, "nowX", {
        get: function () {
            return this._nowX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "nowY", {
        get: function () {
            return this._nowY;
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.reset = function (startX, startY, endX, endY, speed) {
        this._startX = startX;
        this._startY = startY;
        this._endX = endX;
        this._endY = endY;
        this._dx = endX - startX;
        this._dy = endY - startY;
        var distance = Math.sqrt(this._dx * this._dx + this._dy * this._dy);
        this._totalTime = Math.ceil(distance / speed);
        this._startTime = egret.getTimer();
    };
    __egretProto__.update = function () {
        var costTime = egret.getTimer() - this._startTime;
        if (costTime > this._totalTime) {
            this._nowX = this._endX;
            this._nowY = this._endY;
            return true;
        }
        var k = costTime / this._totalTime;
        this._nowX = this._startX + this._dx * k;
        this._nowY = this._startY + this._dy * k;
        return false;
    };
    return MoveCompute;
})();
MoveCompute.prototype.__class__ = "MoveCompute";
//# sourceMappingURL=MoveCompute.js.map