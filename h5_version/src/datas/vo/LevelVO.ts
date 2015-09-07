class LevelVO
{
    public id: number;
    public name: string;    
    public mapNodes: MapNodeVO[][];
    public units: any = {};
    public gridDic: any = {};
    public steps: StepVO[] = [];
    public targetGrid: any = {};
}