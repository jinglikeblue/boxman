package datas.vos.units 
{
	/**
	 * 抽象单位类
	 * @author Jing
	 */
	public class AUnitVO 
	{		
		public function AUnitVO():void
		{
			
		}
		
		/**
		 * 单位ID
		 */
 		public var id:uint;
		
		/**
		 * 单位类型 
		 */		
		public var unitType:int;
		
		/**
		 * 所在格子的X坐标
		 */
 		public var gridX:int;
		
		/**
		 * 所在格子的Y坐标
		 */
		public var gridY:int;
	}

}