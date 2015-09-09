class ControlLayer extends egret.Shape
{
    private startPos: egret.Point;
    private nowPos: egret.Point;
    public constructor()
    {
        super();
        this.touchEnabled = true;
        this.graphics.beginFill(0, 0.3);
        this.graphics.drawRect(0, 0, DataCenter.stage.stageWidth, DataCenter.stage.stageHeight);
        this.graphics.endFill();
        this.init();
    }

    private init(): void
    {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegionHandler, this);

    }

    public dispose(): void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegionHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
    }

    private touchBegionHandler(e: egret.TouchEvent): void
    {
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);

        var startX: number = e.stageX >> 0;
        var startY: number = e.stageY >> 0;
        this.startPos = new egret.Point(startX, startY);
    }

    private touchMoveHandler(e: egret.TouchEvent): void
    {
        var nowX: number = e.localX >> 0;
        var nowY: number = e.localY >> 0;        

        var dx: number = nowX - this.startPos.x;
        var dy: number = nowY - this.startPos.y;

        var absDx: number = Math.abs(dx);
        var absDy: number = Math.abs(dy);

        var dir: number = Direction.NONE;
        if (absDx > absDy && absDx > 50)
        {
            if (dx > 0)
            {
                dir = Direction.RIGHT;
            }
            else
            {
                dir = Direction.LEFT;
            }
        }
        else if (absDy > absDx && absDy > 50)
        {
            if (dy > 0)
            {
                dir = Direction.DOWN;
            }
            else
            {
                dir = Direction.UP;
            }
        }

        NoticeManager.sendNotice(new GameNotice(GameNotice.MAKE_ROLE_MOVE, dir));
    }

    private touchEndHandler(e: egret.TouchEvent): void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);

        NoticeManager.sendNotice(new GameNotice(GameNotice.MAKE_ROLE_MOVE, Direction.NONE));
    }
} 