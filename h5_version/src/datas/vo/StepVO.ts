class StepVO
{
    public constructor(dir: number, boxId: number, startGridX: number, startGridY: number)
	{
		this.moveDir = dir;
		this.boxId = boxId;
		this.startGridX = startGridX;
		this.startGridY = startGridY;
	}
		
	/**
		* 移动的方向 
		*/		
	public moveDir:number;
		
	/**
		* 推动的箱子的ID,0表示没有
		*/		
    public boxId: number = 0;
		
	/**
		* 移动起始的格子X 
		*/		
    public startGridX: number;
		
	/**
		* 移动起始的格子Y 
		*/		
    public startGridY: number;
} 