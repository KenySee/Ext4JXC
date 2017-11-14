Ext.define('Keer.ui.core.PartArtist.MainContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-core-PartArtist-maincontainer',
	controller: 'Keer.ui.core.PartArtist.MainController',
	requires:[
        'Keer.widget.field.EnumCombo',
		'Keer.widget.field.CollectionHidden',
		'Keer.ui.core.PartArtist.PartArticle.ChildContainer',
		'Keer.store.PartArticle.Store',
		'Keer.ui.core.PartArtist.PartWork.ChildContainer',
		'Keer.store.PartWork.Store',
		'Keer.store.PartArtist.Store',
        'Keer.widget.field.FileTrigger',
        'Keer.ui.core.PartArtist.PartStory.ChildContainer',
        'Keer.store.PartStory.Store',
		'Keer.ui.core.PartArtist.MainController'
	],	
	config:{
		canMulti: false,
		innerEdit: true,
		dragDrop: false,
		mainWidth: 220,
		mainHeight: 480,
		mainTitle: '匠人',
		addWidth: 0,
		addHeight: 0,
		tabLayout: false,
		autoLayout: true,
		iconAlign: 'top',
		childAlign: 'right',
		formConfig:{itemId:'winform',height:220},
		appParams:{}									
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
			gridStore: config.store || Ext.widget('PartArtist-store',{
				controller:this.getController()
			})
		});
		if(config.store) config.store = null;
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:{
				xtype: 'querybar',
				store: this.gridStore,
				items: [
				{fieldLabel:'匠人名称',name:'nickname',itemId:'nickname',dataIndex:'nickname',labelWidth:60,xtype:'textfield'}
				]
			},
			cmdToolbar:[
				{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: this.iconAlign, privilege: 'ADD',mainEdit:'!editing'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign: this.iconAlign, privilege: 'EDIT',mainEdit:'editing'},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: this.iconAlign, privilege: 'EDIT',mainEdit:'editing'},
				{text:'删除',itemId:'toolbar_remove',iconCls:'remove',iconAlign: this.iconAlign, disabled:true, privilege: 'DEL',mainRemove:'canRemove',mainAdd:'!adding'}
			],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				,{text:'匠人名称',dataIndex:'nickname',width:120}
			],
			formFields:[
				{fieldLabel:'匠人名称',name:'nickname',itemId:'nickname',dataIndex:'nickname',xtype:'textfield',addFocus:'adding'},
				{fieldLabel:'个人图像',name:'headUrl',itemId:'headUrl',dataIndex:'headUrl',emptyText:'尺寸【85*85】',triggerCtrl:true,xtype:'widget-field-filetrigger'},
                {fieldLabel:'匠人类型',name:'artistType',itemId:'artistType',dataIndex:'artistType',triggerCtrl:true,xtype:'widget-field-enumcombo',store:Keer.enumstore['artistTypeEnum'],displayField:'name'},
				{fieldLabel:'匠人头衔',name:'signature',itemId:'signature',dataIndex:'signature',xtype:'textfield'},
				{fieldLabel:'匠人介绍',name:'description',itemId:'description',dataIndex:'description',xtype:'textarea',fullLine:true,rows:8},
				{fieldLabel:'文章集',name:'articles',itemId:'articles',dataIndex:'articles',loadSync:true,writeSync:true,store:this.articlesStore,xtype:'widget-field-collectionhidden',xcontainer:'ui-core-PartArtist-PartArticle-childcontainer'},
				{fieldLabel:'作品集',name:'works',itemId:'works',dataIndex:'works',loadSync:true,writeSync:true,store:this.worksStore,xtype:'widget-field-collectionhidden',xcontainer:'ui-core-PartArtist-PartWork-childcontainer'},
                {fieldLabel:'故事集',name:'storys',itemId:'storys',dataIndex:'storys',loadSync:true,writeSync:true,store:this.storysStore,xtype:'widget-field-collectionhidden',xcontainer:'ui-core-PartArtist-PartStory-childcontainer'}
			],
			pagingtoolbar : {
				xtype: 'pagingtoolbar',
				store: this.gridStore,
				displayInfo: true,
				dock: 'bottom',
				layout: 'hbox',
				displayMsg: '显示 {0} - {1} 条 共 {2} 条',
				emptyMsg: "没有记录"
			}
		});
		var gridView = {
			xtype: 'widget-view-gridview',
			itemId: 'gridView',
			region: 'center',
			innerEdit: this.innerEdit,
			dragDrop: this.dragDrop,
			canMulti: this.canMulti,
			tbar: this.queryToolbar,
			bbar: this.pagingtoolbar,
			store: this.gridStore,
			columns: this.gridColumns
		};
		var mainPanel = {
			title: this.mainTitle,
			tbar: {xtype: 'toolbar',hidden: true,itemId: 'navToolBar',items:[]},
			tools :[
				{itemId: 'toolbar_refresh',type: 'refresh',tooltip:'刷新'}
			],
			layout: 'fit',
			itemId: 'mainPanel',
			region : 'west',
			border: 1,
			margin : '-1 0 2 -1',
			minWidth : 0,
			width : this.mainWidth,
			collapseMode: 'mini',
			collapsible : true,
			collapsed : false,
			hideCollapseTool : true,
			maintainFlex : true,
			split : true,
			deferRowRender:true,
			autoScroll : false,
			items:[gridView]
		};
		var childPanel = {
			xtype: 'widget-form-panel',
			layout: 'fit',
			itemId: 'childPanel',
			region: 'center',
			border: 1,
			margin : '-1 -1 2 -1',
			column: 4,
			addWidth: this.addWidth,
			addHeight: this.addHeight,
			labelWidth: 60,
			labelAlign: 'left',
			cmdToolbar: this.cmdToolbar,
			formConfig: this.formConfig,
			formFields: this.formFields
		};
		var viewConfig = {
			layout: 'border',
			items:[mainPanel,childPanel]
    	};
		this.doViewInitComponent(viewConfig);
		this.callParent(arguments);
	}
});