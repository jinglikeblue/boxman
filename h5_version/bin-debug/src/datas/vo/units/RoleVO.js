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
    var __egretProto__ = RoleVO.prototype;
    return RoleVO;
})(AUnitVO);
RoleVO.prototype.__class__ = "RoleVO";
//# sourceMappingURL=RoleVO.js.map