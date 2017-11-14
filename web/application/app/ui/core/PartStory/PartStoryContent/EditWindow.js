Ext.define('Keer.ui.core.PartStory.PartStoryContent.EditWindow',{
	extend: 'Keer.widget.view.EditWindow',
	alias: 'widget.ui-core-PartStory-PartStoryContent-editwindow',
	controller: 'Keer.ui.core.PartStory.PartStoryContent.EditController',
	//【加载依赖】
	requires: [
		'Keer.widget.field.EnumCombo',
		'Keer.ui.core.PartStory.PartStoryContent.EditController'
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
		winTitle: '故事内容',
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
				{fieldLabel:'内容序号',name:'contentIndex',itemId:'contentIndex',dataIndex:'contentIndex',xtype:'numberfield',addFocus:'adding'},
				{fieldLabel:'内容类型',name:'contentType',itemId:'contentType',dataIndex:'contentType',xtype:'widget-field-enumcombo',store:Keer.enumstore['EnumType'],displayField:'name'},
				{fieldLabel:'类型值',name:'contentValue',itemId:'contentValue',dataIndex:'contentValue',xtype:'textarea',fullLine:true,growMin:3}
			]
		});
		this.callParent(arguments);
	}
});