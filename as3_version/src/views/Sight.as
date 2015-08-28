package views
{
	import datas.DataCenter;
	import datas.consts.AssetName;
	import datas.consts.GUIName;
	
	import jing.easyGUI.Unpackager;
	import jing.easyGUI.displays.JSprite;
	import jing.easyGUI.displays.controls.ImageNumber;
	import jing.framework.manager.notice.NoticeManager;
	import jing.utils.data.RandomUtil;
	
	import notices.MainNotice;
	
	import starling.display.BlendMode;
	import starling.display.Image;
	import starling.display.QuadBatch;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.textures.Texture;
	import starling.textures.TextureAtlas;
	
	import utils.AssetsUtil;
	import utils.SaveUtil;
	
	/**
	 * 视图的主容器 
	 * @author Jing
	 * 
	 */	
	public class Sight extends Sprite
	{
		private var _dc:DataCenter;
		private var _level:Level;
		private var _levelChoose:LevelChoose;
	
		public function Sight()
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
			initAssets();
			createBG();
			_level = new Level();
			
			EnterPanel.show();
			addListeners();
		}
		
		private function playGmae():void
		{
			var lastLevel:int = _dc.passedLevel[_dc.passedLevel.length - 1];
			if(lastLevel == DataCenter.MAX_LEVEL)
			{
				lastLevel = RandomUtil.getRandomInArray(_dc.passedLevel);
			}
			this.addChild(_level);
			_level.playLevel(lastLevel + 1);
		}
		
		private function addListeners():void
		{
			NoticeManager.addNoticeAction(MainNotice.SHOW_LEVEL_CHOOSE, showLevelChooseNotice);
			NoticeManager.addNoticeAction(MainNotice.LEVEL_CHOOSED, levelChoosedNotice);
			NoticeManager.addNoticeAction(MainNotice.BACK, backNotice);
			NoticeManager.addNoticeAction(MainNotice.ENTER_GAME, enterGameNotice);
		}
		
		private function removeListeners():void
		{
			NoticeManager.removeNoticeAction(MainNotice.SHOW_LEVEL_CHOOSE, showLevelChooseNotice);
			NoticeManager.removeNoticeAction(MainNotice.LEVEL_CHOOSED, levelChoosedNotice);
			NoticeManager.removeNoticeAction(MainNotice.BACK, backNotice);
			NoticeManager.removeNoticeAction(MainNotice.ENTER_GAME, enterGameNotice);
		}
		
		private function enterGameNotice(n:MainNotice):void
		{
			playGmae();
		}
		
		private function backNotice(n:MainNotice):void
		{
			if(_levelChoose)
			{
				this.removeChild(_levelChoose);
				_levelChoose.dispose();
				_levelChoose = null;
			}
		}
		
		private function levelChoosedNotice(n:MainNotice):void
		{
			if(n.data == 1)
			{
				_dc.allLevelOpenCount--;
				if(0 == _dc.allLevelOpenCount)
				{
					var allLevels:Array = new Array();
					for(var i:int = 1; i <= DataCenter.MAX_LEVEL; i++)
					{
						allLevels.push(i);
					}
					_dc.passedLevel = allLevels;
					SaveUtil.saveData();
				}
			}
			else
			{
				_dc.allLevelOpenCount = 10;
			}
			
			if(_levelChoose)
			{
				this.removeChild(_levelChoose);
				_levelChoose.dispose();
				_levelChoose = null;
			}
			_level.playLevel(n.data,true);
		}
		
		private function showLevelChooseNotice(n:MainNotice):void
		{
			if(null == _levelChoose)
			{
				_levelChoose = new LevelChoose();
				this.addChild(_levelChoose);
			}
		}
		
		/**
		 * 初始化游戏资源 
		 * 
		 */		
		private function initAssets():void
		{
			var assetsTexture:Texture = Texture.fromBitmapData(AssetsUtil.getAssetsBMD());
			_dc.assets = new TextureAtlas(assetsTexture,AssetsUtil.getAssetsXML());
			_dc.guiInfo = new Unpackager().unpackageXML2SpriteVODic(AssetsUtil.getGUIXML());
		}
		
		/**
		 * 创建背景 
		 * 
		 */		
		private function createBG():void
		{
			var bg:QuadBatch = new QuadBatch();
			var bgW:int;
			var bgH:int;
			while(bgW < stage.stageWidth)
			{
				while(bgH < stage.stageHeight)
				{
					var tile:Image = new Image(_dc.assets.getTexture(AssetName.GROUND));
					tile.x = bgW;
					tile.y = bgH;
					bgH += tile.height - 1;
					bg.addImage(tile);
				}
				bgH = 0;
				bgW = bg.width - 1;
			}
			this.addChildAt(bg,0);
		}
	}
}