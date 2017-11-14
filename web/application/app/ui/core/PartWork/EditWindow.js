Ext.define('Keer.ui.core.PartWork.EditWindow',{
	extend: 'Keer.widget.view.EditWindow',
	alias: 'widget.ui-core-PartWork-editwindow',
	controller: 'Keer.ui.core.PartWork.EditController',
	//【加载依赖】
	requires: [
		'Keer.widget.field.CollectionHidden',
		'Keer.ui.core.PartWork.PartWorkSpecification.ChildContainer',
		'Keer.store.PartWorkSpecification.Store',
        'Keer.ui.core.PartWork.PartWorkContent.ChildContainer',
        'Keer.store.PartWorkContent.Store',
        'Keer.widget.field.FileTrigger',
		'Keer.ui.core.PartWork.EditController'
	],
	//【混入功能】
	mixins: {
	},	
	config:{
		column: 2,
        addWidth: 400,
        addHeight: 200,
        labelWidth: 60,
		labelAlign: 'left',
		autoLayout: true,
		tabLayout: true,
		winTitle: '作品',
		formConfig: {itemId:'winform'},
		appParams: {}
	},
	initConfig: function (config) {
		Ext.apply(config,{
			specificationsStore: Ext.widget('PartWorkSpecification-store',{
				controller:this.getController()
			}),
            contentsStore: Ext.widget('PartWorkContent-store',{
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
				{fieldLabel:'作品名称',name:'workName',itemId:'workName',dataIndex:'workName',xtype:'textfield',addFocus:'adding'},
                {fieldLabel:'作品主图',name:'coverImg',itemId:'coverImg',triggerCtrl:true,emptyText:'尺寸【750*750】',dataIndex:'coverImg',xtype:'widget-field-filetrigger'},
				{fieldLabel:'作品介绍',name:'description',itemId:'description',dataIndex:'description',xtype:'textarea',fullLine:true,growMin:2},
				{fieldLabel:'作品规格',name:'specifications',itemId:'specifications',dataIndex:'specifications',loadSync:true,writeSync:true,store:this.specificationsStore,xtype:'widget-field-collectionhidden',xcontainer:'ui-core-PartWork-PartWorkSpecification-childcontainer'},
                {fieldLabel:'作品详情',name:'contents',itemId:'contents',dataIndex:'contents',loadSync:true,writeSync:true,store:this.contentsStore,xtype:'widget-field-collectionhidden',xcontainer:'ui-core-PartWork-PartWorkContent-childcontainer'}
			]
		});
		this.callParent(arguments);
	}
});