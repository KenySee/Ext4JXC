Ext.define('Keer.ui.core.Widget.MainContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-core-Widget-maincontainer',
	controller: 'Keer.ui.core.Widget.MainController',
	requires:[
		'Keer.store.Widget.Store',
		'Keer.store.Widget.Store',
		'Keer.ui.core.Widget.MainController'
	],	
	config:{
		canMulti: false,
		innerEdit: true,
		dragDrop: false,
		mainWidth: 220,
		mainHeight: 320,
		mainTitle: '部件',
		addWidth: 0,
		addHeight: 0,
		tabLayout: false,
		autoLayout: true,
		iconAlign: 'top',
		childAlign: 'right',
		navWidth: 220,
		navTitle: '部件类型',
		navPropName: 'name',
		formConfig:{itemId:'winform'},
		appParams:{}									
	},
	initConfig: function (config) {
		Ext.apply(config,{
			gridStore: config.store || Ext.widget('Widget-store',{
				controller:this.getController()
			}),
			navStore: Ext.widget('Widget-store',{
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
				]
			},
			cmdToolbar:[
				{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: this.iconAlign, privilege: 'ADD',mainEdit:'!editing',mainReady:'ready'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign: this.iconAlign, privilege: 'EDIT',mainEdit:'editing'},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: this.iconAlign, privilege: 'EDIT',mainEdit:'editing'},
				{text:'删除',itemId:'toolbar_remove',iconCls:'remove',iconAlign: this.iconAlign, disabled:true, privilege: 'DEL',mainRemove:'canRemove'},
				{text:'查看',itemId:'toolbar_edit',iconCls:'application_form_magnify',iconAlign: this.iconAlign, disabled:true, privilege: 'VIEW',mainView:'canView'},
				{text:'刷新',itemId:'toolbar_refresh',iconCls:'x-button-refresh',iconAlign: this.iconAlign, privilege: 'VIEW',mainEdit:'!editing',mainReady:'ready'}
			],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				,{text:'图标',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'}
				,{text:'部件名称',dataIndex:'name',width:100,editor:{xtype:'textfield'}}
				,{text:'部件类名',dataIndex:'classname',width:420,editor:{xtype:'textfield'}}
				,{text:'部件别名',dataIndex:'aliasname',width:320,editor:{xtype:'textfield'}}
			],
			navColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				,{text:'图标',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'}
				,{text:'部件类型',dataIndex:'name',width:100,editor:{xtype:'textfield'}}
			],
			navpagingtoolbar : {
				xtype: 'pagingtoolbar',
				store: this.navStore,
				displayInfo: true,
				dock: 'bottom',
				layout: 'hbox',
				displayMsg: '显示 {0} - {1} 条 共 {2} 条',
				emptyMsg: "没有记录"
			},
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
			xtype: 'widget-view-gridview',
			itemId: 'navView',
			border: 0,
			region: 'center',
			margin : '-1 -1 -1 -1',
			columns: this.navColumns,
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