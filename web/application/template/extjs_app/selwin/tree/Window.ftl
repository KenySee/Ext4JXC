Ext.define('Keer.ui.${upfolder}.${appfolder}.selwin.tree.Window',{
	extend: 'Ext.window.Window',
	<#assign itemlist = toToolbarRequires()>
	requires: [
		<#list itemlist as item>
		'${item}',
		</#list>
		'Keer.app.view.widget.Tree',
		'Keer.store.${appfolder}.Store',
		'Keer.store.${categoryNav.appfolder}.StoreTree',
		'Keer.ui.${upfolder}.${appfolder}.selwin.tree.Grid'
	],
	controller: 'Keer.ui.${upfolder}.${appfolder}.selwin.tree.Controller',
	config: {
		store: '${appfolder}-store',
		treeStore: '${categoryNav.appfolder}-storetree',
		treeTitle: '${categoryNav.name}分组',
		treeAlias: 'app-view-widget-tree',
		treeConfig: {},
		storeConfig: {},
		treeStoreConfig: {},
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
		var aliasTreeStore = this.getTreeStore();
		if (Ext.isString(aliasTreeStore)){
			this.setTreeStore(Ext.widget(aliasTreeStore,this.getTreeStoreConfig()));
		}
		var treePanel = {
			xtype: this.getTreeAlias(),
			title: this.getTreeTitle(),
			region: 'west',
			margin : '-1 0 2 -1',
			store:  this.getTreeStore()
		};
		Ext.applyIf(treePanel,this.getTreeConfig());

		var gridPanel = {
			xtype: Ext.String.format('${aliasPrefix}-${appfolder}-selwin-tree-grid'),
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
			items: [treePanel,fillPanel],
			buttons: []
		});
		this.callParent(arguments);
	}
});