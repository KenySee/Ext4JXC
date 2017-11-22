Ext.define('Keer.ui.core.PartReserve.MainContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-core-PartReserve-maincontainer',
	controller: 'Keer.ui.core.PartReserve.MainController',
	requires:[
		'Keer.widget.field.EnumCombo',
		'Keer.widget.field.EnumCombo',
		'Keer.store.PartReserve.Store',
		'Keer.ui.core.PartReserve.MainController'
	],	
	config:{
		canMulti: false,
		innerEdit: false,
		dragDrop: false,
		mainWidth: 220,
		mainHeight: 320,
		mainTitle: null,
		addWidth: 0,
		addHeight: 0,
		tabLayout: false,
		autoLayout: true,
		iconAlign: 'top',
		childAlign: 'right',
		formConfig:{itemId:'winform'},
		appParams:{}									
	},
	initConfig: function (config) {
		Ext.apply(config,{
			gridStore: config.store || Ext.widget('PartReserve-store',{
				controller:this.getController()
			})
		});
		if(config.store) config.store = null;
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
			cmdToolbar:[
				{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: this.iconAlign, privilege: 'ADD',mainEdit:'!editing',mainReady:'ready'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign: this.iconAlign, privilege: 'EDIT',mainEdit:'editing',hidden:true},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: this.iconAlign, privilege: 'EDIT',mainEdit:'editing',hidden:true},
				{text:'删除',itemId:'toolbar_remove',iconCls:'remove',iconAlign: this.iconAlign, disabled:true, privilege: 'DEL',mainRemove:'canRemove'},
				{text:'查看',itemId:'toolbar_edit',iconCls:'application_form_magnify',iconAlign: this.iconAlign, disabled:true, privilege: 'VIEW',mainView:'canView'},
				{text:'刷新',itemId:'toolbar_refresh',iconCls:'x-button-refresh',iconAlign: this.iconAlign, privilege: 'VIEW',mainEdit:'!editing',mainReady:'ready'}
			],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				,{text:'编号',dataIndex:'code',width:120,editor:{xtype:'textfield'}}
				,{text:'用户名称',dataIndex:'userName',width:120,editor:{xtype:'textfield'}}
				,{text:'手机号码',dataIndex:'userMobile',width:120,editor:{xtype:'textfield'}}
				,{text:'创建时间',dataIndex:'createdTime',width:120,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},xtype:'datecolumn',format:'Y-m-d H:i:s'}
				,{text:'状态',dataIndex:'status',width:120,editor:{xtype:'widget-field-enumcombo',store:Keer.enumstore['status'],displayField:'name',dataIndex:'status',triggerCtrl:true}}
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
			title: this.mainTitle,
			tbar:{
				xtype: 'toolbar',
				itemId: 'cmdToolBar',
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
			items:[mainPanel]
		};
		this.doViewInitComponent(viewConfig);
		this.callParent(arguments);
	}
});