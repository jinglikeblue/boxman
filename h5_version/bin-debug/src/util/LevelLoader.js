/**
* 关卡加载器
*/
var LevelLoader = (function () {
    function LevelLoader() {
        //关卡数据
        this._vo = null;
        this._unitId = 1;
    }
    var __egretProto__ = LevelLoader.prototype;
    __egretProto__.load = function (level, onComplete) {
        this._onComplete = onComplete;
        this._vo = new LevelVO();
        this._vo.id = level;
        RES.getResAsync("level" + level + "_xml", this.onLoaded, this);
    };
    __egretProto__.onLoaded = function (data, key) {
        var vo = this._vo;
        var ba = new egret.ByteArray(data);
        var content = ba.readUTFBytes(ba.bytesAvailable);
        var xml = egret.XML.parse(content);
        vo.name = xml.$name;
        vo.mapNodes = this.createMapNodes();
        for (var k in xml.children) {
            var child = xml.children[k];
            switch (child.name) {
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
    };
    __egretProto__.createUnit = function (cls, xml, unitType) {
        for (var k in xml.children) {
            var unit = xml.children[k];
            var vo = new cls();
            vo.id = this._unitId++;
            vo.gridX = +unit.$x;
            vo.gridY = +unit.$y;
            this._vo.units[vo.id] = vo;
            this._vo.gridDic[IntUtil.mixedTwoInt(vo.gridX, vo.gridY)] = vo;
            var mapNodeVO = this._vo.mapNodes[vo.gridX][vo.gridY];
            mapNodeVO.unitId = vo.id;
            if (UnitType.TARGET == unitType) {
                mapNodeVO.isTarget = true;
            }
        }
    };
    __egretProto__.createMapNodes = function () {
        var nodes = [];
        for (var i = 0; i < MapInfo.TILE_COUNT; i++) {
            var col = [];
            nodes[i] = col;
            for (var j = 0; j < MapInfo.TILE_COUNT; j++) {
                col[j] = new MapNodeVO();
            }
        }
        return nodes;
    };
    __egretProto__.setTargets = function (xml) {
        for (var k in xml.children) {
            var target = xml.children[k];
            var targetVO = new TargetVO();
            targetVO.gridX = +target.$x;
            targetVO.gridY = +target.$y;
            targetVO.unitType = UnitType.TARGET;
            this._vo.targetGrid[IntUtil.mixedTwoInt(targetVO.gridX, targetVO.gridY)] = targetVO;
            var mapNode = this._vo.mapNodes[targetVO.gridX][targetVO.gridY];
            mapNode.isTarget = true;
        }
    };
    //关卡字典
    LevelLoader._levelDic = {};
    return LevelLoader;
})();
LevelLoader.prototype.__class__ = "LevelLoader";
//# sourceMappingURL=LevelLoader.js.map