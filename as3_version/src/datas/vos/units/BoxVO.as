package datas.vos.units 
{
	/**
	 * 箱子数据对象
	 * @author Jing
	 */
	public class BoxVO extends AUnitVO
	{
		public function BoxVO():void
		{
			
		}
		
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