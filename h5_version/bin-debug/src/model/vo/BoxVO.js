var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BoxVO = (function (_super) {
    __extends(BoxVO, _super);
    function BoxVO() {
        _super.apply(this, arguments);
        /**
        * 状态
        * <ui>
        * <li>0 站立</li>
        * <li>1 移动</li>
        * </ui>
        */
        this.state = 0;
    }
    return BoxVO;
})(AUnitVO);
//# sourceMappingURL=BoxVO.js.map