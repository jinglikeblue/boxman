package views.level
{
	import datas.consts.Direction;
	
	import jing.easyGUI.displays.JSprite;
	import jing.easyGUI.vos.SpriteVO;
	import jing.framework.manager.notice.NoticeManager;
	
	import notices.LevelNotice;
	import notices.MainNotice;
	import notices.MoveNotice;
	
	import starling.display.Image;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.events.TouchPhase;
	import starling.textures.TextureAtlas;
	
	public class Arrow extends JSprite
	{
		public function Arrow(spriteVO:SpriteVO, texturesAtlas:TextureAtlas)
		{
			super(spriteVO, texturesAtlas);
			init();
		}
		
		private function init():void
		{
			this.addEventListener(TouchEvent.TOUCH, touchHandler);
		}
		
		private function touchHandler(e:TouchEvent):void
		{
			var touch:Touch = e.touches[0];
			var name:String;
			switch(touch.phase)
			{
				case TouchPhase.BEGAN:
					name = (e.target as Image).name;
//					trace(name);
					touchBegin(name);
					break;
				case TouchPhase.ENDED:
					name = (e.target as Image).name;
//					trace(name);
					touchEnded(name);					
					break;
				case TouchPhase.MOVED:
//					trace(touch.globalX,touch.globalY);
					break;
			}
		}
		
		private function touchEnded(targetName:String):void
		{
			switch(targetName)
			{
				case "up":
				case "right":
				case "left":
				case "down":
				case "back":
//					trace("取消移动");
					NoticeManager.sendNotice(new MoveNotice(MoveNotice.MAKE_ROLE_MOVE, Direction.NONE));
					break;
			}
		}
		
		private function touchBegin(targetName:String):void
		{
			switch(targetName)
			{
				case "up":
					NoticeManager.sendNotice(new MoveNotice(MoveNotice.MAKE_ROLE_MOVE, Direction.UP));
					break;
				case "right":
					NoticeManager.sendNotice(new MoveNotice(MoveNotice.MAKE_ROLE_MOVE, Direction.RIGHT));
					break;
				case "left":
					NoticeManager.sendNotice(new MoveNotice(MoveNotice.MAKE_ROLE_MOVE, Direction.LEFT));
					break;
				case "down":
					NoticeManager.sendNotice(new MoveNotice(MoveNotice.MAKE_ROLE_MOVE, Direction.DOWN));
					break;
				case "back":
					NoticeManager.sendNotice(new LevelNotice(LevelNotice.BACK_STEP));
					break;
				case "level":
					NoticeManager.sendNotice(new MainNotice(MainNotice.SHOW_LEVEL_CHOOSE));
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