Ext.define('Keer.ui.selwin.PartArtist1.FindWindow',{
	extend: 'Keer.widget.view.FindWindow',
	alias: 'widget.ui-selwin-PartArtist1-findwindow',
	controller: 'Keer.ui.selwin.PartArtist1.FindController',
	requires:[
		'Keer.widget.view.Grid',
		'Keer.widget.view.DataView',
		'Keer.store.PartArtist1.Store',
		'Keer.ui.selwin.PartArtist1.FindController'
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
		winTitle: '匠人',
		navTitle: '匠人',
		navPropName: 'nickname',
		appParams:{}									
	},
	initConfig: function (config) {
		config.gridStoreConfig = config.gridStoreConfig || {};
		Ext.apply(config.gridStoreConfig,{
			controller:this.getController()
		});
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:{
				xtype: 'querybar',
				store: this.gridStore,
				items: [
				{fieldLabel:'匠人名称',name:'nickname',itemId:'nickname',dataIndex:'nickname',labelWidth:60,xtype:'textfield'}
				]
			},
			cmdToolbar:[],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				,{text:'匠人名称',dataIndex:'nickname',width:120,editor:{xtype:'textfield'}}
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
		this.doViewInitComponent(viewConfig);
		this.callParent(arguments);
	}
});