var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(vo) {
        _super.call(this, vo);
        this._blockVO = vo;
        this.init();
    }
    Block.prototype.init = function () {
        this._img = ResUtil.createBitmap("block_png");
        this._img.x = -25;
        this._img.y = -37;
        this.addChild(this._img);
    };
    return Block;
})(AUnit);
//# sourceMappingURL=Block.js.map