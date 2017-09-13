Ext.define('Keer.ui.core.Widget.EditWindow',{
	extend: 'Keer.widget.view.EditWindow',
	alias: 'widget.ui-core-Widget-editwindow',
	controller: 'Keer.ui.core.Widget.EditController',
	//【加载依赖】
	requires: [
		'Keer.widget.field.EnumCombo',
		'Keer.ui.core.Widget.EditController'
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
		winTitle: '部件',
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
				{fieldLabel:'部件名称',name:'name',itemId:'name',dataIndex:'name',xtype:'textfield'},
				{fieldLabel:'部件状态',name:'status',itemId:'status',dataIndex:'status',xtype:'widget-field-enumcombo',store:Keer.enumstore['status'],displayField:'name'},
				{fieldLabel:'部件类名',name:'classname',itemId:'classname',dataIndex:'classname',xtype:'textfield',fullLine:true},
				{fieldLabel:'部件别名',name:'aliasname',itemId:'aliasname',dataIndex:'aliasname',xtype:'textfield',fullLine:true}
			]
		});
		this.callParent(arguments);
	}
});