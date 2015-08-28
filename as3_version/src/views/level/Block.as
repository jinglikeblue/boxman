package views.level
{
	import datas.DataCenter;
	import datas.consts.AssetName;
	import datas.vos.units.BlockVO;
	
	import starling.display.Image;
	
	public class Block extends AUnit
	{
		private var _vo:BlockVO;
		private var _img:Image;
		public function Block(vo:BlockVO)
		{
			super(vo);
			_vo = vo;
			init();
		}
		
		private function init():void
		{
			var dc:DataCenter = DataCenter.getInstance();
			_img = new Image(dc.assets.getTexture(AssetName.BLOCK));
			_img.x = -25;
			_img.y = -37;
			this.addChild(_img);
		}
	}
}