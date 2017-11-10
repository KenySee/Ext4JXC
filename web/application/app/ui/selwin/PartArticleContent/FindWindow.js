Ext.define('Keer.ui.selwin.PartArticleContent.FindWindow',{
	extend: 'Keer.widget.view.FindWindow',
	alias: 'widget.ui-selwin-PartArticleContent-findwindow',
	controller: 'Keer.ui.selwin.PartArticleContent.FindController',
	requires:[
		'Keer.widget.view.Grid',
		'Keer.widget.view.DataView',
		'Keer.store.PartArticleContent.Store',
		'Keer.store.PartArticle.Store',
		'Keer.ui.selwin.PartArticleContent.FindController'
	],	
	config:{
		canMulti: false,
		innerEdit: false,
		dragDrop: false,
		mainWidth: 220,
		mainHeight: 320,
		addWidth: 0,
		addHeight: 0,
		tabLayout: false,
		autoLayout: true,
		iconAlign: 'top',
		childAlign: 'right',
		navWidth: 220,
		navStoreConfig:{},
		gridStoreConfig:{},
		winTitle: '文章内容',
		navTitle: '文章',
		navPropName: 'title',
		appParams:{}									
	},
	initConfig: function (config) {
		config.gridStoreConfig = config.gridStoreConfig || {};
		Ext.apply(config.gridStoreConfig,{
			controller:this.getController()
		});
		config.navStoreConfig = config.navStoreConfig || {};
		Ext.apply(config.navStoreConfig,{
			controller:this.getController()
		});
		Ext.apply(config,{
			gridStore: Ext.widget('PartArticleContent-store',config.gridStoreConfig),
			navStore: Ext.widget('PartArticle-store',config.navStoreConfig)
		});
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:{
				xtype: 'querybar',
				store: this.gridStore,
				items: [
				{fieldLabel:'类型值',name:'contentValue',itemId:'contentValue',dataIndex:'contentValue',labelWidth:60,xtype:'textfield'}
				]
			},
			cmdToolbar:[],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				,{text:'内容类型',dataIndex:'contentType',width:120}
				,{text:'类型值',dataIndex:'contentValue',width:120}
			],
			pagingtoolbar : {
				xtype: 'pagingtoolbar',
				store: this.gridStore,
				displayInfo: true,
				dock: 'bottom',
				layout: 'hbox',
				displayMsg: '显示 {0} - {1} 条 共 {2} 条',
				emptyMsg: "没有记录"
			}
		});
		var gridView = {
			xtype: 'widget-view-gridview',
			itemId: 'gridView',
			region: 'center',
			innerEdit: this.innerEdit,
			dragDrop: this.dragDrop,
			canMulti: this.canMulti,
			tbar: this.queryToolbar,
			bbar: this.pagingtoolbar,
			store: this.gridStore,
			columns: this.gridColumns
		};
		var mainPanel = {
			tbar:{
				xtype: 'toolbar',
				itemId: 'cmdToolBar',
				hidden: true,
				items: this.cmdToolbar
			},
			layout: 'fit',
			itemId: 'mainPanel',
			region: 'center',
			border: 1,
			margin : '-1 -1 2 -1',
			items:[gridView]
		};
    	var navView = {
			xtype: 'widget-view-dataview',
			itemId: 'navView',
			displayField: this.navPropName,
			store:  this.navStore			
		};
		var navPanel = {
			xtype: 'panel',
			itemId: 'navPanel',
			iconCls: 'application_side_tree',
			title: this.navTitle,
			layout: 'fit',
			region : 'west',
			border: 1,
			margin : '-1 0 2 -1',
			minWidth : 0,
			width : this.navWidth,
			collapseMode: 'mini',
			collapsible : true,
			collapsed : false,
			hideCollapseTool : true,
			maintainFlex : true,
			split : true,
			deferRowRender:true,
			autoScroll : false,
			tools :[
				{itemId: 'toolnav_refresh',type: 'refresh',tooltip:'刷新'}
			],
			tbar: {xtype: 'toolbar',hidden: true,itemId: 'navToolBar',items:[]},
			items:[navView]	
		};
		var viewConfig = {
			layout: 'border',
			title: this.winTitle,
			width: 640 + this.addWidth,
			height: 420 + this.addHeight,
			modal: true,
			buttons:[],
			items:[navPanel,mainPanel]
		};
		this.doViewInitComponent(viewConfig);
		this.callParent(arguments);
	}
});