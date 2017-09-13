Ext.define('Keer.ui.${upfolder}.${appfolder}.container.tree.Container',{
	extend: 'Ext.container.Container',
	<#assign itemlist = toToolbarRequires()>
	requires:[
		<#list itemlist as item>
		'${item}',
		</#list>
		'Keer.app.view.widget.Tree',
		'Keer.store.${appfolder}.Store',
		'Keer.store.${categoryNav.appfolder}.StoreTree',
		'Keer.ui.${upfolder}.${appfolder}.container.tree.Grid'
	],
	controller: 'Keer.ui.${upfolder}.${appfolder}.container.tree.Controller',
	config: {
		childContainer: null,
		store: '${appfolder}-store',
		treeStore: '${categoryNav.appfolder}-storetree',
		treeTitle: '${categoryNav.name}分组',
		treeAlias: 'app-view-widget-tree',
		expandTools: true,
		treeStoreConfig: {},
		navConfig: {},
		storeConfig: {},
		gridPlugins: [],
		gridConfig: {},
		gridType: null,
		gridDrag: null,
		toolbarItems: []
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
			finalConfig: this.getNavConfig(),
			store:  this.getTreeStore()
		};
		var expandTools = this.getExpandTools();
		if (expandTools){
			Ext.apply(treePanel,{
				tbar:[
						{text:'展开',iconCls: 'x-button-expandall',tooltip:'全部展开',handler: function(){ 
								var tree = this.up('panel');
								if (tree){
									tree.expandAll();
								}
							}
						},
						{text:'折叠',iconCls: 'x-button-collapseall',tooltip:'全部折叠',handler: function(){ 
								var tree = this.up('panel');
								if (tree){
									tree.collapseAll();
								}
							}
						}
		            ]
			});
		}
		
		var gridPanel = {
			xtype: Ext.String.format('${aliasPrefix}-${appfolder}-container-tree-grid'),
			border: 0,
			region: 'center',
			margin: '1 0 1 0',
			store: this.getStore(),
			controller: this.getController(),
			tbar: toolItems,
			plugins: [
				Ext.create('Ext.grid.plugin.CellEditing', {
					pluginId: 'cellplugin',
				    clicksToEdit: 2
				})
			]
		};
		var gridType = this.getGridType();
		if (gridType){
			Ext.apply(gridPanel,{
				selModel: Ext.create('Ext.selection.CheckboxModel')
			});
		}
		Ext.applyIf(gridPanel,this.getGridConfig());
		
		var gridDrag = this.getGridDrag();
		if (gridDrag){
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
								item.set('sortno', sortno);
								sortno += 1;
							});
						}
					}
				}
			});
		}
		var plugins = this.getGridPlugins();
		Ext.each(plugins,function(plugin){
			gridPanel.plugins.push(plugin);
		});
		
		var fillPanel = {
			xtype: 'panel',
			layout: 'fit',
			region: 'center',
			margin : '-1 -1 2 0',
			tbar: [],
			items:[gridPanel]
		};
		var childPanel = this.getChildContainer();
		if (childPanel){
			fillPanel = {
				xtype: 'panel',
				layout: 'border',
				region: 'center',
				margin : '-1 -1 2 0',
				tbar: [],
				items:[gridPanel,childPanel]
			};
		}
		Ext.apply(this,{
			layout: 'border',
			items: [treePanel,fillPanel]
		});
		this.callParent(arguments);	
	}
});