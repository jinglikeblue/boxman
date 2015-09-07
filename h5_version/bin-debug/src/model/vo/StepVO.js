var StepVO = (function () {
    function StepVO(dir, boxId, startGridX, startGridY) {
        /**
            * 推动的箱子的ID,0表示没有
            */
        this.boxId = 0;
        this.moveDir = dir;
        this.boxId = boxId;
        this.startGridX = startGridX;
        this.startGridY = startGridY;
    }
    return StepVO;
})();
//# sourceMappingURL=StepVO.js.map