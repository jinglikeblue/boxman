/**
*
*/
var ASkinCom = (function (_super) {
    __extends(ASkinCom, _super);
    function ASkinCom(skin, data) {
        if (data === void 0) { data = null; }
        _super.call(this);
        this.created = false;
        this.skinName = skin;
        this.data = data;
    }
    var __egretProto__ = ASkinCom.prototype;
    __egretProto__.setData = function (data) {
        if (data === void 0) { data = null; }
        this.data = data;
        if (this.created) {
            this.onSetData();
        }
    };
    __egretProto__.childrenCreated = function () {
        this.created = true;
        this.init();
        this.addListeners();
        this.onSetData();
    };
    __egretProto__.init = function () {
        //重写该代码来完成初始化
    };
    __egretProto__.onSetData = function () {
        //重写代码来关注数据设置
    };
    __egretProto__.addListeners = function () {
        //重写代码来实现监听
    };
    __egretProto__.removeListeners = function () {
        //重写代码来释放监听
    };
    __egretProto__.dispose = function () {
        this.removeListeners();
    };
    return ASkinCom;
})(egret.gui.SkinnableComponent);
ASkinCom.prototype.__class__ = "ASkinCom";
//# sourceMappingURL=ASkinCom.js.map