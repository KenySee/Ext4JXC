Ext.define('Keer.ui.core.Frame.Container',{
	extend: 'Ext.container.Container',
	requires:[
		'Keer.widget.view.Panel',
		'Ext.ux.TabReorderer',
		'Ext.ux.TabScrollerMenu',
		'Keer.widget.ux.TabCloseMenu',
		'Keer.ui.core.Frame.Controller'
	],
	controller:'Keer.ui.core.Frame.Controller',
	alias: 'widget.ui-core-frame-container',
	config:{
		appParams:{} //控制器参数
	},
	navConfig:{
		tools :[{
			itemId : 'refresh',
			type : 'refresh'
		}]
	},
	tabConfig:{},
	initComponent: function(){
		var navPanel = {
			title:this.title,
			iconCls: 'application_home',
			layout:'accordion',
			xtype:'widget-view-panel',
			styleConfig: {
				minWidth : 0,
				width : 180,
				region : 'west',
				collapseMode: 'mini',
				collapsible : true,
				collapsed : false,
				hideCollapseTool : true,
				maintainFlex : true,
				split : true,
				autoScroll : false
			},
			finalConfig: this.navConfig
		};
		var tabPanel = {
			xtype:'tabpanel',
			margins: '0 0 0 0',
			activeTab : 0,
			defaults : {
				closable : true
			},
			plugins: [
				Ext.create('Keer.widget.ux.TabCloseMenu'),
				Ext.create('Ext.ux.TabReorderer'),			
				Ext.create('Ext.ux.TabScrollerMenu',{
				       maxText: 15,
				       pageSize: 5
		        })
    		],
			region: 'center',
			minTabWidth: 90
		};
		Ext.apply(this,{
			region:'center',
	        margin: '0 3 3 3',
	        layout: 'border',
	        items:[navPanel,tabPanel]
		});
		this.callParent(arguments);
	}
});