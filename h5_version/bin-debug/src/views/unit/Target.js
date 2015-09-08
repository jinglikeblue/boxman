var Target = (function (_super) {
    __extends(Target, _super);
    function Target(vo) {
        _super.call(this, vo);
        this._targetVO = vo;
        this.init();
    }
    var __egretProto__ = Target.prototype;
    __egretProto__.init = function () {
        this._img = ResUtil.createBitmap("target_jpg");
        this._img.x = -24;
        this._img.y = -24;
        this.addChild(this._img);
    };
    return Target;
})(AUnit);
Target.prototype.__class__ = "Target";
//# sourceMappingURL=Target.js.map