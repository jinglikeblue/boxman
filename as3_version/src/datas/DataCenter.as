package datas
{
	import datas.vos.LevelVO;
	
	import flash.utils.Dictionary;
	
	import jing.audio.AudioDevice;
	
	import starling.textures.TextureAtlas;

	/**
	 * 数据中心 
	 * @author Jing
	 * 
	 */	
	public class DataCenter
	{
		public function DataCenter():void
		{
			
		}
		
		static public const MAX_LEVEL:int = 98;
		
		/**
		 * 单例模式 
		 */		
		static public const _instance:DataCenter = new DataCenter();
		static public function getInstance():DataCenter
		{
			return _instance;
		}
		
		public var assets:TextureAtlas;
		public var guiInfo:Dictionary;
		/**
		 * 进行中的关卡数据 
		 */		
		public var level:LevelVO;
		
		/**
		 * 通过的关卡 
		 */		
		public var passedLevel:Array = [];
		
		/**
		 * 声音设备 
		 */		
		public var audioDevice:AudioDevice;
		
		/**
		 * 计数为0时开启所有关卡 
		 */		
		public var allLevelOpenCount:int = 10;
	}
}