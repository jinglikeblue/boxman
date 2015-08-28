package views.level
{
    import datas.DataCenter;
    import datas.consts.AssetName;
    import datas.consts.Direction;
    import datas.consts.MapInfo;
    import datas.consts.UnitType;
    import datas.vos.LevelVO;
    import datas.vos.record.StepVO;
    import datas.vos.units.AUnitVO;
    import datas.vos.units.RoleVO;
    
    import flash.geom.Point;
    import flash.utils.Dictionary;
    
    import jing.audio.AudioSetting;
    import jing.audio.IAudioPlayer;
    import jing.game.move.MoveCompute;
    
    import starling.core.Starling;
    import starling.display.MovieClip;
    import starling.events.Event;
    import starling.textures.Texture;
    import starling.textures.TextureAtlas;
    
    import utils.MoveUtil;

	/**
	 * 角色单位 
	 * @author Jing
	 * 
	 */	
    public class Role extends AUnit
    {
        private var _standAssetsName:Dictionary = new Dictionary();

        private var _moveAssetsName:Dictionary = new Dictionary();

        private var _moveAssets:Dictionary = new Dictionary();

        private var _vo:RoleVO;

        private var _mc:MovieClip;

        private var _move:MoveCompute;
		
		private var _moveDir:int = Direction.NONE;
		
		private var _bootSound:IAudioPlayer;

        public function Role(vo:RoleVO)
        {
            super(vo);
            _vo = vo;

            init();
        }

        private function init():void
        {
            var dc:DataCenter = DataCenter.getInstance();
            _standAssetsName[Direction.UP] = AssetName.ROLE_STAND_UP;
            _standAssetsName[Direction.DOWN] = AssetName.ROLE_STAND_DOWN;
            _standAssetsName[Direction.LEFT] = AssetName.ROLE_STAND_LEFT;
            _standAssetsName[Direction.RIGHT] = AssetName.ROLE_STAND_RIGHT;

            _moveAssetsName[Direction.UP] = AssetName.ROLE_MOVE_UP;
            _moveAssetsName[Direction.DOWN] = AssetName.ROLE_MOVE_DOWN;
            _moveAssetsName[Direction.LEFT] = AssetName.ROLE_MOVE_LEFT;
            _moveAssetsName[Direction.RIGHT] = AssetName.ROLE_MOVE_RIGHT;

            _move = new MoveCompute();
            refresh();

            this.addEventListener(Event.ENTER_FRAME, enterFrameHandler);
        }

        override public function dispose():void
        {
            this.removeEventListener(Event.ENTER_FRAME, enterFrameHandler);
			Starling.current.juggler.remove(_mc);
            super.dispose();
        }

        private function enterFrameHandler(e:Event):void
        {
            if (_vo.state == MOVE_STATE)
            {
				var isArrived:Boolean = _move.update();
				this.x = _move.nowX;
				this.y = _move.nowY;
				
                if (isArrived)
                {
					_vo.state = STAND_STATE;
					
					if(_moveDir != Direction.NONE)
					{
						move(_moveDir);
					}
					
					if(_vo.state == STAND_STATE)
					{
						if(null != _bootSound)
						{
							_bootSound.dispose();
							_bootSound = null;
						}
						refresh();
					}
                }
            }
        }

        public function refresh():void
        {
            var assets:TextureAtlas = DataCenter.getInstance().assets;
            var ts:Vector.<Texture>;
			var assetsName:String;
            switch (_vo.state)
            {
                case STAND_STATE:
					assetsName = _standAssetsName[_vo.dir];
                    break;
                case MOVE_STATE:
					assetsName = _moveAssetsName[_vo.dir];
                    break;
            }

            if (null == assetsName)
            {
				return;
			}
			
			ts = assets.getTextures(assetsName);
			
			if(null == ts)
			{
				return;
			}
			
            if (_mc)
            {
				if(_mc.name == assetsName)
				{
					return;
				}
                Starling.current.juggler.remove(_mc);

                if (_mc.parent)
                {
                    _mc.parent.removeChild(_mc);
                }
                _mc.dispose();

            }
            var fps:int = _vo.state == MOVE_STATE ? 24 : 12;
            _mc = new MovieClip(ts, fps);
			_mc.name = assetsName;
            _mc.currentFrame = 6;
            _mc.x = -50;
            _mc.y = -66;
            Starling.current.juggler.add(_mc);
            this.addChild(_mc);
            
        }

        public function move(dir:int):void
        {
			_moveDir = dir;
			
            if (_vo.state == MOVE_STATE || _moveDir == Direction.NONE)
            {
                return;
			}
			
			var needRefresh:Boolean = false;
			
			if (dir != _vo.dir)
			{
				_vo.dir = dir;
				needRefresh = true;
			}
			
            var newGrid:Point = MoveUtil.getMovedGrid(_vo.gridX, _vo.gridY, dir);

            if (newGrid)
            {
                var dc:DataCenter = DataCenter.getInstance();
                var newGridUnit:AUnitVO = MoveUtil.getGridUnit(newGrid, dc.level);

                //如果目标位置上没有单位或者不是阻挡，则可以移动过去
                if (null == newGridUnit)
                {
                    moveToGrid(newGrid, dc.level);
                    needRefresh = true;
					//recordStep(dir);
                }
                else if (UnitType.BOX == newGridUnit.unitType)
                {
                    var box:Box = AUnit.getUnit(newGridUnit.id) as Box;

                    if (box.push(dir))
                    {
						recordStep(dir,box.vo.id, _vo.gridX, _vo.gridY);
                        moveToGrid(newGrid, dc.level);
                        needRefresh = true;						
                    }
                }
            }

            if (needRefresh)
            {
                refresh();
            }
        }
		
		/**
		 * 记录移动步骤 
		 * @param info
		 * 
		 */		
		private function recordStep(dir:int, boxId:uint, startGridX:int, startGridY:int):void
		{
			var steps:Vector.<StepVO> = DataCenter.getInstance().level.steps;
			steps.push(new StepVO(dir,boxId, startGridX, startGridY));
		}
		
		/**
		 * 回退一步 
		 * 
		 */		
		public function backStep():void
		{
			var levelVO:LevelVO = DataCenter.getInstance().level;
			var steps:Vector.<StepVO> =levelVO.steps;
			if(steps.length > 0)
			{
				var stepVO:StepVO = steps.pop();
				var oppositeDir:int = MoveUtil.getOppositeDirection(stepVO.moveDir);
	
				if(MOVE_STATE == _vo.state)
				{
					_vo.state = STAND_STATE;
				}
				MoveUtil.updateGridDic(_vo.gridX,_vo.gridY,stepVO.startGridX,stepVO.startGridY,levelVO);
				_vo.dir = stepVO.moveDir;
				_vo.gridX = stepVO.startGridX;
				_vo.gridY = stepVO.startGridY;
				this.x = getGridPosX(_vo.gridX);
				this.y = getGridPosY(_vo.gridY);
				refresh();
				if(stepVO.boxId > 0)
				{
					(AUnit.getUnit(stepVO.boxId) as Box).put(oppositeDir);
				}
			}			
		}

		/**
		 * 移动到对应格子 
		 * @param newGrid
		 * @param levelVO
		 * 
		 */		
        private function moveToGrid(newGrid:Point,levelVO:LevelVO):void
        {
			if(null == _bootSound)
			{
				_bootSound = DataCenter.getInstance().audioDevice.play("boot",new AudioSetting(1,3,true));
			}
			MoveUtil.updateGridDic(_vo.gridX,_vo.gridY,newGrid.x,newGrid.y,levelVO);
            _vo.state = MOVE_STATE;
            _vo.gridX = newGrid.x;
            _vo.gridY = newGrid.y;
            var newX:int = getGridPosX(_vo.gridX);
            var newY:int = getGridPosX(_vo.gridY);
            _move.reset(this.x, this.y, newX, newY, 0.2);
        }

        private const MOVE_STATE:int = 1;

        private const STAND_STATE:int = 0;
    }
}
