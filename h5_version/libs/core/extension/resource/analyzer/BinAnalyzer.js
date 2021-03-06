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
var RES;
(function (RES) {
    var BinAnalyzer = (function (_super) {
        __extends(BinAnalyzer, _super);
        /**
         * 构造函数
         */
        function BinAnalyzer() {
            _super.call(this);
            /**
             * 字节流数据缓存字典
             */
            this.fileDic = {};
            /**
             * 加载项字典
             */
            this.resItemDic = [];
            this._dataFormat = egret.URLLoaderDataFormat.BINARY;
            /**
             * URLLoader对象池
             */
            this.recycler = new egret.Recycler();
        }
        var __egretProto__ = BinAnalyzer.prototype;
        /**
         * @inheritDoc
         */
        __egretProto__.loadFile = function (resItem, compFunc, thisObject) {
            if (this.fileDic[resItem.name]) {
                compFunc.call(thisObject, resItem);
                return;
            }
            var loader = this.getLoader();
            this.resItemDic[loader.hashCode] = { item: resItem, func: compFunc, thisObject: thisObject };
            loader.load(new egret.URLRequest(resItem.url));
        };
        /**
         * 获取一个URLLoader对象
         */
        __egretProto__.getLoader = function () {
            var loader = this.recycler.pop();
            if (!loader) {
                loader = new egret.URLLoader();
                loader.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            loader.dataFormat = this._dataFormat;
            return loader;
        };
        /**
         * 一项加载结束
         */
        __egretProto__.onLoadFinish = function (event) {
            var loader = (event.target);
            var data = this.resItemDic[loader.hashCode];
            delete this.resItemDic[loader.hashCode];
            var resItem = data.item;
            var compFunc = data.func;
            resItem.loaded = (event.type == egret.Event.COMPLETE);
            if (resItem.loaded) {
                this.analyzeData(resItem, loader.data);
            }
            this.recycler.push(loader);
            compFunc.call(data.thisObject, resItem);
        };
        /**
         * 解析并缓存加载成功的数据
         */
        __egretProto__.analyzeData = function (resItem, data) {
            var name = resItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            this.fileDic[name] = data;
        };
        /**
         * @inheritDoc
         */
        __egretProto__.getRes = function (name) {
            return this.fileDic[name];
        };
        /**
         * @inheritDoc
         */
        __egretProto__.hasRes = function (name) {
            var res = this.getRes(name);
            return res != null;
        };
        /**
         * @inheritDoc
         */
        __egretProto__.destroyRes = function (name) {
            if (this.fileDic[name]) {
                this.onResourceDestroy(this.fileDic[name]);
                delete this.fileDic[name];
                return true;
            }
            return false;
        };
        __egretProto__.onResourceDestroy = function (resource) {
        };
        return BinAnalyzer;
    })(RES.AnalyzerBase);
    RES.BinAnalyzer = BinAnalyzer;
    BinAnalyzer.prototype.__class__ = "RES.BinAnalyzer";
})(RES || (RES = {}));
