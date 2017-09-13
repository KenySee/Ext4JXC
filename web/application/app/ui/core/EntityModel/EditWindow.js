Ext.define('Keer.ui.core.EntityModel.EditWindow',{
	extend: 'Keer.widget.view.EditWindow',
	alias: 'widget.ui-core-EntityModel-editwindow',
	controller: 'Keer.ui.core.EntityModel.EditController',
	//【加载依赖】
	requires: [
		'Keer.store.ModelConfig.Store',
		'Keer.widget.field.ObjectTrigger',
		'Keer.widget.field.EnumCombo',
		'Keer.widget.field.CollectionHidden',
		'Keer.ui.core.EntityModel.EditController',
		'Keer.ui.core.EntityModel.ModelConfig.ChildContainer'
	],
	//【混入功能】
	mixins: {
	},	
	config:{
		column: 3,
		addWidth: 120,
		addHeight: 80,
		labelWidth: 60,
		labelAlign: 'left',
		formConfig: {},
		appParams: {}
	},
	initConfig: function (config) {
		Ext.apply(config,{
			detailStore: Ext.widget('ModelConfig-store',{controller:this.getController()})
		});
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			title: '界面模型',
			cmdToolbar: [
				{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: 'left', privilege: 'ADD', hidden: true,editReady:'ready'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign: 'left', privilege: 'EDIT',editEdit:'editing'},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: 'left', privilege: 'EDIT', hidden: true},
				{text:'关闭',itemId:'toolbar_close',iconCls:'x-button-close',iconAlign: 'left'}
			],
			formFields : [
				{fieldLabel:'模型类名',name:'fullname',itemId:'fullname',dataIndex:'fullname',xtype:'textfield',readOnly:true},
				{fieldLabel:'模型名称',name:'name',itemId:'name',dataIndex:'name',xtype:'textfield'},
				{fieldLabel:'标题属性',name:'displayField',itemId:'displayField',dataIndex:'displayField',xtype:'textfield'},
				{fieldLabel:'父属性',name:'parentModel',itemId:'parentModel',dataIndex:'parentModel',xtype:'widget-field-objectcombo',store:'EntityModel-store',displayField:'name'},
				{fieldLabel:'模型简写',name:'appfolder',itemId:'appfolder',dataIndex:'appfolder',xtype:'textfield'},
				{fieldLabel:'所在目录',name:'upfolder',itemId:'upfolder',dataIndex:'upfolder',xtype:'textfield'},
				{fieldLabel:'分类属性',name:'categoryNav',itemId:'categoryNav',dataIndex:'categoryNav',xtype:'widget-field-objectcombo',store:'EntityModel-store',displayField:'name'},
				{fieldLabel:'布局方式',name:'layout',itemId:'layout',dataIndex:'layout',xtype:'widget-field-enumcombo',store:Keer.enumstore['layout'],displayField:'name'},
				{fieldLabel:'编辑方式',name:'grid',itemId:'grid',dataIndex:'grid',xtype:'widget-field-enumcombo',store:Keer.enumstore['grid'],displayField:'name'},
				{fieldLabel:'配置明细',name:'columns',itemId:'columns',dataIndex:'columns',xtype:'widget-field-collectionhidden',loadSync:false, store: this.detailStore,xcontainer:'ui-core-EntityModel-ModelConfig-childcontainer'}
			]
		});
		this.callParent(arguments);
	}
});