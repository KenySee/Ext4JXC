Ext.define('Keer.ui.core.Organization.MainContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-core-Organization-maincontainer',
	controller: 'Keer.ui.core.Organization.MainController',
	requires:[
		'Keer.widget.field.ObjectTrigger',
		'Keer.ui.selwin.Post.FindWindow',
		'Keer.ui.selwin.Role.FindWindow',
		'Keer.ui.selwin.Organization.FindWindow',
		'Keer.ui.core.Organization.MainController',
		'Keer.store.Organization.Store',
		'Keer.store.Organization.StoreTree'
	],
	//【混入功能】
	mixins : {
	},
	config: {
		canMulti: false,
		innerEdit: true,
		dragDrop: true,
		appParams:{}
	},
	initConfig: function (config) {
		Ext.apply(config,{
			navStore: Ext.widget('Organization-storetree',{
				controller:this.getController()
			}),
			gridStore: Ext.widget('Organization-store',{
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
				items: [
					{fieldLabel:'机构名称',name:'name',itemId:'name',dataIndex:'name',labelWidth:60,xtype:'textfield'},
					{fieldLabel:'用户编号',name:'loginname',itemId:'loginname',dataIndex:'loginname',labelWidth:80,xtype:'textfield'}
				]
			},			
			cmdToolbar:[
				{text:'新增',itemId:'toolbar_add',xtype:'widget-button-classbutton',store:this.gridStore,iconCls:'add',iconAlign: 'top', privilege: 'ADD',mainEdit:'!editing',mainReady:'ready'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign:'top', privilege: 'EDIT',mainEdit:'editing'},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: 'top', privilege: 'EDIT',mainEdit:'editing'},
				{text:'查看',itemId:'toolbar_edit',iconCls:'application_form_magnify',iconAlign: 'top', disabled:true, privilege: 'VIEW',mainView:'canView'},
				{text:'删除',itemId:'toolbar_remove',iconCls:'remove',iconAlign: 'top', privilege: 'DEL', disabled:true, privilege: 'DEL',mainRemove:'canRemove'},
				{text:'刷新',itemId:'toolbar_refresh',iconCls:'x-button-refresh',iconAlign: 'top', privilege: 'VIEW',mainEdit:'!editing',mainReady:'ready'}
			],
			gridColumns:[
				{text:'图标',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'},
				{text:'机构编号',dataIndex:'code',width:80,editor:{xtype:'textfield'}},
				{text:'机构名称',dataIndex:'name',flex:1,editor:{xtype:'textfield'}},
				{text:'所属公司',dataIndex:'corporation',width:120,renderer:this.enumRender(null,'name')},
				{text:'所属部门',dataIndex:'department',width:120,renderer:this.enumRender(null,'name')},
				{text:'所属岗位',dataIndex:'post',width:120,editor:{xtype:'widget-field-objecttrigger',xwindow:'ui-selwin-Post-findwindow',displayField:'name',dataIndex:'post'},renderer:this.enumRender(null,'name')},
				{text:'机构角色',dataIndex:'role',width:100,hidden:!Keer.systemvar.OrgRole,editor:{xtype:'widget-field-objecttrigger',xwindow:'ui-selwin-Role-findwindow',displayField:'name',dataIndex:'role'},renderer:this.enumRender(null,'name')},
				{text:'上级机构',dataIndex:'parent',width:120,editor:{xtype:'widget-field-objecttrigger',xwindow:'ui-selwin-Organization-findwindow',displayField:'name',dataIndex:'parent'},renderer:this.enumRender(null,'name')}	
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
		var navView = {
			xtype: 'treepanel',
			itemId: 'navView',
			layout: 'fit',
			border: 0,
			displayField : 'name',
			folderSort : true,
			useArrows: true,
			header: false,
			margin : '-1 -1 -1 -1',
			rootVisible: false,
			store:  this.navStore
		};
		var navPanel = {
			xtype: 'panel',
			itemId: 'navPanel',
			iconCls: 'application_side_tree',
			title: '机构',
			layout: 'fit',
			margin : '-1 0 2 -1',
			minWidth : 0,
			width : 220,
			region : 'west',
			collapsible : false,
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
			layout: 'fit',
			tbar:{
				xtype: 'toolbar',
				itemId: 'cmdToolBar',
				items: this.cmdToolbar
			},
			itemId: 'mainPanel',
			region: 'center',
			border: 1,
			margin : '-1 -1 2 -1',
			items:[gridView]
		};
		var viewConfig = {
			layout: 'border',
			items:[navPanel,mainPanel]
		};
		this.doViewInitComponent(viewConfig);
		this.callParent(arguments);
	}
});