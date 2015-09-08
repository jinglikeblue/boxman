var AudioDevice = (function () {
    function AudioDevice() {
    }
    var __egretProto__ = AudioDevice.prototype;
    /**
    * 在第一次捕获到点击事件时，预加载声音文件，用这个的好处是第一次准备好以后，可以在IOS或ANDROID中无点击事件时播放声音
    */
    AudioDevice.prep = function (names, stage, onPrep) {
        if (onPrep === void 0) { onPrep = null; }
        if (stage != null && names != null) {
            this._names = names;
            this._stage = stage;
            this._onPrepFun = onPrep;
            this._stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.prepTriggered, this);
        }
    };
    AudioDevice.prepTriggered = function () {
        this._stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.prepTriggered, this);
        var names = this._names;
        var count = names.length;
        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            if (null == this._soundDic[name]) {
                var sound = AudioDevice.getSound(name);
                sound.play();
                sound.pause();
                this._soundDic[name] = sound;
            }
        }
        if (this._onPrepFun != null) {
            this._onPrepFun.call(null);
        }
    };
    /**
    * 播放BGM
    */
    AudioDevice.playBGM = function (name) {
        if (this._bgm != null) {
            this._bgm.pause();
        }
        var sound = AudioDevice.getSound(name);
        sound.type = egret.Sound.MUSIC;
        sound.play(true);
        this._bgm = sound;
        return sound;
    };
    /**
    * 播放音效
    */
    AudioDevice.playEffect = function (name, loop) {
        if (loop === void 0) { loop = false; }
        var sound = AudioDevice.getSound(name);
        sound.play(loop);
        return sound;
    };
    /**
    * 暂停指定的音乐
    */
    AudioDevice.pause = function (name) {
        var sound = this._soundDic[name];
        if (sound) {
            sound.pause();
        }
        return sound;
    };
    AudioDevice.getSound = function (name) {
        var sound = this._soundDic[name];
        if (null == sound) {
            this._soundDic[name] = RES.getRes(name);
            sound = AudioDevice.getSound(name);
        }
        return sound;
    };
    AudioDevice._soundDic = {};
    AudioDevice._names = null;
    AudioDevice._stage = null;
    AudioDevice._onPrepFun = null;
    AudioDevice._bgm = null;
    return AudioDevice;
})();
AudioDevice.prototype.__class__ = "AudioDevice";
//# sourceMappingURL=AudioDevice.js.map