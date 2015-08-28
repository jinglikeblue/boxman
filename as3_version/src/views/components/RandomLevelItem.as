package views.components
{
    import datas.DataCenter;
    import datas.consts.AssetName;

    import jing.framework.manager.notice.NoticeManager;
    import jing.utils.data.RandomUtil;

    import notices.MainNotice;

    import starling.display.Image;
    import starling.display.Sprite;
    import starling.events.Touch;
    import starling.events.TouchEvent;
    import starling.events.TouchPhase;

    public class RandomLevelItem extends Sprite
    {
        private var _bg:Image;

        private var _dice:Image;

        public function RandomLevelItem()
        {
            super();
            var dc:DataCenter = DataCenter.getInstance();
            _bg = new Image(dc.assets.getTexture(AssetName.LEVEL_BG));
            _dice = new Image(dc.assets.getTexture(AssetName.DICE));
            this.addChild(_bg);
            this.addChild(_dice);
            _dice.x = (_bg.width - _dice.width) >> 1;
            _dice.y = (_bg.height - _dice.height) >> 1;

            this.addEventListener(TouchEvent.TOUCH, touchHandler);
        }

        private function touchHandler(e:TouchEvent):void
        {
            var touch:Touch = e.touches[0];

            if (touch.phase == TouchPhase.ENDED)
            {
                var levelId:int = RandomUtil.getRandomInArray(DataCenter.getInstance().passedLevel);
                NoticeManager.sendNotice(new MainNotice(MainNotice.LEVEL_CHOOSED, levelId));
            }
        }

        override public function dispose():void
        {
            this.removeEventListener(TouchEvent.TOUCH, touchHandler);
            _bg.dispose();
            _dice.dispose();
            super.dispose();
        }
    }
}
