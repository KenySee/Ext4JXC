Ext.define('Keer.ui.core.MenuResource.MenuActionDesc.ChildContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-core-MenuResource-MenuActionDesc-childcontainer',
	controller: 'Keer.ui.core.MenuResource.MenuActionDesc.ChildController',
	requires:[
		'Keer.widget.view.DataView',
		'Keer.store.MenuActionDesc.Store',
		'Keer.ui.core.MenuResource.MenuActionDesc.ChildController'
	],
	//【混入功能】
	mixins: {
	},
	config:{
		canMulti: false,
		innerEdit: true,
		dragDrop: false,
		mainWidth: 220,
		mainHeight: 320,
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
			gridStore: config.store || Ext.widget('MenuActionDesc-store',{controller: this.getController()})
		});
		if(config.store) config.store = null;
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			cmdToolbar:[
				{text:'注册',itemId:'toolbar_register',iconCls:'register',iconAlign: 'left', privilege: 'ADD'},
				{text:'新增',itemId:'toolbar_add',iconCls:'add',hidden:true,iconAlign: 'left', privilege: 'ADD',childReady:'ready'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',hidden:true,iconAlign:'left', privilege: 'EDIT',childEdit:'editing',hidden:true},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',hidden:false,iconAlign: 'left', privilege: 'EDIT',childEdit:'editing'},
				{text:'删除',itemId:'toolbar_remove',iconCls:'remove',hidden:false,iconAlign: 'left', privilege: 'DEL',childEdit:'!editing',childRemove:'canRemove'}
			],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				,{text:'动作类型',dataIndex:'actionType',width:120,editor:{xtype:'textfield'}}
				,{text:'动作描述',dataIndex:'actionDesc',width:180,editor:{xtype:'textfield'}}
			],
			pagingtoolbar : null
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
				items: this.cmdToolbar
			},
			layout: 'fit',
			itemId: 'mainPanel',
			region: 'center',
			border: 1,
			margin : '-1 -1 -1 -1',
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