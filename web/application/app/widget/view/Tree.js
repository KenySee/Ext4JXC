Ext.define('Keer.widget.view.Tree',{
	extend: 'Ext.tree.Panel',
	alias: 'widget.widget-view-tree',
	displayField : 'name',
	minWidth : 0,
	width : 180,
	region : 'west',
	placeholder : {
		xtype : 'box'
	},
	rootVisible : false,
	folderSort : true,
	useArrows: true,			
	collapsible : true,
	collapsed : false,
	hideCollapseTool : true,
	maintainFlex : true,
	split : true,
	deferRowRender:true,
	autoScroll : false,	
	config:{
		finalConfig:{}
	},
	initComponent: function(){
		Ext.apply(this,this.finalConfig);
		this.callParent(arguments);
	}
});