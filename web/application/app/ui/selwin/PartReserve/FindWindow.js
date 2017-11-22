Ext.define('Keer.ui.selwin.PartReserve.FindWindow',{
	extend: 'Keer.widget.view.FindWindow',
	alias: 'widget.ui-selwin-PartReserve-findwindow',
	controller: 'Keer.ui.selwin.PartReserve.FindController',
	requires:[
		'Keer.widget.field.EnumCombo',
		'Keer.widget.view.Grid',
		'Keer.widget.view.DataView',
		'Keer.store.PartReserve.Store',
		'Keer.ui.selwin.PartReserve.FindController'
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
		winTitle: '用户预订表',
		navTitle: '用户预订表',
		navPropName: 'name',
		appParams:{}									
	},
	initConfig: function (config) {
		config.gridStoreConfig = config.gridStoreConfig || {};
		Ext.apply(config.gridStoreConfig,{
			controller:this.getController()
		});
		Ext.apply(config,{
			gridStore: Ext.widget('PartReserve-store',config.gridStoreConfig)
		});
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:{
				xtype: 'querybar',
				store: this.gridStore,
				items: [
				{fieldLabel:'编号',name:'code',itemId:'code',dataIndex:'code',labelWidth:60,xtype:'widget-field-enumcombo',store:Keer.enumstore['status'],displayField:'name',triggerCtrl:true},
				{fieldLabel:'状态',name:'status',itemId:'status',dataIndex:'status',labelWidth:60,xtype:'widget-field-enumcombo',store:Keer.enumstore['EnumType'],displayField:'name',triggerCtrl:true},
				{fieldLabel:'用户名称',name:'userName',itemId:'userName',dataIndex:'userName',labelWidth:60,xtype:'textfield'},
				{fieldLabel:'手机号码',name:'userMobile',itemId:'userMobile',dataIndex:'userMobile',labelWidth:60,xtype:'textfield'},
				{fieldLabel:'创建时间',name:'createdTime',itemId:'createdTime',dataIndex:'createdTime',labelWidth:60,xtype:'datefield',format:'Y-m-d H:i:s'}
				]
			},
			cmdToolbar:[],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				,{text:'编号',dataIndex:'code',width:120}
				,{text:'用户名称',dataIndex:'userName',width:120}
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
    	var viewConfig = {
			layout: 'fit',
			title: this.winTitle,
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