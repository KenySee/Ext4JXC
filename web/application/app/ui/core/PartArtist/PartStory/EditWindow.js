Ext.define('Keer.ui.core.PartArtist.PartStory.EditWindow',{
	extend: 'Keer.widget.view.EditWindow',
	alias: 'widget.ui-core-PartArtist-PartStory-editwindow',
	controller: 'Keer.ui.core.PartArtist.PartStory.EditController',
	//【加载依赖】
	requires: [
		'Keer.widget.field.CollectionHidden',
		'Keer.ui.core.PartStory.PartStoryContent.ChildContainer',
		'Keer.store.PartStoryContent.Store',
		'Keer.ui.core.PartArtist.PartStory.EditController'
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
		winTitle: '故事',
		formConfig: {itemId:'winform'},
		appParams: {}
	},
	initConfig: function (config) {
		Ext.apply(config,{
			contentsStore: Ext.widget('PartStoryContent-store',{
				controller:this.getController()
			}),
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
				{fieldLabel:'标题',name:'title',itemId:'title',dataIndex:'title',xtype:'textfield',addFocus:'adding'},
				{fieldLabel:'主图',name:'coverImage',itemId:'coverImage',dataIndex:'coverImage',xtype:'textfield'},
				{fieldLabel:'描述',name:'description',itemId:'description',dataIndex:'description',xtype:'textarea'},
				{fieldLabel:'故事内容',name:'contents',itemId:'contents',dataIndex:'contents',loadSync:true,writeSync:true,store:this.contentsStore,xtype:'widget-field-collectionhidden',xcontainer:'ui-core-PartStory-PartStoryContent-childcontainer'}
			]
		});
		this.callParent(arguments);
	}
});