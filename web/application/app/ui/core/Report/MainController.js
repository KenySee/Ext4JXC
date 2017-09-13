Ext.define('Keer.ui.core.Report.MainController',{
	extend: 'Deft.mvc.ViewController',
	//【加载依赖】
	requires: [
	],
	//【混入功能】
	mixins: {
	},
	//【监听View事件】
	control: {
		view: {
			boxready: 'view_boxready'
		}
	},
	view_boxready: function(){
	}
});