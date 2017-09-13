Ext.define('Keer.widget.view.Panel',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.widget-view-panel',
	minWidth : 0,
	width : 220,
	region : 'west',
	placeholder : {
		xtype : 'box'
	},
	collapsible : true,
	collapsed : false,
	hideCollapseTool : true,
	maintainFlex : true,
	split : true,
	deferRowRender:true,
	autoScroll : false,	
	config:{
		finalConfig:{}	//最终配置
	},
	initComponent: function(){
		Ext.apply(this,this.finalConfig);
		this.callParent(arguments);
	}
});