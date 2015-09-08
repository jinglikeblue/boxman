var MoveUtil = (function () {
    function MoveUtil() {
    }
    var __egretProto__ = MoveUtil.prototype;
    /**
     * 得到移动后所在格子
     * @param nowGridX
     * @param nowGridY
     * @param moveDir
     * @return
     *
     */
    MoveUtil.getMovedGrid = function (nowGridX, nowGridY, moveDir) {
        var newGridX = nowGridX;
        var newGridY = nowGridY;
        switch (moveDir) {
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
        if (newGridX < MapInfo.TILE_COUNT && newGridX > 0 && newGridY < MapInfo.TILE_COUNT && newGridY > 0) {
            return new egret.Point(newGridX, newGridY);
        }
        return null;
    };
    /**
     * 得到格子上的对象
     * @param grid
     * @return
     *
     */
    MoveUtil.getGridUnit = function (grid, levelVO) {
        var flag = IntUtil.mixedTwoInt(grid.x, grid.y);
        return levelVO.gridDic[flag];
    };
    /**
     * 检查目标格子是否是目标位置
     * @param grid
     * @param levelVO
     * @return
     *
     */
    MoveUtil.checkGridIsTarget = function (gridX, gridY, levelVO) {
        if (levelVO === void 0) { levelVO = null; }
        if (null == levelVO) {
            levelVO = DataCenter.level;
        }
        var flag = IntUtil.mixedTwoInt(gridX, gridY);
        if (null == levelVO.targetGrid[flag]) {
            return false;
        }
        return true;
    };
    /**
     * 更新地图信息
     * @param nowGridX
     * @param nowGridY
     * @param newGridX
     * @param newGridY
     * @param levelVO
     *
     */
    MoveUtil.updateGridDic = function (nowGridX, nowGridY, newGridX, newGridY, levelVO) {
        var nowFlag = IntUtil.mixedTwoInt(nowGridX, nowGridY);
        var newFlag = IntUtil.mixedTwoInt(newGridX, newGridY);
        levelVO.gridDic[newFlag] = levelVO.gridDic[nowFlag];
        delete levelVO.gridDic[nowFlag];
    };
    /**
     * 得到指定方向相反的方向
     * @param dir
     * @return
     *
     */
    MoveUtil.getOppositeDirection = function (dir) {
        switch (dir) {
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
    };
    return MoveUtil;
})();
MoveUtil.prototype.__class__ = "MoveUtil";
//# sourceMappingURL=MoveUtil.js.map