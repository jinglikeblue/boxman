package views.components
{
	import datas.DataCenter;
	
	import starling.display.Image;
	import starling.display.Sprite;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.events.TouchPhase;
	
	public class Button extends Image
	{
		private var _normal:String;
		private var _down:String;
		public function Button(normalName:String, downName:String)
		{
			super(DataCenter.getInstance().assets.getTexture(normalName));
			_normal = normalName;
			_down = downName;
			init();
		}
		
		private function init():void
		{
			this.addEventListener(TouchEvent.TOUCH, touchHandler);
		}
		
		public function touchHandler(e:TouchEvent):void
		{
			var t:Touch = e.touches[0];
			switch(t.phase)
			{
				case TouchPhase.BEGAN:
					texture = DataCenter.getInstance().assets.getTexture(_down);
					break;
				case TouchPhase.ENDED:
					texture = DataCenter.getInstance().assets.getTexture(_normal);
					break;
			}
		}
		
		override public function dispose():void
		{
			this.removeEventListener(TouchEvent.TOUCH, touchHandler);
			super.dispose();
		}
	}
}