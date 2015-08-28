package views
{
	import datas.consts.AssetName;
	
	import starling.core.Starling;
	import starling.display.Quad;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.events.TouchPhase;
	
	import views.components.Button;
	
	/**
	 * 退出面板 
	 * @author Jing
	 * 
	 */	
	public class ExitPanel extends Sprite
	{
		static private var _exitPanel:ExitPanel;
		
		static public function show():void
		{
			if(null == _exitPanel)
			{
				_exitPanel = new ExitPanel();
				Starling.current.stage.addChild(_exitPanel);
				
			}
		}
		
		static public function close():void
		{
			if(null != _exitPanel)
			{
				Starling.current.stage.removeChild(_exitPanel);
				_exitPanel.dispose();
				_exitPanel = null;
				
			}
			
		}
		
		private var _btnExit:Button;
		public function ExitPanel()
		{
			super();
			this.addEventListener(Event.ADDED_TO_STAGE, addedToStageHandler);
			
		}
		
		private function addedToStageHandler(e:Event):void
		{
			this.removeEventListener(Event.ADDED_TO_STAGE, addedToStageHandler);
			init();
		}
		
		private function init():void
		{
			this.addEventListener(TouchEvent.TOUCH, touchHandler);
			var quad:Quad = new Quad(1,1,0x666666);
			quad.alpha = 0.7;
			this.addChild(quad);
			quad.width = stage.stageWidth;
			quad.height = stage.stageHeight;
			
			_btnExit = new Button(AssetName.EXIT,AssetName.EXIT_DOWN);
			_btnExit.width = stage.width >> 1;
			_btnExit.scaleY = _btnExit.scaleX;
			_btnExit.x = (quad.width - _btnExit.width) >> 1;
			_btnExit.y = (quad.height - _btnExit.height) >> 1;
			this.addChild(_btnExit);
		}
		
		public function touchHandler(e:TouchEvent):void
		{
			var t:Touch = e.touches[0];
			if(TouchPhase.ENDED == t.phase)
			{
				if(e.target == _btnExit)
				{
//					NativeApplication.nativeApplication.exit();
				}
				else
				{
					ExitPanel.close();
				}
			}
		}
		
		override public function dispose():void
		{
			this.removeEventListener(TouchEvent.TOUCH, touchHandler);
			super.dispose();
		}
	}
}