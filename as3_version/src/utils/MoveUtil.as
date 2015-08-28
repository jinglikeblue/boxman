package utils
{
    import flash.geom.Point;
    
    import datas.DataCenter;
    import datas.consts.Direction;
    import datas.consts.MapInfo;
    import datas.vos.LevelVO;
    import datas.vos.units.AUnitVO;
    
    import jing.utils.data.IntUtil;

    public class MoveUtil
    {
        /**
         * 得到移动后所在格子
         * @param nowGridX
         * @param nowGridY
         * @param moveDir
         * @return
         *
         */
        static public function getMovedGrid(nowGridX:int, nowGridY:int, moveDir:int):Point
        {
            var newGridX:int = nowGridX;
            var newGridY:int = nowGridY;

            switch (moveDir)
            {
                case Direction.UP:
                    newGridY = nowGridY - 1;
                    break;
                case Direction.LEFT:
                    newGridX = nowGridX - 1;
                    break;
                case Direction.DOWN:
                    newGridY = nowGridY + 1;
                    break;
                case Direction.RIGHT:
                    newGridX = nowGridX + 1;
                    break;
            }

            if (newGridX < MapInfo.TILE_COUNT && newGridX > 0 && newGridY < MapInfo.TILE_COUNT && newGridY > 0)
            {
                return new Point(newGridX, newGridY);
            }
            return null;
        }

        /**
         * 得到格子上的对象
         * @param grid
         * @return
         *
         */
        static public function getGridUnit(grid:Point, levelVO:LevelVO):AUnitVO
        {
            var flag:uint = IntUtil.mixedTwoInt(grid.x, grid.y);
            return levelVO.gridDic[flag];
        }

        /**
         * 检查目标格子是否是目标位置
         * @param grid
         * @param levelVO
         * @return
         *
         */
        static public function checkGridIsTarget(gridX:int, gridY:int, levelVO:LevelVO = null):Boolean
        {
			if(null == levelVO)
			{
				levelVO = DataCenter.getInstance().level;
			}
            var flag:uint = IntUtil.mixedTwoInt(gridX, gridY);

            if (null == levelVO.targetGrid[flag])
            {
                return false;
            }
            return true;
        }

        /**
         * 更新地图信息
         * @param nowGridX
         * @param nowGridY
         * @param newGridX
         * @param newGridY
         * @param levelVO
         *
         */
        static public function updateGridDic(nowGridX:int, nowGridY:int, newGridX:int, newGridY:int, levelVO:LevelVO):void
        {
            var nowFlag:uint = IntUtil.mixedTwoInt(nowGridX, nowGridY);
            var newFlag:uint = IntUtil.mixedTwoInt(newGridX, newGridY);
            levelVO.gridDic[newFlag] = levelVO.gridDic[nowFlag];
            delete levelVO.gridDic[nowFlag];
        }
		
		/**
		 * 得到指定方向相反的方向 
		 * @param dir
		 * @return 
		 * 
		 */		
		static public function getOppositeDirection(dir:int):int
		{
			switch(dir)
			{
				case Direction.LEFT:
					dir = Direction.RIGHT;
					break;
				case Direction.RIGHT:
					dir = Direction.LEFT;
					break;
				case Direction.UP:
					dir = Direction.DOWN;
					break;
				case Direction.DOWN:
					dir = Direction.UP;
					break;
			}
			return dir;
		}
    }
}
