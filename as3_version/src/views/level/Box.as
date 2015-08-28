package views.level
{
	
	import datas.DataCenter;
	import datas.consts.AssetName;
	import datas.consts.MapInfo;
	import datas.vos.LevelVO;
	import datas.vos.units.AUnitVO;
	import datas.vos.units.BoxVO;
	
	import flash.geom.Point;
	
	import jing.audio.AudioSetting;
	import jing.framework.manager.notice.NoticeManager;
	import jing.game.move.MoveCompute;
	
	import notices.MoveNotice;
	
	import starling.display.Image;
	import starling.events.Event;
	import starling.filters.ColorMatrixFilter;
	
	import utils.MoveUtil;
	
	/**
	 * 箱子，可以在场景中被移动 
	 * @author Jing
	 * 
	 */	
	public class Box extends AUnit
	{
		private var _vo:BoxVO;
		private var _img:Image;
		private var _move:MoveCompute;
		private var _usingAssetName:String;
		public function Box(vo:BoxVO)
		{
			super(vo);
			_vo = vo;
			init();
		}
		
		private function init():void
		{
			var dc:DataCenter = DataCenter.getInstance();
			_img = new Image(dc.assets.getTexture(AssetName.BOX));
			_img.x = -24;
			_img.y = -37;
			this.addChild(_img);
			
			_move = new MoveCompute();
			this.addEventListener(Event.ENTER_FRAME, enterFrameHandler);
		}
		
		override public function dispose():void
		{
			this.removeEventListener(Event.ENTER_FRAME, enterFrameHandler);
			super.dispose();
		}
		
		private function enterFrameHandler(e:Event):void
		{
			if(_vo.state == MOVE_STATE)
			{
				if(true == _move.update())
				{
					_vo.state = STAND_STATE;
					
					onBoxMoved();
				}
				
				this.x = _move.nowX;
				this.y = _move.nowY;
			}
		}
		
		private function onBoxMoved():void
		{
			refresh();
			
			NoticeManager.sendNotice(new MoveNotice(MoveNotice.BOX_MOVED));
		}
		
		public function refresh():void
		{
			var useAssetName:String;
			if(MoveUtil.checkGridIsTarget(_vo.gridX,_vo.gridY))
			{
				if(_usingAssetName != AssetName.BOX_ON_TARGET)
				{
					_usingAssetName = AssetName.BOX_ON_TARGET;
					_img.texture = DataCenter.getInstance().assets.getTexture(AssetName.BOX_ON_TARGET);
//					if(this.parent)
//					{
//						var effect:CompleteEffect = new CompleteEffect();
//						effect.x = this.x;
//						effect.y = this.y - 24;
//						this.parent.parent.addChild(effect);
//						effect.runEffect(AssetName.BLAST,null,12);
//					}
				}
			}
			else
			{
				if(_usingAssetName != AssetName.BOX)
				{
					_usingAssetName = AssetName.BOX;
					_img.texture = DataCenter.getInstance().assets.getTexture(AssetName.BOX);
				}
			}
		}
		
		/**
		 * 推动这个箱子 
		 * @param dir
		 * @return 能否推动
		 */		
		public function push(dir:int):Boolean
		{
//			trace("箱子的推动方向:", dir);
			var newGrid:Point = MoveUtil.getMovedGrid(_vo.gridX,_vo.gridY,dir);
			
			if(newGrid) 
			{
				var dc:DataCenter = DataCenter.getInstance();
				var newGridUnit:AUnitVO = MoveUtil.getGridUnit(newGrid,dc.level);
				
				//如果目标位置上没有单位
				if(null == newGridUnit)
				{
					moveToGrid(newGrid,dc.level);
					return true;
				}
			}
			return false;
		}
		
		/**
		 * 往指定方向上瞬移一格 
		 * @param dir
		 * 
		 */		
		public function put(dir:int):void
		{
			var levelVO:LevelVO = DataCenter.getInstance().level;
			if(_vo.state == MOVE_STATE)
			{
				_vo.state = STAND_STATE;
			}
			var newGrid:Point = MoveUtil.getMovedGrid(_vo.gridX, _vo.gridY, dir);
			MoveUtil.updateGridDic(_vo.gridX,_vo.gridY,newGrid.x,newGrid.y,levelVO);
			_vo.gridX = newGrid.x;
			_vo.gridY = newGrid.y;
			this.x = getGridPosX(newGrid.x);
			this.y = getGridPosY(newGrid.y);
			
			
			onBoxMoved();
		}
		
		private function moveToGrid(newGrid:Point,levelVO:LevelVO):void
		{
			DataCenter.getInstance().audioDevice.play("push",new AudioSetting(1,2) );
			MoveUtil.updateGridDic(_vo.gridX,_vo.gridY,newGrid.x,newGrid.y,levelVO);
			_vo.state = MOVE_STATE;
			_vo.gridX = newGrid.x;
			_vo.gridY = newGrid.y;
			var newX:int = MapInfo.TILE_SIZE * _vo.gridX + (MapInfo.TILE_SIZE >> 1);
			var newY:int = MapInfo.TILE_SIZE * _vo.gridY + (MapInfo.TILE_SIZE >> 1);
			_move.reset(this.x, this.y, newX, newY, 0.3);
		}
		
		private const MOVE_STATE:int = 1;
		private const STAND_STATE:int = 0;
	}
}