package notices
{
	import jing.framework.manager.notice.Notice;
	
	public class MoveNotice extends Notice
	{
		private var _dir:int;
		/**
		 * 获取方向 
		 * @return 
		 * 
		 */		
		public function get dir():int
		{
			return _dir;
		}
		public function MoveNotice(type:String, dir:int = -1)
		{
			_dir = dir;
			super(type);
		}
		
		/**
		 * 让角色移动 
		 */		
		static public const MAKE_ROLE_MOVE:String = "MoveNotice:Move";
		
		/**
		 * 取消角色移动 
		 */		
		static public const CANCEL_ROLE_MOVE:String = "MoveNotice:CancelRoleMove";
		
		/**
		 * 盒子移动后 
		 */		
		static public const BOX_MOVED:String = "MoveNotice:BoxMoved";
		
	}
}