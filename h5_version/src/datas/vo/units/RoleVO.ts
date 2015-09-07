class RoleVO extends AUnitVO
{
    		/**
		 * 角色当前方向
		 */
		public dir:number = Direction.DOWN;
		
		/**
		 * 状态
		 * <ui>
		 * <li>0 站立</li>
		 * <li>1 移动</li>
		 * </ui> 
		 */		
		public state:number = 0;
} 