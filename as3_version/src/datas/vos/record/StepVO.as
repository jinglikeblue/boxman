package datas.vos.record 
{
	/**
	 * 操作步骤的记录
	 * @author Jing
	 */
	public class StepVO 
	{
		public function StepVO(dir:int,boxId:uint, startGridX:int, startGridY:int):void
		{
			this.moveDir = dir;
			this.boxId = boxId;
			this.startGridX = startGridX;
			this.startGridY = startGridY;
		}
		
		/**
		 * 移动的方向 
		 */		
		public var moveDir:int;
		
		/**
		 * 推动的箱子的ID,0表示没有
		 */		
		public var boxId:uint = 0;
		
		/**
		 * 移动起始的格子X 
		 */		
		public var startGridX:uint;
		
		/**
		 * 移动起始的格子Y 
		 */		
		public var startGridY:uint;
	}

}