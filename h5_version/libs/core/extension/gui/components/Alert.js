//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var egret;
(function (egret) {
    var gui;
    (function (gui) {
        /**
         * @class egret.gui.Alert
         * @classdesc
         * 弹出对话框，可能包含消息、标题、按钮（“确定”、“取消”、“是”和“否”的任意组合)。
         * @extends egret.gui.TitleWindow
         */
        var Alert = (function (_super) {
            __extends(Alert, _super);
            /**
             * 构造函数，请通过静态方法Alert.show()来创建对象实例。
             * @method egret.gui.Alert#constructor
             */
            function Alert() {
                _super.call(this);
                this._firstButtonLabel = "";
                /**
                 *
                 * @type {string}
                 * @private
                 */
                this._secondButtonLabel = "";
                /**
                 *
                 * @type {string}
                 * @private
                 */
                this._contentText = "";
                /**
                 * 对话框关闭回调函数
                 */
                this.closeHandler = null;
                /**
                 * [SkinPart]文本内容显示对象
                 * @member egret.gui.Alert#contentDisplay
                 */
                this.contentDisplay = null;
                /**
                 * [SkinPart]第一个按钮，通常是"确定"。
                 * @member egret.gui.Alert#firstButton
                 */
                this.firstButton = null;
                /**
                 * [SkinPart]第二个按钮，通常是"取消"。
                 * @member egret.gui.Alert#secondButton
                 */
                this.secondButton = null;
            }
            var __egretProto__ = Alert.prototype;
            /**
             * 弹出Alert控件的静态方法。在Alert控件中选择一个按钮，将关闭该控件。
             * @method egret.gui.Alert.show
             * @param text {string} 要显示的文本内容字符串。
             * @param title {string} 对话框标题
             * @param closeHandler {Function} 按下Alert控件上的任意按钮时的回调函数。示例:closeHandler(event:CloseEvent);
             * event的detail属性包含 Alert.FIRST_BUTTON、Alert.SECOND_BUTTON和Alert.CLOSE_BUTTON。
             * @param firstButtonLabel {string} 第一个按钮上显示的文本。
             * @param secondButtonLabel {string} 第二个按钮上显示的文本，若为null，则不显示第二个按钮。
             * @param modal {boolean} 是否启用模态。即禁用弹出框以下的鼠标事件。默认true。
             * @param center {boolean} 是否居中。默认true。
             * @param thisObject {any} 回掉函数绑定的this对象
             * @returns {Alert}
             */
            Alert.show = function (text, title, closeHandler, firstButtonLabel, secondButtonLabel, modal, center, thisObject) {
                if (text === void 0) { text = ""; }
                if (title === void 0) { title = ""; }
                if (closeHandler === void 0) { closeHandler = null; }
                if (firstButtonLabel === void 0) { firstButtonLabel = "OK"; }
                if (secondButtonLabel === void 0) { secondButtonLabel = ""; }
                if (modal === void 0) { modal = true; }
                if (center === void 0) { center = true; }
                var alert = new Alert();
                alert.contentText = text;
                alert.title = title;
                alert._firstButtonLabel = firstButtonLabel;
                alert._secondButtonLabel = secondButtonLabel;
                alert.closeHandler = closeHandler;
                alert.thisObject = thisObject;
                gui.PopUpManager.addPopUp(alert, modal, center);
                return alert;
            };
            Object.defineProperty(__egretProto__, "firstButtonLabel", {
                /**
                 * 第一个按钮上显示的文本
                 * @member egret.gui.Alert#firstButtonLabel
                 */
                get: function () {
                    return this._firstButtonLabel;
                },
                set: function (value) {
                    if (this._firstButtonLabel == value)
                        return;
                    this._firstButtonLabel = value;
                    if (this.firstButton)
                        this.firstButton.label = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "secondButtonLabel", {
                /**
                 * 第二个按钮上显示的文本
                 * @member egret.gui.Alert#secondButtonLabel
                 */
                get: function () {
                    return this._secondButtonLabel;
                },
                set: function (value) {
                    if (this._secondButtonLabel == value)
                        return;
                    this._secondButtonLabel = value;
                    if (this.secondButton) {
                        if (value == null || value == "")
                            this.secondButton.includeInLayout = this.secondButton.visible = (this._secondButtonLabel != "" && this._secondButtonLabel != null);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "contentText", {
                /**
                 * 文本内容
                 * @member egret.gui.Alert#contentText
                 */
                get: function () {
                    return this._contentText;
                },
                set: function (value) {
                    if (this._contentText == value)
                        return;
                    this._contentText = value;
                    if (this.contentDisplay)
                        this.contentDisplay.text = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 关闭事件
             */
            __egretProto__.onClose = function (event) {
                gui.PopUpManager.removePopUp(this);
                if (this.closeHandler != null) {
                    var closeEvent = new gui.CloseEvent(gui.CloseEvent.CLOSE);
                    switch (event.currentTarget) {
                        case this.firstButton:
                            closeEvent.detail = Alert.FIRST_BUTTON;
                            break;
                        case this.secondButton:
                            closeEvent.detail = Alert.SECOND_BUTTON;
                            break;
                    }
                    this.callCloseHandler(closeEvent);
                }
            };
            /**
             * @method egret.gui.Alert#closeButton_clickHandler
             * @param event {TouchEvent}
             */
            __egretProto__.closeButton_clickHandler = function (event) {
                _super.prototype.closeButton_clickHandler.call(this, event);
                gui.PopUpManager.removePopUp(this);
                var closeEvent = new gui.CloseEvent(gui.CloseEvent.CLOSE, false, false, Alert.CLOSE_BUTTON);
                this.callCloseHandler(closeEvent);
            };
            __egretProto__.callCloseHandler = function (closeEvent) {
                if (this.closeHandler == null)
                    return;
                var target = this.thisObject || this;
                this.closeHandler.call(target, closeEvent);
            };
            /**
             * 添加外观部件时调用
             * @method egret.gui.Alert#partAdded
             * @param partName {string}
             * @param instance {any}
             */
            __egretProto__.partAdded = function (partName, instance) {
                _super.prototype.partAdded.call(this, partName, instance);
                if (instance == this.contentDisplay) {
                    this.contentDisplay.text = this._contentText;
                }
                else if (instance == this.firstButton) {
                    this.firstButton.label = this._firstButtonLabel;
                    this.firstButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                }
                else if (instance == this.secondButton) {
                    this.secondButton.label = this._secondButtonLabel;
                    this.secondButton.includeInLayout = this.secondButton.visible = (this._secondButtonLabel != "" && this._secondButtonLabel != null);
                    this.secondButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                }
            };
            /**
             * 删除外观部件的实例时调用
             * @method egret.gui.Alert#partRemoved
             * @param partName {string}
             * @param instance {any}
             */
            __egretProto__.partRemoved = function (partName, instance) {
                _super.prototype.partRemoved.call(this, partName, instance);
                if (instance == this.firstButton) {
                    this.firstButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                }
                else if (instance == this.secondButton) {
                    this.secondButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                }
            };
            /**
             * 当对话框关闭时，closeEvent.detail的值若等于此属性,表示被点击的按钮为firstButton。
             * @constant egret.gui.Alert.FIRST_BUTTON
             */
            Alert.FIRST_BUTTON = "firstButton";
            /**
             * 当对话框关闭时，closeEvent.detail的值若等于此属性,表示被点击的按钮为secondButton。
             * @constant egret.gui.Alert.SECOND_BUTTON
             */
            Alert.SECOND_BUTTON = "secondButton";
            /**
             * 当对话框关闭时，closeEvent.detail的值若等于此属性,表示被点击的按钮为closeButton。
             * @constant egret.gui.Alert.CLOSE_BUTTON
             */
            Alert.CLOSE_BUTTON = "closeButton";
            return Alert;
        })(gui.TitleWindow);
        gui.Alert = Alert;
        Alert.prototype.__class__ = "egret.gui.Alert";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
