Ext.define('Keer.ui.core.PartReserve.EditWindow',{
	extend: 'Keer.widget.view.EditWindow',
	alias: 'widget.ui-core-PartReserve-editwindow',
	controller: 'Keer.ui.core.PartReserve.EditController',
	//【加载依赖】
	requires: [
		'Keer.widget.field.EnumCombo',
		'Keer.ui.core.PartReserve.EditController'
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
		autoLayout: true,
		tabLayout: true,
		winTitle: '用户预订表',
		formConfig: {itemId:'winform'},
		appParams: {}
	},
	initConfig: function (config) {
		Ext.apply(config,{
			gridStore: config.appParams.store
		});
		if(config.store) config.store = null;
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			title: this.winTitle,
			cmdToolbar: [
				{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: 'left', privilege: 'ADD', hidden: true,editReady:'ready',editEdit:'!editing'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign: 'left', privilege: 'EDIT',editEdit:'editing'},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: 'left', privilege: 'EDIT',editEdit:'editing', hidden: true},
				{text:'关闭',itemId:'toolbar_close',iconCls:'x-button-close',iconAlign: 'left'}
			],
			formFields : [
				{fieldLabel:'编号',name:'code',itemId:'code',dataIndex:'code',xtype:'textfield',addFocus:'adding'},
				{fieldLabel:'用户名称',name:'userName',itemId:'userName',dataIndex:'userName',xtype:'textfield'},
				{fieldLabel:'手机号码',name:'userMobile',itemId:'userMobile',dataIndex:'userMobile',xtype:'textfield'},
				{fieldLabel:'创建时间',name:'createdTime',itemId:'createdTime',dataIndex:'createdTime',xtype:'datefield',format:'Y-m-d H:i:s'},
				{fieldLabel:'状态',name:'status',itemId:'status',dataIndex:'status',xtype:'widget-field-enumcombo',store:Keer.enumstore['status'],displayField:'name',triggerCtrl:true}
			]
		});
		this.callParent(arguments);
	}
});