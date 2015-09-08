//移动处理类
class MoveCompute
{
    private _startX: number;
    private _startY: number;
    private _endX: number;
    private _endY: number;
    private _totalTime: number;
    private _startTime: number;
    private _dx: number;
    private _dy: number;

    private _nowX: number;

    public get nowX(): number
    {
        return this._nowX;
    }

    private _nowY: number;

    public get nowY(): number
    {
        return this._nowY;
    }

    public constructor()
    {

    }

    public reset(startX: number, startY: number, endX: number, endY: number, speed: number): void
    {
        this._startX = startX;
        this._startY = startY;
        this._endX = endX;
        this._endY = endY;
        this._dx = endX - startX;
        this._dy = endY - startY;
        var distance: number = Math.sqrt(this._dx * this._dx + this._dy * this._dy);
        this._totalTime = Math.ceil(distance / speed);
        this._startTime = egret.getTimer();
    }

    public update(): boolean
    {
        var costTime: number = egret.getTimer() - this._startTime;
        if (costTime > this._totalTime)
        {
            this._nowX = this._endX;
            this._nowY = this._endY;
            return true;
        }
        var k: number = costTime / this._totalTime;
        this._nowX = this._startX + this._dx * k;
        this._nowY = this._startY + this._dy * k;
        return false;
    }
}