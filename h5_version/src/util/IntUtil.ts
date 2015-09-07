class IntUtil
{
    /**
    * 混合两个字节以下的数字, 单个数字最大值0xFFFF
    * @param x
    * @param y
    * @return
    *
    */
    public static mixedTwoInt(x: number, y: number): number
    {
        return x | y << 16;
    }

    /**
     * 从混合数字中抽离出两个数字
     * @param value
     * @return
     *
     */
    public static unmixedTwoInt(value: number): egret.Point
    {
        var x: number = value & 0xFFFF;
        var y: number = value >> 16;
        return new egret.Point(x, y);
    }
} 