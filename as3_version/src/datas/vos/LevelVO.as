package datas.vos 
{
	import flash.utils.Dictionary;
	
	import datas.vos.record.StepVO;
	import datas.vos.units.TargetVO;

	/**
	 * 地图数据
	 * @author Jing
	 */
	public class LevelVO 
	{
		public function LevelVO():void
		{
			
		}
		
		/**
		 * 关卡名称 
		 */		
		public var name:String;
		
		/**
		 * 关卡ID 
		 */		
		public var id:int;
		
		/**
		 * 地图的节点数据
		 */
 		public var mapNodes:Array;
		
		/**
		 * 地图上的单位字典
		 */
		public var units:Dictionary = new Dictionary();
		
		/**
		 * 地图上的格子数据 
		 */		
		public var gridDic:Dictionary = new Dictionary(); 
		
		/**
		 * 玩家操作的步骤
		 */
		public var steps:Vector.<StepVO> = new Vector.<StepVO>();
		
		/**
		 * 目标 
		 */		
//		public var targets:Vector.<TargetVO>;
		
		/**
		 * 目标格子 
		 */		
		public var targetGrid:Dictionary = new Dictionary();
	}

}