package utils
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.utils.ByteArray;
	
	import jing.utils.xml.XMLUtil;

	/**
	 * 资源工具 
	 * @author Jing
	 * 
	 */	
	public class AssetsUtil
	{
		[Embed(source="../assets/textures/assets.png", mimeType="image/png")]
		static private var _assetsImg:Class;
		
		[Embed(source="../assets/textures/assets.xml", mimeType="application/octet-stream")]
		static private var _assetsXml:Class;
		
		[Embed(source="../assets/uis/ui.xml", mimeType="application/octet-stream")]
		static private var _guiXML:Class;
		
		static public function getAssetsBMD():BitmapData
		{
			var img:Bitmap = new _assetsImg() as Bitmap;
			return img.bitmapData;
		}
		
		static public function getAssetsXML():XML
		{
			var ba:ByteArray = new _assetsXml() as ByteArray;
			return XMLUtil.readByteArray2XML(ba);
		}
		
		static public function getGUIXML():XML
		{
			var ba:ByteArray = new _guiXML() as ByteArray;
			return XMLUtil.readByteArray2XML(ba);
		}
	}
}