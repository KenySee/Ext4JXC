Ext.define('Keer.ui.${upfolder}.${appfolder}.selwin.list.Window',{
	extend: 'Ext.window.Window',
	<#assign itemlist = toToolbarRequires()>
	requires: [
		<#list itemlist as item>
		'${item}',
		</#list>
		'Keer.app.view.widget.Panel',
		'Keer.store.${appfolder}.Store',
		<#if appfolder != categoryNav.appfolder>
		'Keer.store.${categoryNav.appfolder}.Store',
		</#if>
		'Keer.ui.${upfolder}.${appfolder}.selwin.list.Grid'
	],
	controller: 'Keer.ui.${upfolder}.${appfolder}.selwin.list.Controller',
	config: {
		store: '${appfolder}-store',
		listStore: '${categoryNav.appfolder}-store',
		listTitle: '${categoryNav.name}分组',
		listAlias: 'dataview',
		listDisplayfield: 'name',
		listStoreConfig: {},
		navConfig: {},
		storeConfig: {},
		gridPlugins: [],
		gridConfig: {},
		gridType: null,
		toolbarItems: [],
		gridTitle: '${name}',
		winTitle: '${name}',
		winWidth: 640,
		winHeight: 420
	},
	initComponent: function(){
		var toolItems = this.getToolbarItems();
		if (toolItems.length == 0){
			toolItems = [
				<#list toToolbarConfig() as item>
				${item}<#if item_has_next>,</#if>
				</#list>
			];
		}
		var aliasStore = this.getStore();
		if (Ext.isString(aliasStore)){
			var config = this.getStoreConfig();
			Ext.apply(config,{
				actionMethod: 'searchBeans'
			});
			this.setStore(Ext.widget(aliasStore,this.getStoreConfig()));
		}
		var aliasListStore = this.getListStore();
		if (Ext.isString(aliasListStore)){
			this.setListStore(Ext.widget(aliasListStore,this.getListStoreConfig()));
		}
		var listPanel = {
			xtype: 'app-view-widget-panel',
			styleConfig: {
				minWidth : 0,
				width : 180,
				region : 'west',
				placeholder : {
					xtype : 'box'
				},
				collapsible : true,
				collapsed : false,
				hideCollapseTool : true,
				maintainFlex : true,
				split : true,
				autoScroll : false
			},
			layout: 'fit',
			region: 'west',
			title: this.getListTitle(),
			margin : '-1 0 2 -1',
			tools :[{
				itemId : 'refresh',
				type : 'refresh' 
			}],
			items:[{
				xtype: 'dataview',
				trackOver: true,
				autoScroll: true,
				cls: 'nav-list',
            	itemSelector: '.nav-list-item',
            	overItemCls: 'nav-list-item-hover',
            	tpl: Ext.String.format('<tpl for="."><div class="nav-list-item">{{0}}</div></tpl>',this.getListDisplayfield()),
				store:  this.getListStore()
			}]
		};
		Ext.applyIf(gridPanel,this.getNavConfig());

		var gridPanel = {
			xtype: Ext.String.format('${aliasPrefix}-${appfolder}-selwin-list-grid'),
			border: 0,
			margin: '1 0 1 0',
			tbar: toolItems,
			store: this.getStore(),
			controller: this.getController()
		};
		var gridType = this.getGridType();
		if (gridType){
			Ext.apply(gridPanel,{
				selModel: Ext.create('Ext.selection.CheckboxModel')
			});
		}
		Ext.applyIf(gridPanel,this.getGridConfig());
		
		var fillPanel = {
			title: this.getGridTitle(),
			xtype: 'panel',
			layout: 'fit',
			region: 'center',
			margin : '-1 -1 2 0',
			tbar:[],
			items:[gridPanel]
		};
		Ext.apply(this,{
			title: '选择'+this.getWinTitle(),
			width: this.getWinWidth(),
			height: this.getWinHeight(),
			layout: 'border',
			modal: true,
			items: [listPanel,fillPanel],
			buttons: []
		});
		this.callParent(arguments);
	}
});