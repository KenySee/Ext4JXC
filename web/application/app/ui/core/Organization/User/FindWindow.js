Ext.define('Keer.ui.core.Organization.User.FindWindow',{
	extend: 'Keer.widget.view.FindWindow',
	alias: 'widget.ui-core-Organization-User-findwindow',
	controller: 'Keer.ui.core.Organization.User.FindController',
	requires:[
		'Keer.store.User.Store',
		'Keer.store.Organization.StoreTree',
		'Keer.ui.core.Organization.User.FindController'
	],
	//【混入功能】
	mixins : {
	},	
	config:{
		addWidth: 120,
		addHeight: 0,
		canMulti: false,
		innerEdit: false,
		dragDrop: false,
		winTitle: '选择用户',
		appParams: {}
	},
	initConfig: function (config) {
		Ext.apply(config,{
			navStore: Ext.widget('Organization-storetree',{
				controller:this.getController()
			}),
			gridStore: Ext.widget('User-store',{
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
				items: [
					{itemId:'code',name:'code',fieldLabel:'用户编号',labelWidth:60,dataIndex:'code',xtype:'textfield'},
					{itemId:'name',name:'name',fieldLabel:'用户名称',labelWidth:60,dataIndex:'name',xtype:'textfield'}
				]
			},			
			cmdToolbar:[
				{text:'新增用户',itemId:'toolbar_add',xtype:'widget-button-classbutton',store:this.gridStore,iconCls:'add',iconAlign: 'left', privilege: 'ADD',findReady:'ready'}
			],
			gridColumns:[								
				{text:'图标',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'},
				{text:'用户编号',dataIndex:'code',width:120},
				{text:'用户名称',dataIndex:'name',width:120}
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
		var navView = {
			xtype: 'treepanel',
			itemId: 'navView',
			layout: 'fit',
			border: 0,
			displayField : 'name',
			folderSort : true,
			useArrows: true,
			header: false,
			margin : '-1 -1 -1 -1',
			rootVisible: false,
			store:  this.navStore
		};
		var navPanel = {
			xtype: 'panel',
			itemId: 'navPanel',
			iconCls: 'application_side_tree',
			title: '机构',
			layout: 'fit',
			margin : '-1 0 2 -1',
			minWidth : 0,
			width : 220,
			region : 'west',
			collapsible : false,
			collapsed : false,
			hideCollapseTool : true,
			maintainFlex : true,
			split : true,
			deferRowRender:true,
			autoScroll : false,
			tools :[
				{itemId: 'toolnav_expand',type: 'expand',tooltip:'展开'},
				{itemId: 'toolnav_collapse',type: 'collapse',tooltip:'收缩'},
				{itemId: 'toolnav_refresh',type: 'refresh',tooltip:'刷新'}
			],
			tbar: {xtype: 'toolbar',hidden: true,itemId: 'navToolBar',items:[]},
			items:[navView]	
		};
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
				items: this.cmdToolbar
			},
			itemId: 'mainPanel',
			region: 'center',
			border: 1,
			margin : '-1 -1 2 -1',
			items:[gridView]
		};
		var viewConfig = {
			layout: 'border',
			title: this.getWinTitle(),
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