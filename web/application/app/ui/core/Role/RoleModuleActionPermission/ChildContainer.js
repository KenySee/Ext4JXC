Ext.define('Keer.ui.core.Role.RoleModuleActionPermission.ChildContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-core-Role-RoleModuleActionPermission-childcontainer',
	controller: 'Keer.ui.core.Role.RoleModuleActionPermission.ChildController',
	requires:[
		'Keer.store.RoleModuleActionPermission.Store',
		'Keer.store.MenuResource.Store',
		'Keer.store.MenuResource.StoreTreeCheck',
		'Keer.widget.field.EnumCombo',
		'Keer.widget.button.ClassButton',
		'Keer.store.comm.clazzScopeStore',
		'Keer.ui.core.Role.RoleModuleActionPermission.ChildController'
	],	
	config:{
		canMulti: false,
		innerEdit: true,
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
		navTitle: '菜单资源',
		navPropName: 'name',
		formConfig:{itemId:'winform'},
		appParams:{}									
	},
	initConfig: function (config) {
		Ext.apply(config,{
			gridStore: config.store || Ext.widget('RoleModuleActionPermission-store',{
				controller:this.getController()
			}),
			navStore: Ext.widget('MenuResource-storetreecheck',{
				controller:this.getController()
			}),
			menuStore: Ext.widget('MenuResource-store',{
				actionMethod: 'findMenusByRole',
				actionBean: '',
				controller:this.getController()
			}),
			scopeStore: Ext.widget('comm-clazzScopestore')
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
				]
			},
			cmdToolbar:[
				{text:'新增',itemId:'toolbar_add',xtype:'widget-button-classbutton',store:this.gridStore,iconCls:'add',iconAlign: this.iconAlign, privilege: 'ADD',childAdd:'canAdd',disabled:true},
				{text:'删除',itemId:'toolbar_remove',iconCls:'remove',iconAlign: this.iconAlign, disabled:true, privilege: 'DEL',childRemove:'canRemove'},
				{text:'查看',itemId:'toolbar_edit',iconCls:'application_form_magnify',iconAlign: this.iconAlign, disabled:true, hidden:true, privilege: 'VIEW',childView:'canView'}
			],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				,{text:'模块名称',dataIndex:'menu',width:160,renderer:this.enumRender(null,'name')}
				,{text:'模块动作',dataIndex:'actionType',width:80}
				,{text:'访问范围',dataIndex:'clazzScope',width:180,editor:{xtype:'widget-field-enumcombo',store:this.scopeStore,displayField:'name',dataIndex:'clazzScope'},renderer:this.enumRender(this.scopeStore)}
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
		var navView = {
			xtype: 'treepanel',
			itemId: 'navView',
			mainReady: 'ready',
			layout: 'fit',
			border: 0,
			displayField : this.navPropName,
			folderSort : true,
			useArrows: true,
			header: false,
			margin : '-1 -1 -1 -1',
			rootVisible: false,
			store: this.navStore			
		};
    	var navPanel = {
			xtype: 'panel',
			itemId: 'navPanel',
			iconCls: 'application_side_tree',
			title: this.navTitle,
			childEdit: '!editing',
			layout: 'fit',
			region : 'west',
			border: 1,
			margin : '-1 0 2 -1',
			minWidth : 0,
			width : this.navWidth,
			collapseMode: 'mini',
			collapsible : true,
			collapsed : false,
			hideCollapseTool : true,
			maintainFlex : true,
			split : true,
			deferRowRender:true,
			autoScroll : false,
			tools :[
				{itemId: 'toolnav_expand',type: 'expand',tooltip:'展开'},
				{itemId: 'toolnav_collapse',type: 'collapse',tooltip:'收缩'},
				{itemId: 'toolnav_refresh',type: 'refresh',tooltip:'刷新'}
			],
			tbar: {xtype: 'toolbar',hidden: true,itemId: 'navToolBar',items:[]},
			items:[navView]	
		};
		var viewConfig = {
			layout: 'border',
			items:[navPanel,mainPanel]
		};
		this.doViewInitComponent(viewConfig);
		this.callParent(arguments);
	}
});