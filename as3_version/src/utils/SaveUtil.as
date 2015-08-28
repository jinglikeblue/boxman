package utils
{
	import datas.DataCenter;
	
	import flash.net.SharedObject;
	import flash.utils.ByteArray;
	
	import jing.air.utils.IOUtil;

	public class SaveUtil
	{
		static private var _so:SharedObject;
		
		static public function loadData():void
		{
			_so = SharedObject.getLocal("jing.web.push_box");
			if(_so.data.passedLevel)
			{
				var passedLevel:Array = _so.data.passedLevel;
				trace("已通过的关卡：", passedLevel);
				DataCenter.getInstance().passedLevel = passedLevel;
			}
			else
			{
				DataCenter.getInstance().passedLevel = [];
			}
		}
		
		static public function saveData():void
		{
			_so = SharedObject.getLocal("jing.web.push_box");
			
			var passedLevel:Array = DataCenter.getInstance().passedLevel;
			trace("保存的关卡：", passedLevel);
			
			_so.data.passedLevel = passedLevel;
			_so.flush(1000);
			
		}
	}
}