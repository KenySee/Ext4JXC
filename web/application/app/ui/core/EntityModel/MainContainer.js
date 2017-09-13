Ext.define('Keer.ui.core.EntityModel.MainContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-core-EntityModel-maincontainer',
	controller: 'Keer.ui.core.EntityModel.MainController',
	requires:[
		'Keer.widget.field.EnumCombo',
		'Keer.store.EntityModel.Store',
		'Keer.store.ModelConfig.Store',
		'Keer.store.EntityModel.StoreTree',
		'Keer.ui.core.EntityModel.MainController'
	],
	//【混入功能】
	mixins: {
	},
	config:{
		canMulti: false,
		innerEdit: false,
		dragDrop: false,
		mainWidth: 220,
		mainHeight: 400,
		childAlign: null,
		appParams:{}
	},
	initConfig: function (config) {
		Ext.apply(config,{
			gridStore: Ext.widget('EntityModel-store',{
				controller:this.getController()
			}),
			detailStore: Ext.widget('ModelConfig-store',{controller:this.getController()})
		});
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:{
				xtype: 'querybar',
				store: this.gridStore,
				items: [
					{fieldLabel:'模型简写',name:'appfolder',itemId:'appfolder',dataIndex:'appfolder',labelWidth:60,xtype:'textfield'},
					{fieldLabel:'所在目录',name:'upfolder',itemId:'upfolder',dataIndex:'upfolder',labelWidth:60,xtype:'textfield'}
				]
			},
			cmdToolbar:[
				{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: 'top', privilege: 'ADD',mainReady:'ready',mainReady:'ready'},
				{text:'删除',itemId:'toolbar_remove',iconCls:'remove',iconAlign: 'top', privilege: 'DEL',mainReady:'ready',mainRemove:'canRemove',mainReady:'ready'},
				{text:'查看',itemId:'toolbar_edit',iconCls:'application_form_magnify',iconAlign: 'top', disabled:true, privilege: 'VIEW',mainView:'canView',mainReady:'ready'},
				{text:'注册',itemId:'toolbar_register',iconCls:'register',iconAlign: 'top',privilege: 'VIEW',mainView:'canView',mainReady:'ready'},
				{text:'ExtJs',itemId:'toolbar_extjs',iconCls:'script_lightning',iconAlign: 'top',privilege: 'VIEW',mainView:'canView',mainReady:'ready'},
				{text:'Java',itemId:'toolbar_java',iconCls:'script_gear',iconAlign: 'top',privilege: 'VIEW',mainView:'canView',mainReady:'ready'},
				{text:'刷新',itemId:'toolbar_refresh',iconCls:'x-button-refresh',iconAlign: 'top', privilege: 'VIEW',mainReady:'ready'}
			],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32},
				{text:'模型类名',dataIndex:'fullname',width:320},
				{text:'模型名称',dataIndex:'name',width:120},
				{text:'所在目录',dataIndex:'upfolder',width:160},
				{text:'模型简写',dataIndex:'appfolder',width:120},
				{text:'布局方式',dataIndex:'layout',width:120,editor:{xtype:'widget-field-enumcombo',store:Keer.enumstore['layout'],displayField:'name',dataIndex:'layout'},renderer:this.enumRender('comm-layout')},
				{text:'编辑方式',dataIndex:'grid',width:90,editor:{xtype:'widget-field-enumcombo',store:Keer.enumstore['grid'],displayField:'name',dataIndex:'grid'},renderer:this.enumRender('comm-grid')}
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
				items: this.cmdToolbar
			},
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