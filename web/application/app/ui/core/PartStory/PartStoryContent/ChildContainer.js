Ext.define('Keer.ui.core.PartStory.PartStoryContent.ChildContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-core-PartStory-PartStoryContent-childcontainer',
	controller: 'Keer.ui.core.PartStory.PartStoryContent.ChildController',
	requires:[
		'Keer.widget.field.EnumCombo',
		'Keer.store.PartStoryContent.Store',
		'Keer.ui.core.PartStory.PartStoryContent.ChildController'
	],	
	config:{
		canMulti: false,
		innerEdit: false,
		dragDrop: false,
		mainWidth: 220,
		mainHeight: 320,
		mainTitle: null,
		addWidth: 0,
		addHeight: 0,
		tabLayout: false,
		autoLayout: true,
		iconAlign: 'left',
		childAlign: 'right',
		navWidth: 220,
		navTitle: '故事',
		navPropName: 'name',
		formConfig:{itemId:'winform'},
		appParams:{}									
	},
	initConfig: function (config) {
		Ext.apply(config,{
			gridStore: config.store || Ext.widget('PartStoryContent-store',{
				controller:this.getController()
			})
		});
		if(config.store) config.store = null;
		this.callParent(arguments);
	},
	initComponent: function(){
        var controller = this.getController();
		Ext.apply(this,{
			queryToolbar:{
				xtype: 'querybar',
				store: this.gridStore,
				items: [
				]
			},
            cmdToolbar: [
                {
                    text: '新增', itemId: 'toolbar_add', iconCls: 'add', iconAlign: this.iconAlign
                    , handler: Ext.bind(controller.doOpenTemplate, controller,[])
                    , privilege: 'ADD', childReady: 'ready'
                },
                {
                    text: '删除',
                    itemId: 'toolbar_remove',
                    iconCls: 'remove',
                    iconAlign: this.iconAlign,
                    disabled: true,
                    privilege: 'DEL',
                    childRemove: 'canRemove'
                },
                {
                    text: '查看',
                    itemId: 'toolbar_edit',
                    iconCls: 'application_form_magnify',
                    iconAlign: this.iconAlign,
                    disabled: true,
                    hidden: true,
                    privilege: 'VIEW',
                    childView: 'canView'
                }
            ],
            gridColumns: [
                {text: 'No.', xtype: 'rownumberer', width: 32}
                , {text: '序号', dataIndex: 'contentIndex', width: 60}
                , {
                    text: '类型', dataIndex: 'contentType', width: 120, renderer: function (v) {
                        var data = {
                            "BigImage": "段落大图",
                            "JustifyText": "段落文本",
                            "CenterText": "居中文本",
                            "ImageProduct": "作品预订",
                            "DoubleImage":"段落双图",
                        }
                        return data[v];
                    }
                }
                , {
                    text: '内容', dataIndex: 'contentValue', flex: 1, renderer: function (data) {
                        return data && JSON.stringify(data)
                    }
                }
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
			store: this.gridStore,
			columns: this.gridColumns
		};
		var mainPanel = {
			title: this.mainTitle,
			tbar:{
				xtype: 'toolbar',
				itemId: 'cmdToolBar',
				items: this.cmdToolbar
			},
			layout: 'fit',
			itemId: 'mainPanel',
			region: 'center',
			border: 1,
			margin : '-1 -1 2 -1',
			items:[gridView]
		};
    	var viewConfig = {
			layout: 'fit',
			items:[mainPanel]
		};
		this.doViewInitComponent(viewConfig);
		this.callParent(arguments);
	}
});