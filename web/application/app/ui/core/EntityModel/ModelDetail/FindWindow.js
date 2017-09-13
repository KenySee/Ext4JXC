Ext.define('Keer.ui.core.EntityModel.ModelDetail.FindWindow',{
	extend: 'Keer.widget.view.FindWindow',
	alias: 'widget.ui-core-EntityModel-ModelDetail-findwindow',
	controller: 'Keer.ui.core.EntityModel.ModelDetail.FindController',
	requires:[
		'Keer.store.ModelDetail.Store',
		'Keer.ui.core.EntityModel.ModelDetail.FindController'
	],
	//【混入功能】
	mixins : {
	},	
	config:{
		addWidth: 0,
		addHeight: 0,
		canMulti: false,
		innerEdit: false,
		dragDrop: false,
		winTitle: '选择字段',
		appParams: {}
	},
	initConfig: function (config) {
		Ext.apply(config,{
			gridStore: Ext.widget('ModelDetail-store',{
				controller:this.getController()
			})
		});
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:{
				xtype: 'querybar',
				store: this.gridStore,
				items: []
			},
			cmdToolbar:[
			],
			gridColumns:[								
				{text:'No.',xtype: 'rownumberer',width:32},
				{text:'中文标题',dataIndex:'text',width:140},
				{text:'映射名称',dataIndex:'dataIndex',width:120}
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
			layout: 'fit',
			tbar:{
				xtype: 'toolbar',
				itemId: 'cmdToolBar',
				hidden: true,
				items: this.cmdToolbar
			},
			itemId: 'mainPanel',
			region: 'center',
			border: 1,
			margin : '-1 -1 -1 -1',
			items:[gridView]
		};
		var viewConfig = {
			layout: 'fit',
			title: this.getWinTitle(),
			width: 640 + this.addWidth,
			height: 420 + this.addHeight,
			modal: true,
			buttons:[],
			items:[mainPanel]
		};
		this.doViewInitComponent(viewConfig);
		this.callParent(arguments);
	}
});