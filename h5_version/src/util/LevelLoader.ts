/**
* 关卡加载器
*/
class LevelLoader
{
    //关卡字典
    private static _levelDic: any = {};

    //关卡数据
    private _vo: LevelVO = null;
    private _unitId: number = 1;
    private _onComplete:Function;

    public constructor()
    {
        
    }

    public load(level: number, onComplete: Function): void
    {        
        this._onComplete = onComplete;
        this._vo = new LevelVO();
        this._vo.id = level;
        RES.getResAsync("level" + level + "_xml", this.onLoaded, this);
         
    }

    private onLoaded(data: any, key: string): void
    {
        var vo: LevelVO = this._vo;

        var ba: egret.ByteArray = new egret.ByteArray(data);
        var content: string = ba.readUTFBytes(ba.bytesAvailable);
        var xml: any = egret.XML.parse(content);
        vo.name = xml.$name;
        vo.mapNodes = this.createMapNodes();
        for (var k in xml.children)
        {
            var child: any = xml.children[k];
            switch (child.name)
            {
                case "blocks":
                    this.createUnit(BlockVO, child, UnitType.BLOCK);
                    break;
                case "roles":
                    this.createUnit(RoleVO, child, UnitType.ROLE);
                    break;
                case "boxs":
                    this.createUnit(BoxVO, child, UnitType.BOX);
                    break;
                case "targets":
                    this.setTargets(child);
                    break;
            }
        }

        this._onComplete(this._vo);
    }

    private createUnit(cls: any, xml: any, unitType: number): void
    {
        for (var k in xml.children)
        {
            var unit: any = xml.children[k];
            var vo: AUnitVO = new cls();
            vo.id = this._unitId++;
            vo.gridX = +unit.$x;
            vo.gridY = +unit.$y;
            this._vo.units[vo.id] = vo;
            this._vo.gridDic[IntUtil.mixedTwoInt(vo.gridX, vo.gridY)] = vo;
            var mapNodeVO: MapNodeVO = this._vo.mapNodes[vo.gridX][vo.gridY];
            mapNodeVO.unitId = vo.id;
            if (UnitType.TARGET == unitType)
            {
                mapNodeVO.isTarget = true;
            }

        } 
    }

    private createMapNodes(): MapNodeVO[][]
    {
        var nodes: any[] = [];

        for (var i: number = 0; i < MapInfo.TILE_COUNT; i++)
        {
            var col: MapNodeVO[] = [];
            nodes[i] = col;

            for (var j: number = 0; j < MapInfo.TILE_COUNT; j++)
            {
                col[j] = new MapNodeVO();
            }
        }
        return nodes;
    }

    private setTargets( xml:any):void
    {
        for (var k in xml.children)
        {
            var target: any = xml.children[k];
            var targetVO: TargetVO = new TargetVO();
            targetVO.gridX = +target.$x;
            targetVO.gridY = +target.$y;
            targetVO.unitType = UnitType.TARGET;
            this._vo.targetGrid[IntUtil.mixedTwoInt(targetVO.gridX, targetVO.gridY)] = targetVO;
            var mapNode: MapNodeVO = this._vo.mapNodes[targetVO.gridX][targetVO.gridY];
            mapNode.isTarget = true;
        }
	}
}