package models
{
	import datas.vos.LevelVO;
	
	import flash.events.Event;

	/**
	 * 关卡模型 
	 * @author Jing
	 * 
	 */	
	public class LevelModel
	{		
		private var _vo:LevelVO;
		
		private var _voReadyFun:Function;

		public function get vo():LevelVO
		{
			return _vo;
		}

		public function LevelModel(levelId:int, voReadyFun:Function)
		{
			_voReadyFun = voReadyFun;
			 var levelLoader:LevelLoader = new LevelLoader();
			 levelLoader.addEventListener(Event.COMPLETE, levelLoader_completeHandler);
			 levelLoader.readLevel(levelId);
		}
		
		private function levelLoader_completeHandler(e:Event):void
		{
			var levelLoader:LevelLoader = e.currentTarget as LevelLoader;
			levelLoader.removeEventListener(Event.COMPLETE, levelLoader_completeHandler);
			_vo = levelLoader.levelVO;
			_voReadyFun.call();
		}
	}
}

import adobe.utils.XMLUI;

import datas.consts.MapInfo;
import datas.consts.UnitType;
import datas.vos.LevelVO;
import datas.vos.map.MapNodeVO;
import datas.vos.units.AUnitVO;
import datas.vos.units.BlockVO;
import datas.vos.units.BoxVO;
import datas.vos.units.RoleVO;
import datas.vos.units.TargetVO;

import flash.display.BlendMode;
import flash.events.Event;
import flash.events.EventDispatcher;
import flash.net.URLRequest;

import jing.air.utils.IOUtil;
import jing.loader.BytesLoader;
import jing.utils.data.IntUtil;
import jing.utils.data.StringUtil;
import jing.utils.xml.XMLUtil;

/**
 * 关卡读取器 
 * @author Jing
 * 
 */
class LevelLoader extends EventDispatcher
{
	public function LevelLoader():void
	{
		
	}
	
	private var _unitId:uint = 1;
	
	private var _levelVO:LevelVO = null;
	
	public function get levelVO():LevelVO
	{
		return _levelVO;
	}

	/**
	 * 加载关卡 
	 * @param levelId
	 * @return 
	 * 
	 */	
	public function readLevel(levelId:int):void
	{
		var levelURL:String = StringUtil.format("assets/levels/level{0}.xml",levelId);
		var bl:BytesLoader = new BytesLoader(new URLRequest(levelURL));
		bl.param = levelId;
		bl.addEventListener(Event.COMPLETE, bl_completeHandler);
		bl.load();
	}
	
	private function bl_completeHandler(e:Event):void
	{
		var bl:BytesLoader = e.currentTarget as BytesLoader;
		var levelXML:XML = XMLUtil.readByteArray2XML(bl.byteArray);
		var levelVO:LevelVO = new LevelVO();
		levelVO.id = bl.param;
		levelVO.name = levelXML.@name.toString();
		levelVO.mapNodes = createMapNodes();
		
		//创建阻挡
		createUnit(BlockVO, levelXML.blocks.unit, levelVO, UnitType.BLOCK);
		createUnit(RoleVO, levelXML.roles.unit, levelVO, UnitType.ROLE);
		createUnit(BoxVO, levelXML.boxs.unit, levelVO, UnitType.BOX);
		//createUnit(TargetVO, levelXML.targets.unit, levelVO, UnitType.TARGET);
		setTargets(levelVO,levelXML.targets.unit);

		_levelVO = levelVO;
		this.dispatchEvent(new Event(Event.COMPLETE));
	}
	
	/**
	 * 创建地图节点 
	 * @return 
	 * 
	 */	
	[inline]
	private function createMapNodes():Array
	{
		var nodes:Array = [];
		
		for (var i:int = 0; i < MapInfo.TILE_COUNT; i++)
		{
			var col:Array = [];
			nodes[i] = col;
			
			for (var j:int = 0; j < MapInfo.TILE_COUNT; j++)
			{
				col[j] = new MapNodeVO();
			}
		}
		return nodes;
	}
	
	/**
	 * 创建单位 
	 * @param unitCls
	 * @param unitsXMLList
	 * @param levelVO
	 * @param unitType
	 * 
	 */	
	[inline]
	private function createUnit(unitCls:Class, unitsXMLList:XMLList, levelVO:LevelVO, unitType:uint):void
	{
		var unitXML:XML;
		
		for each (unitXML in unitsXMLList)
		{
			var unitVO:AUnitVO = new unitCls() as AUnitVO;
			unitVO.unitType = unitType;
			unitVO.id = _unitId;
			unitVO.gridX = unitXML.@x;
			unitVO.gridY = unitXML.@y;
			levelVO.units[unitVO.id] = unitVO;
			levelVO.gridDic[IntUtil.mixedTwoInt(unitVO.gridX,unitVO.gridY)] = unitVO;
			_unitId++;
			
			var mapNode:MapNodeVO = levelVO.mapNodes[unitVO.gridX][unitVO.gridY];
			mapNode.unitId = unitVO.id;
			if(UnitType.TARGET == unitType)
			{
				mapNode.isTarget = true;
			}
		}
	}
	
	/**
	 * 设置目标数据 
	 * @param levelVO
	 * @param targetXMLList
	 * 
	 */	
	[inline]
	private function setTargets(levelVO:LevelVO, targetXMLList:XMLList):void
	{
		var xml:XML;
//		levelVO.targets = new Vector.<TargetVO>();
		for each (xml in targetXMLList)
		{
			var targetVO:TargetVO = new TargetVO();
			targetVO.gridX = xml.@x;
			targetVO.gridY = xml.@y;
			targetVO.unitType = UnitType.TARGET;
//			levelVO.targets.push(targetVO);
			levelVO.targetGrid[IntUtil.mixedTwoInt(targetVO.gridX,targetVO.gridY)] = targetVO;
			var mapNode:MapNodeVO = levelVO.mapNodes[targetVO.gridX][targetVO.gridY];
			mapNode.isTarget = true;
		}
	}
}