package views.level
{
	import datas.DataCenter;
	import datas.consts.AssetName;
	import datas.vos.units.TargetVO;
	
	import starling.display.Image;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.filters.ColorMatrixFilter;
	
	public class Target extends Sprite
	{
		private var _vo:TargetVO;
		private var _img:Image;
		private var _bright:Number = 0;
		private var _brightChangeValue:Number = 0.002;
		private var _cmf:ColorMatrixFilter;
		public function Target(vo:TargetVO)
		{
			super();
			_vo = vo;
			init();
		}
		
		private function init():void
		{
			var dc:DataCenter = DataCenter.getInstance();
			_img = new Image(dc.assets.getTexture(AssetName.TARGET));
			_img.x = -24;
			_img.y = -24;
			this.addChild(_img);
			
			_cmf = new ColorMatrixFilter();
			
			this.addEventListener(Event.ENTER_FRAME, enterFrameHandler);
		}
		
		private function enterFrameHandler(e:Event):void
		{
			_cmf.reset();
			if(_bright + _brightChangeValue > 0.2 || _bright + _brightChangeValue < -0)
			{
				_brightChangeValue *= -1;
			}
			_bright += _brightChangeValue;
			_cmf.adjustBrightness(_bright);
			_img.filter = _cmf;
		}
		
		override public function dispose():void
		{
			this.removeEventListener(Event.ENTER_FRAME, enterFrameHandler);
			super.dispose();
		}
	}
}