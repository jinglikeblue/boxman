class GameNotice extends Notice
{
	/**
		* 让角色移动 
		*/		
    public static MAKE_ROLE_MOVE:string = "MoveNotice:Move";
		
	/**
		* 取消角色移动 
		*/		
    public static CANCEL_ROLE_MOVE: string = "MoveNotice:CancelRoleMove";
		
    /**
	    * 盒子移动后 
	    */		
    public static BOX_MOVED: string = "MoveNotice:BoxMoved";

    	/**
		 * 关卡完成了 
		 */		
    public static LEVEL_COMPLETE: string = "LevelNotice:LevelComplete";
		
		/**
		 * 回退步骤
		 */
    public static BACK_STEP: string = "LevelNotice:BackStep";
} 