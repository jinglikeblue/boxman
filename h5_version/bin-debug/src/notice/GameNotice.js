var GameNotice = (function (_super) {
    __extends(GameNotice, _super);
    function GameNotice() {
        _super.apply(this, arguments);
    }
    var __egretProto__ = GameNotice.prototype;
    /**
        * 让角色移动
        */
    GameNotice.MAKE_ROLE_MOVE = "MoveNotice:Move";
    /**
        * 取消角色移动
        */
    GameNotice.CANCEL_ROLE_MOVE = "MoveNotice:CancelRoleMove";
    /**
        * 盒子移动后
        */
    GameNotice.BOX_MOVED = "MoveNotice:BoxMoved";
    /**
     * 关卡完成了
     */
    GameNotice.LEVEL_COMPLETE = "LevelNotice:LevelComplete";
    /**
     * 回退步骤
     */
    GameNotice.BACK_STEP = "LevelNotice:BackStep";
    return GameNotice;
})(Notice);
GameNotice.prototype.__class__ = "GameNotice";
//# sourceMappingURL=GameNotice.js.map