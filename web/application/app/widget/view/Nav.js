Ext.define('Keer.widget.view.Nav',{
	extend: 'Ext.tree.Panel',
	alias: 'widget.widget-view-nav',
	displayField : 'name',
	config:{
		finalConfig:{},
		styleConfig: {
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
			autoScroll : false
		}
	},
	initComponent: function(){
		Ext.apply(this,this.getStyleConfig());
		Ext.apply(this,this.finalConfig);
		this.callParent(arguments);
	}
});