package views.level
{
	import datas.DataCenter;
	
	import starling.core.Starling;
	import starling.display.MovieClip;
	import starling.display.Sprite;
	import starling.events.Event;
	
	public class CompleteEffect extends Sprite
	{		
		private var _effect:MovieClip;
		private var _onCompleteFun:Function;
		private var _params:Array;
		public function CompleteEffect()
		{
			super();
		}
		
		public function runEffect(assetName:String, onCompleteFun:Function = null, fps:int = 12, params:Array = null):void
		{
			if(_effect)
			{
				return;
			}
			_onCompleteFun = onCompleteFun;
			_params = params;
			var dc:DataCenter = DataCenter.getInstance();
			_effect = new MovieClip(dc.assets.getTextures(assetName),fps);
			_effect.addEventListener(Event.COMPLETE, _effect_completeHandler);
			this.addChild(_effect);
			_effect.width = stage.stageWidth;
			_effect.scaleY = _effect.scaleX;
			_effect.x = -(_effect.width >> 1);
			_effect.y = -(_effect.height >> 1);
			Starling.current.juggler.add(_effect);
		}
		
		private function _effect_completeHandler(e:Event):void
		{
			Starling.current.juggler.remove(_effect);
			this.removeChild(_effect);
			_effect.dispose();
			_effect = null;
			if(_onCompleteFun != null)
			{
				_onCompleteFun.call(null,_params);
				_onCompleteFun = null;
			}
			
			//自我销毁
			if(this.parent)
			{
				this.parent.removeChild(this);
				dispose();
			}
		}
	}
}