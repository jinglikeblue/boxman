class ArrayUtil
{
    /**
     * 调用外部方法
     */
    public static random(inputArray:any[]): any[]
    {
        inputArray = inputArray.concat();
        var outputArray: any[] = [];

        var i: number = 0;

        while (i < inputArray.length)
        {
            var randomIndex: number = Math.floor(inputArray.length * Math.random());
            outputArray.push(inputArray[randomIndex]);
            inputArray.splice(randomIndex, 1);
        }

        return outputArray;
    }
}
