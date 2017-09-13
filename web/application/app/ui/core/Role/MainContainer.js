Ext.define('Keer.ui.core.Role.MainContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-core-Role-maincontainer',
	controller: 'Keer.ui.core.Role.MainController',
	requires:[
		'Keer.widget.field.CollectionHidden',
		'Keer.ui.core.Role.RoleModuleActionPermission.ChildContainer',
		'Keer.store.RoleModuleActionPermission.Store',
		'Keer.store.Role.Store',
		'Keer.ui.core.Role.MainController'
	],	
	config:{
		canMulti: false,
		innerEdit: true,
		dragDrop: false,
		mainWidth: 220,
		mainHeight: 320,
		mainTitle: '角色管理',
		addWidth: 0,
		addHeight: 0,
		tabLayout: false,
		autoLayout: true,
		iconAlign: 'top',
		childAlign: 'right',
		formConfig:{itemId:'winform'},
		appParams:{}									
	},
	initConfig: function (config) {
		Ext.apply(config,{
			moduleActionPermissionsStore: Ext.widget('RoleModuleActionPermission-store',{
				controller:this.getController()
			}),
			gridStore: config.store || Ext.widget('Role-store',{
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
				{text:'新增',itemId:'toolbar_add',xtype:'widget-button-classbutton',store:this.gridStore,iconCls:'add',iconAlign: this.iconAlign, privilege: 'ADD',mainEdit:'!editing'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign: this.iconAlign, privilege: 'EDIT',mainEdit:'editing'},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: this.iconAlign, privilege: 'EDIT',mainEdit:'editing'},
				{text:'删除',itemId:'toolbar_remove',iconCls:'remove',iconAlign: this.iconAlign, disabled:true, privilege: 'DEL',mainRemove:'canRemove',mainAdd:'!adding'}
			],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				,{text:'图标',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'}
				,{text:'角色名称',dataIndex:'name',width:140}
			],
			formFields:[
				{fieldLabel:'角色编号',name:'code',itemId:'code',dataIndex:'code',xtype:'textfield',addFocus:'adding'},
				{fieldLabel:'角色名称',name:'name',itemId:'name',dataIndex:'name',xtype:'textfield'},
				{fieldLabel:'角色备注',name:'remark',itemId:'remark',dataIndex:'remark',xtype:'textarea',fullLine:true},
				{fieldLabel:'模块动作',name:'moduleActionPermissions',itemId:'moduleActionPermissions',dataIndex:'moduleActionPermissions',loadSync:false,writeSync:true,store:this.moduleActionPermissionsStore,xtype:'widget-field-collectionhidden',xcontainer:'ui-core-Role-RoleModuleActionPermission-childcontainer'}
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
			column: 2,
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