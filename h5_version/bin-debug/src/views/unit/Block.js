var Block = (function (_super) {
    __extends(Block, _super);
    function Block(vo) {
        _super.call(this, vo);
        this._blockVO = vo;
        this.init();
    }
    var __egretProto__ = Block.prototype;
    __egretProto__.init = function () {
        this._img = ResUtil.createBitmap("block_png");
        this._img.x = -25;
        this._img.y = -37;
        this.addChild(this._img);
    };
    return Block;
})(AUnit);
Block.prototype.__class__ = "Block";
//# sourceMappingURL=Block.js.map