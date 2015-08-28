package notices
{
	import jing.framework.manager.notice.Notice;
	
	public class LevelNotice extends Notice
	{
		public function LevelNotice(type:String)
		{
			super(type);
		}
		
		/**
		 * 关卡完成了 
		 */		
		static public const LEVEL_COMPLETE:String = "LevelNotice:LevelComplete";
		
		/**
		 * 回退步骤
		 */
		static public const BACK_STEP:String = "LevelNotice:BackStep";
	}
}