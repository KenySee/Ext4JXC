Ext.define('Keer.ui.core.Report.MainContainer',{
	extend: 'Ext.panel.Panel',
	//【加载依赖】
	requires: [
		'Keer.ui.core.Report.MainController'
	],
	alias: 'widget.ui-core-Report-maincontainer',
	controller: 'Keer.ui.core.Report.MainController',
	initComponent: function(){
		Ext.apply(this,{
		    region:'center',
		    html: '<iframe src="right.html" scrolling="auto" width="100%" height="100%"  frameborder="0" ></iframe> '
		});
		this.callParent(arguments);
	}
});