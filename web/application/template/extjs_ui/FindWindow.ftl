Ext.define('Keer.ui.${upfolder}.${appfolder}.FindWindow',{
	extend: 'Keer.widget.view.FindWindow',
	alias: 'widget.ui-${aliasPrefix}-${appfolder}-findwindow',
	controller: 'Keer.ui.${upfolder}.${appfolder}.FindController',
	requires:[
		<#list toToolbarRequires() as item>
		'${item}',
		</#list>
		<#list toCommonRequires() as item>
		'${item}',
		</#list>
		<#if layout?lower_case == 'gridnav'>
		<#list categoryNav.toColumnRequires() as item>
		'${item}',
		</#list>
		</#if>
		'Keer.store.${appfolder}.Store',
		<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
		'Keer.store.${categoryNav.appfolder}.Store<#if (layout == 'treenav')>Tree</#if>',
		</#if>
		'Keer.ui.${upfolder}.${appfolder}.FindController'
	],	
	config:{
		canMulti: false,
		innerEdit: false,
		dragDrop: false,
		mainWidth: 220,
		mainHeight: 320,
		addWidth: 0,
		addHeight: 0,
		tabLayout: false,
		autoLayout: true,
		iconAlign: 'top',
		childAlign: 'right',
		navWidth: 220,
		navStoreConfig:{},
		gridStoreConfig:{},
		winTitle: '${name}',
		navTitle: '${categoryNav.name}',
		navPropName: '${categoryNav.displayField}',
		appParams:{}									
	},
	initConfig: function (config) {
		config.gridStoreConfig = config.gridStoreConfig || {};
		Ext.apply(config.gridStoreConfig,{
			controller:this.getController()
		});
		<#if layout?lower_case == 'grid'>
		Ext.apply(config,{
			gridStore: Ext.widget('${appfolder}-store',config.gridStoreConfig)
		});
		</#if>
		<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
		config.navStoreConfig = config.navStoreConfig || {};
		Ext.apply(config.navStoreConfig,{
			controller:this.getController()
		});
		Ext.apply(config,{
			gridStore: Ext.widget('${appfolder}-store',config.gridStoreConfig),
			navStore: Ext.widget('${categoryNav.appfolder}-store<#if (layout == 'treenav')>tree</#if>',config.navStoreConfig)
		});
		</#if>
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:{
				xtype: 'querybar',
				store: this.gridStore,
				items: [
				<#list toToolbarConfig() as item>
				${item}<#if item_has_next>,</#if>
				</#list>
				]
			},
			cmdToolbar:[],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				<#list toCommonConfig() as item>
				<#if item == 'indexCls'>
				,{text:'图标',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'}
				<#else>
				,${item}
				</#if>
				</#list>
			],
			<#if layout?lower_case == 'gridnav'>
			navColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				<#list categoryNav.toColumnConfig() as item>
				<#if item == 'indexCls'>
				,{text:'图标',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'}
				<#else>
				,${item}
				</#if>
				</#list>
			],
			</#if>
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
				hidden: true,
				items: this.cmdToolbar
			},
			layout: 'fit',
			itemId: 'mainPanel',
			region: 'center',
			border: 1,
			margin : '-1 -1 2 -1',
			items:[gridView]
		};
		<#if layout?lower_case == 'grid'>
    	var viewConfig = {
			layout: 'fit',
			title: this.winTitle,
			width: 640 + this.addWidth,
			height: 420 + this.addHeight,
			modal: true,
			buttons:[],
			items:[mainPanel]
		};
		</#if>
    	<#if layout?lower_case == 'listnav'>
    	var navView = {
			xtype: 'widget-view-dataview',
			itemId: 'navView',
			displayField: this.navPropName,
			store:  this.navStore			
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
			title: this.winTitle,
			width: 640 + this.addWidth,
			height: 420 + this.addHeight,
			modal: true,
			buttons:[],
			items:[navPanel,mainPanel]
		};
		</#if>
		<#if layout?lower_case == 'treenav'>
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
			title: this.winTitle,
			width: 640 + this.addWidth,
			height: 420 + this.addHeight,
			modal: true,
			buttons:[],
			items:[navPanel,mainPanel]
		};
		</#if>		
		<#if layout?lower_case == 'gridnav'>
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
			title: this.winTitle,
			width: 640 + this.addWidth,
			height: 420 + this.addHeight,
			modal: true,
			buttons:[],
			items:[navPanel,mainPanel]
		};		
		</#if>
		this.doViewInitComponent(viewConfig);
		this.callParent(arguments);
	}
});