Ext.define('Keer.ui.${upfolder}.${appfolder}.EditWindow',{
	extend: 'Keer.widget.view.EditWindow',
	alias: 'widget.ui-${aliasPrefix}-${appfolder}-editwindow',
	controller: 'Keer.ui.${upfolder}.${appfolder}.EditController',
	//【加载依赖】
	requires: [
		<#list toFieldRequires() as item>
		'${item}',
		</#list>
		'Keer.ui.${upfolder}.${appfolder}.EditController'
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
		winTitle: '${name}',
		formConfig: {itemId:'winform'},
		appParams: {}
	},
	initConfig: function (config) {
		Ext.apply(config,{
			<#list toChildHiddenModel() as item>
			${item.dataIndex}Store: Ext.widget('${item.editor.childStore.aliasname}',{
				controller:this.getController()
			}),
			</#list>
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
				<#list toFieldConfig() as item>
				${item}<#if item_has_next>,</#if>
				</#list>
			]
		});
		this.callParent(arguments);
	}
});