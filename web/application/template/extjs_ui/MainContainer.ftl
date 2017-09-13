Ext.define('Keer.ui.${upfolder}.${appfolder}.MainContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-${aliasPrefix}-${appfolder}-maincontainer',
	controller: 'Keer.ui.${upfolder}.${appfolder}.MainController',
	requires:[
		<#list toToolbarRequires() as item>
		'${item}',
		</#list>
		<#list toColumnRequires() as item>
		'${item}',
		</#list>
		<#if layout?lower_case == 'form'>
		<#list toFieldRequires() as item>
		'${item}',
		</#list>
		</#if>
		<#if layout?lower_case == 'gridnav'>
		<#list categoryNav.toColumnRequires() as item>
		'${item}',
		</#list>
		</#if>
		'Keer.store.${appfolder}.Store',
		<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
		'Keer.store.${categoryNav.appfolder}.Store<#if (layout == 'treenav')>Tree</#if>',
		</#if>
		'Keer.ui.${upfolder}.${appfolder}.MainController'
	],	
	config:{
		canMulti: false,
		innerEdit: <#if grid?lower_case == 'popup'>false<#else>true</#if>,
		dragDrop: false,
		mainWidth: 220,
		mainHeight: 320,
		mainTitle: <#if layout?lower_case == 'grid'>null<#else>'${name}'</#if>,
		addWidth: 0,
		addHeight: 0,
		tabLayout: false,
		autoLayout: true,
		iconAlign: 'top',
		childAlign: 'right',
		<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
		navWidth: 220,
		navTitle: '${categoryNav.name}',
		navPropName: '${categoryNav.displayField}',
		</#if>
		formConfig:{itemId:'winform'},
		appParams:{}									
	},
	initConfig: function (config) {
		<#if layout?lower_case == 'grid'>
		Ext.apply(config,{
			<#list toChildHiddenModel() as item>
			${item.dataIndex}Store: Ext.widget('${item.editor.childStore.aliasname}',{
				controller:this.getController()
			}),
			</#list>
			gridStore: config.store || Ext.widget('${appfolder}-store',{
				controller:this.getController()
			})
		});
		</#if>
		<#if layout?lower_case == 'form'>
		Ext.apply(config,{
			<#list toChildHiddenModel() as item>
			${item.dataIndex}Store: Ext.widget('${item.editor.childStore.aliasname}',{
				controller:this.getController()
			}),
			</#list>
			gridStore: config.store || Ext.widget('${appfolder}-store',{
				controller:this.getController()
			})
		});
		</#if>
		<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
		Ext.apply(config,{
			gridStore: config.store || Ext.widget('${appfolder}-store',{
				controller:this.getController()
			}),
			navStore: Ext.widget('${categoryNav.appfolder}-store<#if (layout == 'treenav')>tree</#if>',{
				controller:this.getController()
			})
		});
		</#if>
		if(config.store) config.store = null;
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
			cmdToolbar:[
				{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: this.iconAlign, privilege: 'ADD',mainEdit:'!editing'<#if layout?lower_case != 'form'>,mainReady:'ready'</#if>},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign: this.iconAlign, privilege: 'EDIT',mainEdit:'editing'<#if grid?lower_case == 'popup'>,hidden:true</#if>},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: this.iconAlign, privilege: 'EDIT',mainEdit:'editing'<#if grid?lower_case == 'popup'>,hidden:true</#if>},
				{text:'删除',itemId:'toolbar_remove',iconCls:'remove',iconAlign: this.iconAlign, disabled:true, privilege: 'DEL',mainRemove:'canRemove'<#if layout?lower_case == 'form'>,mainAdd:'!adding'</#if>}<#if layout?lower_case != 'form'>,</#if>
				<#if layout?lower_case != 'form'>
				{text:'查看',itemId:'toolbar_edit',iconCls:'application_form_magnify',iconAlign: this.iconAlign, disabled:true, privilege: 'VIEW',mainView:'canView'},
				{text:'刷新',itemId:'toolbar_refresh',iconCls:'x-button-refresh',iconAlign: this.iconAlign, privilege: 'VIEW',mainEdit:'!editing',mainReady:'ready'}
				</#if>
			],
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32}
				<#list toColumnConfig() as item>
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
			<#if layout?lower_case == 'form'>
			formFields:[
				<#list toFieldConfig() as item>
				${item}<#if item_has_next>,</#if>
				</#list>
			],
			</#if>
			<#if layout?lower_case == 'listnav' || layout?lower_case == 'gridnav'>
			navpagingtoolbar : {
				xtype: 'pagingtoolbar',
				store: this.navStore,
				displayInfo: true,
				dock: 'bottom',
				layout: 'hbox',
				displayMsg: '显示 {0} - {1} 条 共 {2} 条',
				emptyMsg: "没有记录"
			},
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
			title: this.mainTitle,
			<#if layout?lower_case != 'form'>
			tbar:{
				xtype: 'toolbar',
				itemId: 'cmdToolBar',
				items: this.cmdToolbar
			},
			<#else>
			tbar: {xtype: 'toolbar',hidden: true,itemId: 'navToolBar',items:[]},
			tools :[
				{itemId: 'toolbar_refresh',type: 'refresh',tooltip:'刷新'}
			],
			</#if>
			layout: 'fit',
			itemId: 'mainPanel',
			<#if layout?lower_case == 'form'>
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
			<#else>
			region: 'center',
			border: 1,
			margin : '-1 -1 2 -1',
			</#if>
			items:[gridView]
		};
		<#if layout?lower_case == 'grid'>
    	var viewConfig = {
			layout: 'fit',
			items:[mainPanel]
		};
		</#if>
		<#if layout?lower_case == 'form'>
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
			mainEdit: '!editing',
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
			<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
			bbar: this.navpagingtoolbar,
			</#if>
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
			items:[navPanel,mainPanel]
		};		
		</#if>
		this.doViewInitComponent(viewConfig);
		this.callParent(arguments);
	}
});