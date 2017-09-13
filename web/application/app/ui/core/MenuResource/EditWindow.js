Ext.define('Keer.ui.core.MenuResource.EditWindow',{
	extend: 'Keer.widget.view.EditWindow',
	alias: 'widget.ui-core-MenuResource-editwindow',
	controller: 'Keer.ui.core.MenuResource.EditController',
	//【加载依赖】
	requires: [
		'Keer.widget.field.ObjectTrigger',
		'Keer.ui.selwin.MenuResource.FindWindow',
		'Keer.widget.field.CollectionHidden',
		'Keer.ui.core.MenuResource.MenuActionDesc.ChildContainer',
		'Keer.store.MenuActionDesc.Store',
		'Keer.ui.core.MenuResource.EditController'
	],
	//【混入功能】
	mixins: {
	},	
	config:{
		column: 2,
		addWidth: 0,
		addHeight: -120,
		labelWidth: 60,
		labelAlign: 'left',
		autoLayout: true,
		tabLayout: true,
		formConfig: {itemId:'winform'},
		appParams: {}
	},
	initConfig: function (config) {
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			title: '窗口标题',
			cmdToolbar: [
				{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: 'left', privilege: 'ADD', hidden: true,editReady:'ready',editEdit:'!editing'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign: 'left', privilege: 'EDIT',editEdit:'editing'},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: 'left', privilege: 'EDIT',editEdit:'editing', hidden: true},
				{text:'关闭',itemId:'toolbar_close',iconCls:'x-button-close',iconAlign: 'left'}
			],
			formFields : [
				{fieldLabel:'菜单名称',name:'name',itemId:'name',dataIndex:'name',xtype:'textfield'},
				{fieldLabel:'上级资源',name:'parent',itemId:'parent',dataIndex:'parent',xtype:'widget-field-objecttrigger',xwindow:'ui-selwin-MenuResource-findwindow',displayField:'name'},
				{fieldLabel:'菜单URL',name:'url',itemId:'url',dataIndex:'url',xtype:'textfield',fullLine:true},
				{fieldLabel:'模块类名',name:'clazzAction',itemId:'clazzAction',dataIndex:'clazzAction',xtype:'textfield',allowBlack:false,fullLine:true},
				{fieldLabel:'菜单动作',name:'actionTypes',itemId:'actionTypes',dataIndex:'actionTypes',xtype:'widget-field-collectionhidden',store:Ext.widget('MenuActionDesc-store'),xcontainer:'ui-core-MenuResource-MenuActionDesc-childcontainer'}
			]
		});
		this.callParent(arguments);
	}
});