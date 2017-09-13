Ext.define('Keer.ui.core.Organization.User.EditWindow',{
	extend: 'Keer.widget.view.EditWindow',
	alias: 'widget.ui-core-Organization-User-editwindow',
	controller: 'Keer.ui.core.Organization.User.EditController',
	//【加载依赖】
	requires: [
		'Keer.widget.field.ObjectTrigger',
		'Keer.ui.core.Organization.User.EditController'
	],
	//【混入功能】
	mixins: {
	},	
	config:{
		column: 2,
		addWidth: 0,
		addHeight: 0,
		labelWidth: 60,
		labelAlign: 'left',
		formConfig: {},
		appParams: {}
	},
	initConfig: function (config) {
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			title: '添加用户',
			cmdToolbar: [
				{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: 'left', privilege: 'ADD', hidden: true,editReady:'ready'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign: 'left', privilege: 'EDIT',editEdit:'editing'},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: 'left', privilege: 'EDIT', hidden: true},
				{text:'关闭',itemId:'toolbar_close',iconCls:'x-button-close',iconAlign: 'left'}
			],
			formFields : [
				{itemId:'code',name:'code',fieldLabel:'用户编号',xtype:'textfield'},
				{itemId:'name',name:'name',fieldLabel:'用户名称',xtype:'textfield'},
				{itemId:'loginname',name:'loginname',fieldLabel:'登录名称',xtype:'textfield'},
				{itemId:'mainMember',name:'mainMember',fieldLabel:'所在部门',xtype:'widget-field-objecttrigger',displayField:'name',dataIndex:'mainMember',readOnly:true}
			]
		});
		this.callParent(arguments);
	}
});