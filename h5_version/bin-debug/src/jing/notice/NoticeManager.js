var NoticeManager = (function () {
    function NoticeManager() {
    }
    var __egretProto__ = NoticeManager.prototype;
    /**
    * 注册一个通知的监听（类似于事件机制,通过回调实现)
    * @param handleType 操作类型
    * @param handler 回调方法
    *
    */
    NoticeManager.addNoticeAction = function (type, action, thisObj) {
        action = action.bind(thisObj);
        if (null == NoticeManager._registeredNotice[type]) {
            NoticeManager._registeredNotice[type] = [];
        }
        var actions = NoticeManager._registeredNotice[type];
        if (null != action && -1 == actions.indexOf(action)) {
            actions.push(action);
        }
    };
    /**
    * 注销一个操作监听
    * @param handleType 操作类型
    * @param handler 回调方法
    *
    */
    NoticeManager.removeNoticeAction = function (type, action, thisObj) {
        action = action.bind(thisObj);
        if (null == NoticeManager._registeredNotice || null == NoticeManager._registeredNotice[type]) {
            return;
        }
        var actions = NoticeManager._registeredNotice[type];
        var actionIndex = actions.indexOf(action);
        if (-1 != actionIndex) {
            actions.splice(actionIndex, 1);
        }
    };
    /**
    * 发送通知
    * @notice Action
    */
    NoticeManager.sendNotice = function (notice) {
        if (null == NoticeManager._registeredNotice) {
            return;
        }
        if (null == NoticeManager._registeredNotice[notice.type]) {
            return;
        }
        //和该事件关联的所有的方法
        var notices = NoticeManager._registeredNotice[notice.type];
        var noticeCount = notices.length;
        while (--noticeCount > -1) {
            if (noticeCount >= notices.length) {
                continue;
            }
            notices[noticeCount](notice);
        }
    };
    //注册的通知
    NoticeManager._registeredNotice = {};
    return NoticeManager;
})();
NoticeManager.prototype.__class__ = "NoticeManager";
//# sourceMappingURL=NoticeManager.js.map