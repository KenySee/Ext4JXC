Ext.define('Keer.ui.core.EntityModel.ModelConfig.ChildContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-core-EntityModel-ModelConfig-childcontainer',
	controller: 'Keer.ui.core.EntityModel.ModelConfig.ChildController',
	requires:[
		'Keer.widget.field.EnumCombo',
		'Keer.widget.field.ObjectCombo',
		'Keer.store.comm.editorStore',
		'Keer.store.ModelConfig.Store',
		'Keer.ui.core.EntityModel.ModelConfig.ChildController'
	],
	//【混入功能】
	mixins: {
	},
	config:{
		canMulti: false,
		innerEdit: true,
		dragDrop: true,
		appParams:{}
	},
	initConfig: function (config) {
		Ext.apply(config,{
			gridStore: config.store,
			navStore: Ext.widget('ModelConfig-store',{controller: this.getController()})
		});
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			cmdToolbar:[
				{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: 'left', privilege: 'ADD',childReady:'ready'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign:'left', privilege: 'EDIT',childEdit:'editing',hidden:true},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: 'left', privilege: 'EDIT',childEdit:'editing'},
				{text:'删除',itemId:'toolbar_remove',iconCls:'remove',iconAlign: 'left', privilege: 'DEL',childEdit:'!editing',childRemove:'canRemove'},
				{text:'拷贝',itemId:'toolbar_copy',iconCls:'copy',iconAlign: 'left',privilege: 'ADD',childReady:'ready'}
			],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32},
				{text:'中文标题',dataIndex:'text',width:90,editor:{xtype:'textfield'}},
				{text:'映射名称',dataIndex:'dataIndex',width:90,editor:{xtype:'textfield'}},
				{text:'数据类型',dataIndex:'dataType',width:100,editor:{xtype:'widget-field-enumcombo',store:Keer.enumstore['dataType'],displayField:'name',dataIndex:'dataType'},renderer:this.enumRender('comm-dataType')},
				{text:'编辑部件',dataIndex:'editor',width:100,editor:{xtype:'widget-field-objectcombo',store:'comm-editorstore',displayField:'name',dataIndex:'editor'},renderer:this.enumRender(null,'name')},
				{text:'列宽',dataIndex:'columnWidth',width:60,editor:{xtype:'numberfield'}}
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