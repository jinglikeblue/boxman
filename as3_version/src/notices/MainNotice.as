package notices
{
	import jing.framework.manager.notice.Notice;
	
	public class MainNotice extends Notice
	{
		private var _data:*;
		public function get data():*
		{
			return _data;
		}
		public function MainNotice(type:String, data:* = null)
		{
			_data = data;
			super(type);
		}
		
		/**
		 * 关卡选择 
		 */		
		static public const SHOW_LEVEL_CHOOSE:String = "MainNotice:ShowLevelChoose";
		
		/**
		 * 关卡选择了 
		 */		
		static public const LEVEL_CHOOSED:String = "MainNotice:LevelChossed";
		
		/**
		 * 回退 
		 */		
		static public const BACK:String = "MainNotice:Back";
		
		/**
		 * 进入游戏 
		 */		
		static public const ENTER_GAME:String = "MainNotice:EnterGame";
	}
}