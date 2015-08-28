package views
{
	import datas.DataCenter;
	import datas.consts.AssetName;
	
	import jing.framework.manager.notice.NoticeManager;
	
	import notices.MainNotice;
	
	import starling.core.Starling;
	import starling.display.MovieClip;
	import starling.display.Sprite;
	import starling.display.Stage;
	import starling.events.Event;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.events.TouchPhase;
	
	import views.components.Button;
	
	/**
	 * 进入面板 
	 * @author Jing
	 * 
	 */	
	public class EnterPanel extends Sprite
	{
		static private var _enterPanel:EnterPanel;
		
		static public function show():void
		{
			if(null == _enterPanel)
			{
				var stage:Stage = Starling.current.stage;
				_enterPanel = new EnterPanel();
				stage.addChild(_enterPanel);
			}
		}
		
		static public function close():void
		{
			if(null != _enterPanel)
			{
				Starling.current.stage.removeChild(_enterPanel);
				_enterPanel.dispose();
				_enterPanel = null;
			}
			
		}
		
		
		private var _btnEnter:Button;
		private var _role:MovieClip;
		public function EnterPanel()
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
			_role = new MovieClip(DataCenter.getInstance().assets.getTextures(AssetName.ROLE_STAND_DOWN));
			_role.width = stage.stageWidth >> 1;
			_role.scaleY = _role.scaleX;
			_role.x = (stage.stageWidth - _role.width) >> 1;
			_role.y = (stage.stageHeight - _role.height) >> 1;			
			this.addChild(_role);
			Starling.current.juggler.add(_role);
			
			_btnEnter = new Button(AssetName.ENTER_GAME_BEFORE, AssetName.ENTER_GAME);
			_btnEnter.width = stage.stageWidth >> 1;
			_btnEnter.scaleY = _btnEnter.scaleX;
			_btnEnter.y = _role.y + _role.height + 20;
			_btnEnter.x = (stage.stageWidth - _btnEnter.width) >> 1;
			this.addChild(_btnEnter);
			
			_btnEnter.addEventListener(TouchEvent.TOUCH, _btnEnter_touchHandler);
			
		}
		
		private function _btnEnter_touchHandler(e:TouchEvent):void
		{
			var t:Touch = e.touches[0];
			if(TouchPhase.ENDED == t.phase)
			{
				Starling.current.juggler.remove(_role);
				NoticeManager.sendNotice(new MainNotice(MainNotice.ENTER_GAME));
				EnterPanel.close();
			
			}
		}
	}
}