Ext.define('Keer.ui.core.MenuResource.MainContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-core-MenuResource-maincontainer',
	controller: 'Keer.ui.core.MenuResource.MainController',
	requires:[
		'Keer.widget.field.ObjectTrigger',
		'Keer.ui.selwin.MenuResource.FindWindow',
		'Keer.store.MenuResource.StoreTree',
		'Keer.ui.core.MenuResource.MainController'
	],	
	config:{
		canMulti: false,
		innerEdit: true,
		dragDrop: true,
		mainWidth: 220,
		mainHeight: 320,
		addWidth: 0,
		addHeight: 0,
		tabLayout: false,
		autoLayout: true,
		iconAlign: 'top',
		childAlign: 'right',
		navWidth: 220,
		navTitle: '菜单资源',
		navPropName: 'name',
		formConfig:{itemId:'winform'},
		appParams:{}									
	},
	initConfig: function (config) {
		Ext.apply(config,{
			gridStore: Ext.widget('MenuResource-store',{
				controller:this.getController()
			}),
			navStore: Ext.widget('MenuResource-storetree',{
				controller:this.getController()
			})
		});
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:{
				xtype: 'querybar',
				store: this.gridStore,
				items: []
			},
			cmdToolbar:[
				{text:'新增',itemId:'toolbar_add',xtype:'widget-button-classbutton',store:this.gridStore,iconCls:'add',iconAlign: this.iconAlign, privilege: 'ADD',mainEdit:'!editing'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign: this.iconAlign, privilege: 'EDIT',mainEdit:'editing'},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: this.iconAlign, privilege: 'EDIT',mainEdit:'editing'},
				{text:'删除',itemId:'toolbar_remove',iconCls:'remove',iconAlign: this.iconAlign, disabled:true, privilege: 'DEL',mainReady:'ready',mainRemove:'canRemove'},
				{text:'查看',itemId:'toolbar_edit',iconCls:'application_form_magnify',iconAlign: this.iconAlign, disabled:true, privilege: 'VIEW',mainView:'canView',mainReady:'ready'},
				{text:'刷新',itemId:'toolbar_refresh',iconCls:'x-button-refresh',iconAlign: this.iconAlign, privilege: 'VIEW',mainReady:'ready'}
			],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				,{text:'图标',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'}
				,{text:'菜单名称',dataIndex:'name',width:80,editor:{xtype:'textfield'}}
				,{text:'菜单图标',dataIndex:'iconUrl',width:80,editor:{xtype:'textfield'}}
				,{text:'菜单URL',dataIndex:'url',width:280,editor:{xtype:'textfield'}}
				,{text:'模块类名',dataIndex:'clazzAction',width:260,editor:{xtype:'textfield'}}
				,{text:'上级资源',dataIndex:'parent',width:100,editor:{xtype:'widget-field-objecttrigger',xwindow:'ui-selwin-MenuResource-findwindow',displayField:'name',dataIndex:'parent'},renderer:this.enumRender(null,'name')}
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