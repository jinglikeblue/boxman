package views
{
	import starling.animation.Transitions;
	import starling.animation.Tween;
	import starling.core.Starling;
	import starling.display.Quad;
	import starling.display.Sprite;
	import starling.events.Event;
	
	public class SwitchLevelEffect extends Sprite
	{
		private var _quad:Quad;
		private var _onBlack:Function;
		private var _onOver:Function;
		private var _params:Array;
		public function SwitchLevelEffect()
		{
			super();
			this.addEventListener(Event.ADDED_TO_STAGE, addedToStageHandler);
		}
		
		private function addedToStageHandler(e:Event):void
		{
			this.removeEventListener(Event.ADDED_TO_STAGE, addedToStageHandler);
			
			_quad = new Quad(1,1,0);
			_quad.width = stage.stageWidth;
			_quad.height = stage.stageHeight;
			_quad.x = -(_quad.width >> 1);
			_quad.y = -(_quad.height >> 1);
			this.addChild(_quad);
			this.x = stage.stageWidth >> 1;
			this.y = stage.stageHeight >> 1;
			this.scaleX = 0;
			this.scaleY = 0;
		}
		
		public function run(onBlack:Function = null, onOver:Function = null, params:Array = null):void
		{
			_onBlack = onBlack;
			_onOver = onOver;
			_params = params;
			var tween:Tween = new Tween(this,0.5,Transitions.EASE_IN);
			tween.scaleTo(1);
			tween.onComplete = step1;
			Starling.juggler.add(tween);
		}
		
		private function step1():void
		{
			var tween:Tween = new Tween(this,0.5,Transitions.EASE_OUT);
			tween.scaleTo(0);
			tween.onComplete = step2;
			tween.delay = 0.5;
			Starling.juggler.add(tween);
			if(_onBlack != null)
			{
				_onBlack.call(null,_params);
			}
		}
		
		private function step2():void
		{
			if(_onOver != null)
			{
				_onOver.call(null,_params);
			}
		}
	}
}