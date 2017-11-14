Ext.define('Keer.ui.core1.PartArtist.EditWindow',{
	extend: 'Keer.widget.view.EditWindow',
	alias: 'widget.ui-core1-PartArtist-editwindow',
	controller: 'Keer.ui.core1.PartArtist.EditController',
	//【加载依赖】
	requires: [
		'Keer.widget.field.ObjectCombo',
		'Keer.widget.field.CollectionHidden',
		'Keer.ui.core.PartArtist.PartArticle.ChildContainer',
		'Keer.store.PartArticle.Store',
		'Keer.ui.core.PartArtist.PartWork.ChildContainer',
		'Keer.store.PartWork.Store',
		'Keer.ui.core.PartArtist.PartStory.ChildContainer',
		'Keer.store.PartStory.Store',
		'Keer.ui.core1.PartArtist.EditController'
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
		winTitle: '匠人',
		formConfig: {itemId:'winform'},
		appParams: {}
	},
	initConfig: function (config) {
		Ext.apply(config,{
			articlesStore: Ext.widget('PartArticle-store',{
				controller:this.getController()
			}),
			worksStore: Ext.widget('PartWork-store',{
				controller:this.getController()
			}),
			storysStore: Ext.widget('PartStory-store',{
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
				{fieldLabel:'匠人名称',name:'nickname',itemId:'nickname',dataIndex:'nickname',xtype:'textfield',addFocus:'adding'},
				{fieldLabel:'个人图像',name:'headUrl',itemId:'headUrl',dataIndex:'headUrl',xtype:'textfield'},
				{fieldLabel:'个性签名',name:'signature',itemId:'signature',dataIndex:'signature',xtype:'textfield'},
				{fieldLabel:'匠人类型',name:'artistType',itemId:'artistType',dataIndex:'artistType',xtype:'widget-field-objectcombo',displayField:'name'},
				{fieldLabel:'匠人介绍',name:'description',itemId:'description',dataIndex:'description',xtype:'textarea',fullLine:true,growMin:3},
				{fieldLabel:'文章集',name:'articles',itemId:'articles',dataIndex:'articles',loadSync:true,writeSync:true,store:this.articlesStore,xtype:'widget-field-collectionhidden',xcontainer:'ui-core-PartArtist-PartArticle-childcontainer'},
				{fieldLabel:'作品集',name:'works',itemId:'works',dataIndex:'works',loadSync:true,writeSync:true,store:this.worksStore,xtype:'widget-field-collectionhidden',xcontainer:'ui-core-PartArtist-PartWork-childcontainer'},
				{fieldLabel:'匠人故事',name:'storys',itemId:'storys',dataIndex:'storys',loadSync:true,writeSync:true,store:this.storysStore,xtype:'widget-field-collectionhidden',xcontainer:'ui-core-PartArtist-PartStory-childcontainer'}
			]
		});
		this.callParent(arguments);
	}
});