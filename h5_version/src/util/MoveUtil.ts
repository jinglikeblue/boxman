class MoveUtil
{
        /**
         * 得到移动后所在格子
         * @param nowGridX
         * @param nowGridY
         * @param moveDir
         * @return
         *
         */
        public static getMovedGrid(nowGridX:number, nowGridY:number, moveDir:number):egret.Point
        {
            var newGridX:number = nowGridX;
            var newGridY:number = nowGridY;

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
                return new egret.Point(newGridX, newGridY);
            }
            return null;
        }

        /**
         * 得到格子上的对象
         * @param grid
         * @return
         *
         */
        public static getGridUnit(grid:egret.Point, levelVO:LevelVO):AUnitVO
        {
            var flag:number = IntUtil.mixedTwoInt(grid.x, grid.y);
            return levelVO.gridDic[flag];
        }

        /**
         * 检查目标格子是否是目标位置
         * @param grid
         * @param levelVO
         * @return
         *
         */
        public static checkGridIsTarget(gridX:number, gridY:number, levelVO:LevelVO = null):Boolean
        {
			if(null == levelVO)
			{
				levelVO = DataCenter.level;
			}
            var flag:number = IntUtil.mixedTwoInt(gridX, gridY);

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
        public static updateGridDic(nowGridX:number, nowGridY:number, newGridX:number, newGridY:number, levelVO:LevelVO):void
        {
            var nowFlag: number = IntUtil.mixedTwoInt(nowGridX, nowGridY);
            var newFlag: number = IntUtil.mixedTwoInt(newGridX, newGridY);
            levelVO.gridDic[newFlag] = levelVO.gridDic[nowFlag];
            delete levelVO.gridDic[nowFlag];
        }
		
		/**
		 * 得到指定方向相反的方向 
		 * @param dir
		 * @return 
		 * 
		 */		
        public static getOppositeDirection(dir:number):number
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