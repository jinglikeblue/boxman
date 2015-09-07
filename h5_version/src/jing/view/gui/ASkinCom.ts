/**
* 
*/
class ASkinCom extends egret.gui.SkinnableComponent
{
    public created: boolean = false;
    //附带的参数
    public data: any;

    public constructor(skin:any, data:any = null)
    {        
        super();
        this.skinName = skin;
        this.data = data;
    }

    public setData(data:any = null): void
    {
        this.data = data;
        if (this.created)
        {
            this.onSetData();
        }
    }

    public childrenCreated(): void
    {
        this.created = true;
        this.init();
        this.addListeners();
        this.onSetData();
    }

    public init(): void
    {
        //重写该代码来完成初始化
    }

    public onSetData(): void
    {
        //重写代码来关注数据设置
    }

    public addListeners(): void
    {
        //重写代码来实现监听
    }

    public removeListeners(): void
    {
        //重写代码来释放监听
    }

    public dispose(): void
    {
        this.removeListeners();
    }
} 