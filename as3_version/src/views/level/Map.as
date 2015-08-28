package views.level
{		
	import datas.DataCenter;
	import datas.consts.MapInfo;
	import datas.consts.UnitType;
	import datas.vos.LevelVO;
	import datas.vos.units.AUnitVO;
	import datas.vos.units.BlockVO;
	import datas.vos.units.BoxVO;
	import datas.vos.units.RoleVO;
	import datas.vos.units.TargetVO;
	
	import jing.framework.manager.notice.NoticeManager;
	
	import models.LevelModel;
	
	import notices.LevelNotice;
	import notices.MoveNotice;
	
	import starling.display.DisplayObject;
	import starling.display.Quad;
	import starling.display.Sprite;
	import starling.events.Event;
	
	public class Map extends Sprite
	{
		private var _levelModel:LevelModel;
		private var _unitSpr:Sprite;
		private var _role:Role;
		public function Map(levelModel:LevelModel)
		{
			super();
			_levelModel = levelModel;
			init();
		}
		
		private function init():void
		{
			_unitSpr = new Sprite();
			this.addChild(_unitSpr);
			var quad:Quad = new Quad(1,1,0,false);
			quad.width = MapInfo.GROUND_SIZE;
			quad.height = MapInfo.GROUND_SIZE;
			this.addChild(quad);
			quad.visible = false;
			
			initUnits();
			this.addEventListener(Event.ENTER_FRAME, enterFrameHandler);
			NoticeManager.addNoticeAction(MoveNotice.MAKE_ROLE_MOVE, moveNotice);
			NoticeManager.addNoticeAction(MoveNotice.BOX_MOVED, boxMovedNotice);
			NoticeManager.addNoticeAction(LevelNotice.BACK_STEP, backStepNotice);
		}
		
		override public function dispose():void
		{
			this.removeEventListener(Event.ENTER_FRAME, enterFrameHandler);
			NoticeManager.removeNoticeAction(MoveNotice.MAKE_ROLE_MOVE, moveNotice);
			NoticeManager.removeNoticeAction(MoveNotice.BOX_MOVED, boxMovedNotice);
			NoticeManager.removeNoticeAction(LevelNotice.BACK_STEP, backStepNotice);
			super.dispose();
		}
		
		private function backStepNotice(n:LevelNotice):void
		{
			_role.backStep();
		}
		
		private function boxMovedNotice(n:MoveNotice):void
		{
			checkLevelComplete();
		}
		
		private function moveNotice(n:MoveNotice):void
		{
			_role.move(n.dir);
		}
		
		private function enterFrameHandler(e:Event):void
		{
			deepSort();
		}
		
		/**
		 * 检查关卡是否结束 
		 * 
		 */		
		private function checkLevelComplete():void
		{
			var levelVO:LevelVO = DataCenter.getInstance().level;
			for (var flag:String in levelVO.targetGrid)
			{
				var unitVO:AUnitVO = levelVO.gridDic[flag];
				if(null == unitVO || unitVO.unitType != UnitType.BOX)
				{
					return;
				}
			}
			
			//能到这里说明关卡通过了
			NoticeManager.sendNotice(new LevelNotice(LevelNotice.LEVEL_COMPLETE));
		}
		
		/**
		 * 刷新显示 
		 * 
		 */		
		private function initUnits():void
		{
			var obj:DisplayObject;
			for each(var unitVO:AUnitVO in _levelModel.vo.units)
			{
				switch(unitVO.unitType)
				{
					case UnitType.BLOCK:
						obj = new Block(unitVO as BlockVO);
						break;
					case UnitType.BOX:
						obj = new Box(unitVO as BoxVO);
						(obj as Box).refresh();
						break;
					case UnitType.ROLE:
						_role = new Role(unitVO as RoleVO);
						obj = _role;
						break;
				}
				
				if(obj)
				{
					obj.x = MapInfo.TILE_SIZE * unitVO.gridX + (MapInfo.TILE_SIZE >> 1);
					obj.y = MapInfo.TILE_SIZE * unitVO.gridY + (MapInfo.TILE_SIZE >> 1);
					_unitSpr.addChild(obj);
				}
			}
			
			for each(var targetVO:TargetVO in _levelModel.vo.targetGrid)
			{
				obj = new Target(targetVO);
				obj.x = MapInfo.TILE_SIZE * targetVO.gridX + (MapInfo.TILE_SIZE >> 1);
				obj.y = MapInfo.TILE_SIZE * targetVO.gridY + (MapInfo.TILE_SIZE >> 1);
				_unitSpr.addChild(obj);
			}

			deepSort();
			checkLevelComplete();
		}
		
		/**
		 * 深度排序 
		 * 
		 */		
		private function deepSort():void
		{
			var childCount:int = _unitSpr.numChildren;
			var list:Vector.<DisplayObject> = new Vector.<DisplayObject>();
			
			var targets:Vector.<DisplayObject> = new Vector.<DisplayObject>();
			for (var i:int = 0; i < childCount; i++)
			{
				var child:DisplayObject = _unitSpr.getChildAt(i);
				if(child is Target)
				{
					targets.push(child);
				}
				else
				{
					sortInsertChilds(child,list);
				}
			}
			
			childCount = list.length;
			for (i = 0; i < childCount; i++)
			{
				_unitSpr.addChildAt(list[i],i);
			}
			
			childCount = targets.length;
			for( i = 0; i < childCount; i++)
			{
				_unitSpr.addChildAt(targets[i],0);
			}
		}
		
		private function sortInsertChilds(child:DisplayObject, list:Vector.<DisplayObject>):void
		{
			var listLength:int = list.length;
			var temp:DisplayObject;
			for (var i:int = 0; i < listLength; i++)
			{
				temp = list[i];
				if(child.y < temp.y)
				{
					list.splice(i,0,child);
					return;
				}
				else if(child.y == temp.y)
				{
					if(child.x < temp.x)
					{
						list.splice(i,0,child);
						return;
					}
//					else if(child.x == temp.x && child is Target)
//					{
//						list.unshift(child);
//						return;
//					}
				}
				
			}
			
			list.push(child);
		}
	}
}