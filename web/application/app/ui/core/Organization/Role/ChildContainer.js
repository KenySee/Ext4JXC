Ext.define('Keer.ui.core.Organization.Role.ChildContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-core-Organization-Role-childcontainer',
	controller: 'Keer.ui.core.Organization.Role.ChildController',
	requires:[
		'Keer.ui.core.Organization.Role.ChildController'
	],
	//【混入功能】
	mixins: {
	},
	config:{
		canMulti: false,
		innerEdit: false,
		dragDrop: false,
		appParams:{}
	},
	initConfig: function (config) {
		Ext.apply(config,{
			gridStore: config.store
		});
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			cmdToolbar:[
				{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: 'left', privilege: 'ADD',childReady:'ready'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign:'left', privilege: 'EDIT',childEdit:'editing',hidden:true},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: 'left', privilege: 'EDIT',childEdit:'editing'},
				{text:'删除',itemId:'toolbar_remove',iconCls:'remove',iconAlign: 'left', privilege: 'DEL',childReady:'ready',childRemove:'canRemove'}
			],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32},
				{text:'角色名称',dataIndex:'name',width:120,editor:{xtype:'textfield'}},
				{text:'角色描述',dataIndex:'remark',flex:1,editor:{xtype:'textfield'}}	
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
			layout: 'fit',
			region: 'center',
			tbar:{
				xtype: 'toolbar',
				itemId: 'cmdToolBar',
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
			items:[mainPanel]
		};
		this.doViewInitComponent(viewConfig);
		this.callParent(arguments);
	}
});