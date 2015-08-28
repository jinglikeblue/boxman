package views.components
{
    import datas.DataCenter;
    import datas.consts.AssetName;

    import jing.easyGUI.displays.controls.ImageNumber;
    import jing.framework.manager.notice.NoticeManager;
    import jing.utils.data.RandomUtil;

    import notices.MainNotice;

    import starling.display.Image;
    import starling.display.Sprite;
    import starling.events.Touch;
    import starling.events.TouchEvent;
    import starling.events.TouchPhase;

    /**
     * 关卡项
     * @author Jing
     *
     */
    public class LevelItem extends Sprite
    {
        private var _bg:Image;

        private var _no:ImageNumber;

        private var _levelId:int;

        public function LevelItem()
        {
            super();
            var dc:DataCenter = DataCenter.getInstance();
            _bg = new Image(dc.assets.getTexture(AssetName.LEVEL_BG));
            _no = new ImageNumber(dc.assets, AssetName.BIG);
            this.addChild(_bg);
            this.addChild(_no);

            this.addEventListener(TouchEvent.TOUCH, touchHandler);
        }

        private function touchHandler(e:TouchEvent):void
        {
            var touch:Touch = e.touches[0];

            if (touch.phase == TouchPhase.ENDED)
            {
                NoticeManager.sendNotice(new MainNotice(MainNotice.LEVEL_CHOOSED, _levelId));
            }
        }

        /**
         * 设置关卡ID
         * @param levelId
         *
         */
        public function setLevelId(levelId:int):void
        {
            _levelId = levelId;
            _no.value = levelId;
            _no.x = (_bg.width - _no.width) >> 1;
            _no.y = (_bg.height - _no.height) >> 1;
        }

        override public function dispose():void
        {
            this.removeEventListener(TouchEvent.TOUCH, touchHandler);
            _bg.dispose();
            _no.dispose();
            super.dispose();
        }

    }
}
