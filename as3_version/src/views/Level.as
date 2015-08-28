package views
{
	import datas.DataCenter;
	import datas.consts.AssetName;
	import datas.consts.GUIName;
	
	import jing.easyGUI.displays.controls.ImageNumber;
	import jing.framework.manager.notice.NoticeManager;
	
	import models.LevelModel;
	
	import notices.LevelNotice;
	import notices.MainNotice;
	
	import starling.display.Image;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.events.TouchPhase;
	import starling.filters.BlurFilter;
	
	import utils.SaveUtil;
	
	import views.level.Arrow;
	import views.level.CompleteEffect;
	import views.level.Map;
	import views.level.SoundSwitch;
	
	/**
	 * 关卡场景 
	 * @author Jing
	 * 
	 */	
	public class Level extends Sprite
	{
		private var _levelStartTime:int;
		
		private var _dc:DataCenter;
		
		private var _map:Map;
		private var _levelModel:LevelModel;
		private var _levelNo:ImageNumber;
		private var _sound:SoundSwitch;
		private var _btnLevels:Image;
		public function Level()
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
			
			_dc = DataCenter.getInstance();
			
//			_arrow = new Arrow(_dc.guiInfo[GUIName.ARROW],_dc.assets);
//			this.addChild(_arrow);
			_levelNo = new ImageNumber(_dc.assets,AssetName.LEVEL_NO);
			_levelNo.x = 10;
			_levelNo.y = 20;
			this.addChild(_levelNo);
			
			_btnLevels = new Image(_dc.assets.getTexture(AssetName.LEVEL));
			_btnLevels.addEventListener(TouchEvent.TOUCH, _btnLevels_touchHandler);
//			_btnLevels.scaleX = _btnLevels.scaleY = 1.5;
			_btnLevels.x = stage.stageWidth - _btnLevels.width - 10;
			_btnLevels.y = 10;
			
			this.addChild(_btnLevels);
			
			_sound = new SoundSwitch();
//			_sound.scaleX = _sound.scaleY = 1.5;
			_sound.x = _btnLevels.x - _sound.width - 30;
			_sound.y = 25;
			this.addChild(_sound);
			

			
			NoticeManager.addNoticeAction(LevelNotice.LEVEL_COMPLETE, levelCompleteNotice);
			
		}
		
		private function _btnLevels_touchHandler(e:TouchEvent):void
		{
			var touch:Touch = e.touches[0];
			if(TouchPhase.ENDED == touch.phase)
			{
				NoticeManager.sendNotice(new MainNotice(MainNotice.SHOW_LEVEL_CHOOSE));
			}
		}
		
		override public function dispose():void
		{
			if(_btnLevels)
			{
				_btnLevels.removeEventListener(TouchEvent.TOUCH, _btnLevels_touchHandler);
			}
			NoticeManager.removeNoticeAction(LevelNotice.LEVEL_COMPLETE, levelCompleteNotice);
			super.dispose();
		}
		
		private function levelCompleteNotice(n:LevelNotice):void
		{
			if(_dc.passedLevel.indexOf(_levelModel.vo.id) == -1)
			{
				_dc.passedLevel.push(_levelModel.vo.id);
				SaveUtil.saveData();
			}
			
			this.touchable = false;
			var effect:CompleteEffect = new CompleteEffect();
			effect.x = stage.stageWidth >> 1;
			effect.y = _map.height >> 1;
			this.addChild(effect);
			effect.runEffect(AssetName.BANG, onCompleteEffectShowed,8,[_levelModel.vo.id + 1]);
		}
		
		private function onCompleteEffectShowed(newLevelId:int):void
		{
			showSwitchEffect(newLevelId);
		}
		
		private function showSwitchEffect(newLevelId:int):void
		{
			this.touchable = false;
			var switchLevelEffect:SwitchLevelEffect = new SwitchLevelEffect();
			stage.addChild(switchLevelEffect);
			switchLevelEffect.run(onSwitchLevel,onSwitchLevelOver, [newLevelId]);
		}
		

		
		private function onSwitchLevel(newLevelId:int):void
		{
			playLevel(newLevelId);
		}
		
		private function onSwitchLevelOver(newLevelId:int):void
		{
			this.touchable = true;
		}
		
		/**
		 * 进行关卡 
		 * @param levelId
		 * 
		 */		
		public function playLevel(levelId:int, useEffect:Boolean = false):void
		{
			if(true == useEffect)
			{
				showSwitchEffect(levelId);
				return;
			}
			_levelNo.value = levelId;
			_levelNo.x = 10;
			_levelModel = new LevelModel(levelId, onLevelReady);

		}
		
		private function onLevelReady():void
		{
			if(null == _levelModel.vo)
			{
				//没有后续关卡了，回到第一关
				showSwitchEffect(1);
				return;
			}
			_dc.level = _levelModel.vo;
			if(_map)
			{
				if(_map.parent)
				{
					_map.parent.removeChild(_map);
				}
				_map.dispose();
				_map = null;
			}
			
			
			
//			_arrow.width = stage.stageWidth * 0.9;
//			_arrow.scaleY = _arrow.scaleX;
//			//			_arrow.scaleX = _arrow.scaleY = 3;
//			_arrow.x = stage.stageWidth - _arrow.width;
//			_arrow.y = stage.stageHeight - _arrow.height;
			
			_map = new Map(_levelModel);
			_map.width = stage.stageWidth;
			_map.scaleY = _map.scaleX;
			_map.y = stage.stageHeight - _map.height;
//			_map.y = 50 + ((_arrow.y - 50 - _map.height) >> 1);
			
			this.addChild(_map);
			this.addChild(_btnLevels);
			this.addChild(_levelNo);
			this.addChild(_sound);
		}
	}
}