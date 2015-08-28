package datas.vos.units 
{
	import datas.consts.Direction;

	/**
	 * ...
	 * @author Jing
	 */
	public class RoleVO extends AUnitVO
	{	
		public function RoleVO():void
		{
			
		}
		
		/**
		 * 角色当前方向
		 */
		public var dir:int = Direction.DOWN;
		
		/**
		 * 状态
		 * <ui>
		 * <li>0 站立</li>
		 * <li>1 移动</li>
		 * </ui> 
		 */		
		public var state:int = 0;
	}

}