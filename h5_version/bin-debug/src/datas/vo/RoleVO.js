var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RoleVO = (function (_super) {
    __extends(RoleVO, _super);
    function RoleVO() {
        _super.apply(this, arguments);
        /**
     * 角色当前方向
     */
        this.dir = Direction.DOWN;
        /**
         * 状态
         * <ui>
         * <li>0 站立</li>
         * <li>1 移动</li>
         * </ui>
         */
        this.state = 0;
    }
    return RoleVO;
})(AUnitVO);
//# sourceMappingURL=RoleVO.js.map