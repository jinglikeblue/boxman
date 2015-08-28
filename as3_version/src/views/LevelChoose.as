package views
{
	import datas.DataCenter;
	
	import jing.framework.manager.notice.NoticeManager;
	
	import notices.MainNotice;
	
	import starling.display.Quad;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.events.TouchPhase;
	
	import views.components.LevelItem;
	import views.components.RandomLevelItem;
	
	/**
	 * 关卡选择 
	 * @author Jing
	 * 
	 */	
	public class LevelChoose extends Sprite
	{
		private var _items:Vector.<Sprite> = new Vector.<Sprite>();
		private var _itemSpr:Sprite;
		private var _bg:Quad;
		public function LevelChoose()
		{
			super();
			this.addEventListener(Event.ADDED_TO_STAGE, addedToStageHandler);
			
		
		}
		
		private function addedToStageHandler(e:Event):void
		{
			this.removeEventListener(Event.ADDED_TO_STAGE, addedToStageHandler);
			
			init();	
		}
		
		private function touchEvent(e:TouchEvent):void
		{
			var t:Touch = e.touches[0];
			if(t.phase == TouchPhase.ENDED)
			{
				NoticeManager.sendNotice(new MainNotice(MainNotice.BACK));
			}
		}
		
		private function init():void
		{
			_bg =  new Quad(1,1,0x333333,true);
			_bg.alpha = 0.5;
			_bg.width = stage.stageWidth;
			_bg.height = stage.stageHeight;
			_bg.addEventListener(TouchEvent.TOUCH, touchEvent);
			this.addChild(_bg);
			
			_itemSpr = new Sprite();
			this.addChild(_itemSpr);
			var passedLevel:Array = DataCenter.getInstance().passedLevel;
			var gapX:int = 4;
			var gapY:int = 4;
			
			var posX:int;
			var posY:int;
			const ROW_COUNT:int = 10;
			var rowCount:int = ROW_COUNT;
			var showLevelCount:int =  passedLevel.length;
			if(showLevelCount < DataCenter.MAX_LEVEL)
			{
				showLevelCount += 1;
			}
			
			//为了测试，全开
//			showLevelCount = DataCenter.MAX_LEVEL;
			
			for(var i:int = 1; i <= showLevelCount; i++)
			{
				var levelItem:LevelItem = new LevelItem();
				levelItem.setLevelId(i);
				levelItem.x = posX;
				levelItem.y = posY;
				_itemSpr.addChild(levelItem);
				_items.push(levelItem);
				posX = posX + levelItem.width + gapX;
				rowCount--;
				if(0 == rowCount)
				{
					rowCount = ROW_COUNT;
					posX = 0;
					posY = levelItem.y + levelItem.height + gapY;
				}
			}
			
			var randomItem:RandomLevelItem = new RandomLevelItem();
			randomItem.x = posX;
			randomItem.y = posY;
			_itemSpr.addChild(randomItem);
			_items.push(randomItem);
			
			_itemSpr.x = (stage.stageWidth - _itemSpr.width) >> 1;
			_itemSpr.y = 96;
//			trace(_itemSpr.y);
//			var scaleX:Number = stage.stageWidth / _itemSpr.width;
//			var scaleY:Number = stage.stageHeight / _itemSpr.height;
//			if(scaleY > scaleX)
//			{
//				_itemSpr.width = stage.stageWidth;
//				_itemSpr.scaleY = _itemSpr.scaleX;
//			}
//			else
//			{
//				_itemSpr.height = stage.stageHeight;
//				_itemSpr.scaleX = _itemSpr.scaleY;
//			}
			
		
			
		}
		
		override public function dispose():void
		{
			_bg.removeEventListener(TouchEvent.TOUCH, touchEvent);
			for each(var item:Sprite in _items)
			{
				_itemSpr.removeChild(item);
				item.dispose();
			}
			super.dispose();
		}
	}
}