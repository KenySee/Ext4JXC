Ext.define('Keer.widget.core.MainContainer',{
	extend: 'Ext.container.Container',
	requires:[
		'Keer.widget.view.Panel',
		'Keer.widget.view.Tree',
		'Keer.widget.view.Grid',
		'Keer.widget.toolbar.QueryToolbar'
	],
	//【混入功能】
	mixins : {
		EnumRender: 'Keer.widget.mixin.EnumRender'
	},	
	//【成员变量】
	config:{
		navTitle: '树列表',
		showType: 'grid',	//窗口显示方式('gridnav':Grid导航,'treenav':Tree导航,'listnav':List导航,'grid':单个Grid)
		canMulti: false,				//是否允许多选
		dragDrop: false,				//是否拖动排序
		querybar: [],					//查询toolbar
		pagingtoolbar: [],				//分页toolbar
		navpagingtoolbar: [],			//分页toolbar
		navPropName: 'name',			//navModel标题属性名
		navAlias: 'widget-view-panel',	//navPanel别名
		gridAlias: 'widget-view-gridview',	//gridPanel别名
		navConfig: {},					//navView配置参数
		gridConfig: {},					//gridView配置参数
		navPanelConfig: {},				//navPanel配置参数
		gridPanelConfig: {},			//gridPanel配置参数
		navStoreConfig: {},				//navStore配置参数
		gridStoreConfig: {},			//gridStore配置参数
		navStore: null,					//树型Store 子类必须指定
		gridStore: null,				//列表Store 子类必须指定
		gridColumns:[],					//Grid列定义  子类必须指定
		addColumns:[],					//Grid附加列定义
		navColumns:[],					//NavGrid列定义
		appParams:{} 					//控制器参数
	},
	//【构造方法】
	constructor: function (config) {
		config = config || {};
		this.initConfig(config);
		if (config.appParams){
			//初始化控制器参数
			var controller = this.getController();
			Ext.apply(controller,config.appParams.initParam);
		}		
		var navAlias = this.getNavStore();
		if (Ext.isString(navAlias)){
			var showType = this.getShowType();
			if (showType == 'listnav' || showType == 'gridnav'){
				navAlias = navAlias.substr(0,navAlias.length-4);
			}
			else {
				var canMulti = this.getCanMulti();
				if (canMulti){
					navAlias += 'check';
				}			
			}
			config = config || {};
			config.appParams = config.appParams || {};
			var params = {
				navParams: config.appParams.navParams || {},
				controller: this.getController()
			};
			Ext.apply(params,this.getNavStoreConfig());
			this.setNavStore(Ext.widget(navAlias,params));
		}
		var grid = this.getGridStore();
		if (Ext.isString(grid)){
			var params = this.getGridStoreConfig();
			Ext.apply(params,{controller: this.getController()});
			this.setGridStore(Ext.widget(grid,params));
		}
		if (config.appParams){
			Ext.apply(controller,{
				navStore: this.getNavStore(),
				gridStore: this.getGridStore(),
				callController: config.appParams.callController
			});
		}		
        this.callParent(arguments);
    },
	initComponent: function(){
		var viewConfig = {
    		id: this.id,
			items: this.items
		};
		if (!viewConfig.items || viewConfig.items.length == 0){
			var querybar = this.getQuerybar();
			var showType = this.getShowType();
			var canMulti = this.getCanMulti();
			var navProp = this.getNavPropName();
			var pagingtoolbar = this.getPagingtoolbar();
			if (pagingtoolbar && pagingtoolbar.length == 0){
				pagingtoolbar = {
					xtype: 'pagingtoolbar',
					store: this.getGridStore(),
					displayInfo: true,
					dock: 'bottom',
					layout: 'hbox',
					displayMsg: '显示 {0} - {1} 条 共 {2} 条',
					emptyMsg: "没有记录"
				};
			}
			var navpagingtoolbar = showType != 'treenav' ? this.getPagingtoolbar() : null;
			if (navpagingtoolbar && navpagingtoolbar.length == 0){
				navpagingtoolbar = {
					xtype: 'pagingtoolbar',
					store: this.getNavStore(),
					displayInfo: true,
					dock: 'bottom',
					layout: 'hbox',
					displayMsg: '显示 {0} - {1} 条 共 {2} 条',
					emptyMsg: "没有记录"
				};
			}
			var navView = {};
			if (showType == 'gridnav'){
				var navColumns = this.getNavColumns();
				navColumns.unshift({text:'No.',xtype: 'rownumberer',width:32});
				navView = {
					xtype: this.getGridAlias(),
					itemId: 'mainNavView',
					border: 0,
					region: 'center',
					margin : '-1 -1 -1 -1',
					columns: navColumns,
					finalConfig: this.getNavConfig(),
					store: this.getNavStore()
				};
			}
			else if (showType == 'listnav'){
				navView = {
					xtype: 'dataview',
					itemId: 'mainNavView',
					trackOver: true,
					autoScroll: true,
					cls: 'nav-list',
			        itemSelector: '.nav-list-item',
			        overItemCls: 'nav-list-item-hover',
			        tpl: Ext.String.format('<tpl for="."><div class="nav-list-item">{{0}}</div></tpl>',navProp),
					store:  this.getNavStore()
				};
			}
			else {
				navView = {
					xtype: this.getNavAlias(),
					itemId: 'mainNavView',
					layout: 'fit',
					border: 0,
					displayField : navProp,
					header: false,
					margin : '-1 -1 -1 -1',
					rootVisible: showType == 'grid',
					finalConfig: this.getNavConfig(),
					store:  this.getNavStore()
				};				
			}
			var navPanel = {
				xtype: 'widget-view-panel',
				itemId: 'mainNavPanel',
				iconCls: 'application_side_tree',
				title: this.getNavTitle(),
				layout: 'fit',
				margin : '-1 0 2 -1',
				hidden: showType == 'grid',
				tools :[
					{itemId: 'mainExpandTool',type: 'expand',tooltip:'展开',hidden:showType!='treenav'},
					{itemId: 'mainCollapseTool',type: 'collapse',tooltip:'收缩',hidden:showType!='treenav'},
					{itemId: 'mainRefreshTool',type: 'refresh',tooltip:'刷新'}
				],
				tbar: {
					xtype: 'toolbar',
					itemId: 'mainNavToolbar',
					items:[]
				},
				bbar: navpagingtoolbar,
				finalConfig: this.getNavPanelConfig(),
				items:[navView]	
			};
			var gridColumns = this.getGridColumns();
			gridColumns.unshift({text:'No.',xtype: 'rownumberer',width:32});
			var gridPanel = {
				xtype: this.getGridAlias(),
				itemId: 'mainGridView',
				border: 0,
				tbar:querybar,
				selModel: canMulti ? Ext.create('Ext.selection.CheckboxModel') : null,
				region: 'center',
				margin: '1 0 1 0',
				store: this.getGridStore(),
				bbar: pagingtoolbar,
				columns: gridColumns,
				finalConfig: this.getGridConfig(),
				plugins: [
					Ext.create('Ext.grid.plugin.CellEditing', {
						pluginId: 'cellplugin',
					    clicksToEdit: 2
					})
				]
			};
			var dragDrop = this.getDragDrop();
			if (dragDrop){
				Ext.apply(gridPanel,{
					viewConfig : {
						plugins : {
							ptype : 'gridviewdragdrop',
							dragText : 'Drag and drop to reorganize'
						},
						listeners : {
							drop : function(node, data, overModel, dropPosition, dropHandlers) {
								var store = overModel.store;
								var sortno = 1;
								store.each(function(item) {
									item.set('sortno',Ext.String.leftPad(sortno, 5, '0'));
									sortno += 1;
								});
							}
						}
					}
				});		
			}
			
			var mainPanel = {
				xtype: 'panel',
				itemId: 'mainGridPanel',
				iconCls: showType == 'grid' ? null : 'application_view_list',
				layout: 'fit',
				region: 'center',
				margin : '-1 -1 2 -1',
				tbar: {
					xtype: 'toolbar',
					itemId: 'mainCmdToolbar',
					items:[]
				},
				finalConfig: this.getGridPanelConfig(),
				items:[gridPanel]
			};
			Ext.apply(viewConfig,{
				layout: 'border',
				items: [navPanel,mainPanel]
			});			
		}
		var controller = this.getController();
		if (controller){
			controller.doViewInitComponent(viewConfig);
		}
		Ext.apply(this,viewConfig);
		this.callParent(arguments);
	}
});