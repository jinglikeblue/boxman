package
{
	import datas.DataCenter;
	import datas.consts.Direction;
	
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.geom.Rectangle;
	import flash.system.Capabilities;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFormat;
	import flash.ui.Keyboard;
	
	import jing.audio.AudioDevice;
	import jing.audio.AudioInfoVO;
	import jing.audio.AudioSetting;
	import jing.framework.manager.notice.NoticeManager;
	import jing.utils.data.StringUtil;
	
	import notices.LevelNotice;
	import notices.MoveNotice;
	
	import starling.core.Starling;
	
	import utils.SaveUtil;
	
	import views.ExitPanel;
	import views.Sight;
	
	[SWF(frameRate="60", width="768", height="768", backgroundColor="#000000")]
	public class PushBox_Web extends Sprite
	{
		private var _starling:Starling;
		
		private var _isAnyKeyDown:Boolean;
		
		private var _text:TextField;
		
		public function PushBox_Web()
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
			_text = new TextField();
			_text.text = "Produce By Jing & Owen";
			_text.setTextFormat(new TextFormat(null,40,0x00FF00,true));
			_text.autoSize = TextFieldAutoSize.CENTER;
			this.addChild(_text);
			this.graphics.beginFill(0,1);
			this.graphics.drawRect(0,0,Capabilities.screenResolutionX,Capabilities.screenResolutionY);
			this.graphics.endFill();
			
			registSounds();
			initData();
			trace("OS: " + Capabilities.os);
			//			Capabilities.screenResolutionX;
			//			Capabilities.screenResolutionY;
			trace(StringUtil.format("init_size {0}*{1}", Capabilities.screenResolutionX, stage.stageHeight));
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			stage.frameRate = 60;
			Starling.handleLostContext = true;
			stage.addEventListener(Event.RESIZE, stage_resizeHandler);
			stage.addEventListener(KeyboardEvent.KEY_DOWN, stage_keyDownHandler);
			stage.addEventListener(KeyboardEvent.KEY_UP, stage_keyUpHandler);
			stage_resizeHandler(null);
		}
		
		private function initData():void
		{
			SaveUtil.loadData();
		}
		
		private function stage_keyDownHandler(e:KeyboardEvent):void
		{
			switch(e.keyCode)
			{
				case Keyboard.UP:
					NoticeManager.sendNotice(new MoveNotice(MoveNotice.MAKE_ROLE_MOVE, Direction.UP));
					break;
				case Keyboard.LEFT:
					NoticeManager.sendNotice(new MoveNotice(MoveNotice.MAKE_ROLE_MOVE, Direction.LEFT));
					break;
				case Keyboard.RIGHT:
					NoticeManager.sendNotice(new MoveNotice(MoveNotice.MAKE_ROLE_MOVE, Direction.RIGHT));
					break;
				case Keyboard.DOWN:
					NoticeManager.sendNotice(new MoveNotice(MoveNotice.MAKE_ROLE_MOVE, Direction.DOWN));
					break;
				case Keyboard.BACK:
					trace("回退键");
					e.preventDefault();
					//					NoticeManager.sendNotice(new MainNotice(MainNotice.BACK));
					ExitPanel.show();
					break;
			}
		}
		
		private function stage_keyUpHandler(e:KeyboardEvent):void
		{
			switch(e.keyCode)
			{
				case Keyboard.UP:
				case Keyboard.LEFT:
				case Keyboard.RIGHT: 
				case Keyboard.DOWN:
					NoticeManager.sendNotice(new MoveNotice(MoveNotice.MAKE_ROLE_MOVE, Direction.NONE));
					break;
				case Keyboard.MENU:
					trace("菜单键");
					break;
				case Keyboard.SEARCH:
					trace("搜索键");
					break;
				case Keyboard.SPACE:
					NoticeManager.sendNotice(new LevelNotice(LevelNotice.BACK_STEP));
					break;
				
			}
			
		}
		
		private function stage_resizeHandler(e:Event):void
		{
			if(_text != null)
			{
				_text.y = stage.stageHeight >> 1;
				_text.x = (stage.stageWidth - _text.width) >> 1;
			}
			
			if(null == _starling)
			{
				const initW:int = stage.stageWidth;
				const initH:int = stage.stageHeight;
				trace(StringUtil.format("starling_init {0}*{1}", initW, initH));
				_starling = new Starling(Sight, stage, new Rectangle(0, 0, initW, initH));
				_starling.viewPort = new Rectangle(0, 0, initW, initH);
				_starling.stage3D.addEventListener(Event.CONTEXT3D_CREATE, onContextCreated);
				//				_starling.showStats = true;
				//				_starling.showStatsAt(HAlign.LEFT, VAlign.TOP, 1);
				_starling.start();
			}
			else
			{
				trace(StringUtil.format("stage_resize {0}*{1}", stage.stageWidth, stage.stageHeight));
				_starling.viewPort = new Rectangle(0, 0, stage.stageWidth, stage.stageHeight);
			}
		}
		
		private function onContextCreated(e:Event):void
		{
			graphics.clear();
			if(_text)
			{
				this.removeChild(_text);
			}
			var dc:DataCenter = DataCenter.getInstance();
			var aset:AudioSetting = new AudioSetting();
			aset.isLoop = true;
			aset.type = 0;
			aset.track = 1;
			aset.volume = 0.5;
			dc.audioDevice.play("bgm",aset);
		}
		
		private function registSounds():void
		{
			var dc:DataCenter = DataCenter.getInstance();
			dc.audioDevice = new AudioDevice();
			
			var baseAudioInfo:AudioInfoVO;
			baseAudioInfo = new AudioInfoVO();
			baseAudioInfo.id = "bgm";
			baseAudioInfo.playerName = AudioDevice.PLAYER_MP3;
			baseAudioInfo.source = "assets/sounds/bgm.mp3";
			dc.audioDevice.registAudioInfo(baseAudioInfo);
			
			baseAudioInfo = new AudioInfoVO();
			baseAudioInfo.id = "boot";
			baseAudioInfo.playerName = AudioDevice.PLAYER_MP3; 
			baseAudioInfo.source = "assets/sounds/boot.mp3";
			dc.audioDevice.registAudioInfo(baseAudioInfo);
			
			baseAudioInfo = new AudioInfoVO();
			baseAudioInfo.id = "push";
			baseAudioInfo.playerName = AudioDevice.PLAYER_MP3;
			baseAudioInfo.source = "assets/sounds/push.mp3";
			dc.audioDevice.registAudioInfo(baseAudioInfo);
		}
	}
}