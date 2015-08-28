package views.level
{
	import datas.DataCenter;
	import datas.consts.AssetName;
	
	import jing.audio.AudioDevice;
	
	import starling.display.Image;
	import starling.display.Sprite;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.events.TouchPhase;
	
	/**
	 * 声音开关 
	 * @author Jing
	 * 
	 */	
	public class SoundSwitch extends Sprite
	{
		private var _ad:AudioDevice;
		private var _image:Image;
		private var _soundEnable:Boolean =true;
		public function SoundSwitch()
		{
			super();
			_ad = DataCenter.getInstance().audioDevice;
			_image = new Image(DataCenter.getInstance().assets.getTexture(AssetName.SOUND_ON));
			this.addChild(_image);
			this.addEventListener(TouchEvent.TOUCH, touchHandler);
		}
		
		private function touchHandler(e:TouchEvent):void
		{
			var t:Touch = e.touches[0];
			if(TouchPhase.ENDED == t.phase)
			{
				_soundEnable = !_soundEnable;
				refresh();
			}
		}
		
		override public function dispose():void
		{
			this.removeEventListener(TouchEvent.TOUCH, touchHandler);
			super.dispose();
		}
		
		public function refresh():void
		{
			if(_soundEnable)
			{
				_image.texture = DataCenter.getInstance().assets.getTexture(AssetName.SOUND_ON);
				_ad.setVolume(1);
			}
			else
			{
				_image.texture = DataCenter.getInstance().assets.getTexture(AssetName.SOUND_OFF)
				_ad.setVolume(0);
			}		
		}
	}
}