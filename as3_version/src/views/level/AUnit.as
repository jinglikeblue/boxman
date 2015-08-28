package views.level
{
	import flash.geom.Point;
	import flash.utils.Dictionary;
	
	import datas.consts.MapInfo;
	import datas.vos.units.AUnitVO;
	
	import starling.display.Sprite;

	public class AUnit extends Sprite
	{
		private var _vo:AUnitVO;

		public function get vo():AUnitVO
		{
			return _vo;
		}

		
		/**
		 * 注册ID到单位的映射 
		 */		
		static private var _unitDic:Dictionary = new Dictionary();
		 
		/**
		 * 注册一个单位 
		 * @param id
		 * @param unit
		 * 
		 */		
		static private function registUnit(id:uint, unit:AUnit):void
		{
			_unitDic[id] = unit;
		}
		
		/**
		 * 注销一个单位 
		 * @param id
		 * 
		 */		
		static private function unregistUnit(id:uint):void
		{
			delete _unitDic[id];
		}
		
		/**
		 * 重设单位字典 
		 * 
		 */		
		static public function resetUnitDic():void
		{
			_unitDic = new Dictionary();
		}
		
		/**
		 * 得到单位 
		 * @param id
		 * @return 
		 * 
		 */		
		static public function getUnit(id:uint):AUnit
		{
			return _unitDic[id];
		}
		
		public function AUnit(vo:AUnitVO)
		{
			super();
			_vo = vo;
			registUnit(vo.id,this);
		}
		
		override public function dispose():void
		{
			unregistUnit(_vo.id);
			super.dispose();
		}
		
		protected function getGridPosX(gridX:int):int
		{
			return MapInfo.TILE_SIZE * gridX + (MapInfo.TILE_SIZE >> 1);
		}
		
		protected function getGridPosY(gridY:int):int
		{
			return MapInfo.TILE_SIZE * gridY + (MapInfo.TILE_SIZE >> 1);
		}
	}
}