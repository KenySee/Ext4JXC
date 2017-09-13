Ext.define('Keer.ui.${upfolder}.${appfolder}.container.grid.Container',{
	extend: 'Ext.container.Container',
	<#assign itemlist = toToolbarRequires()>
	requires:[
		'Keer.app.view.widget.List',
		<#list itemlist as item>
		'${item}',
		</#list>
		'Keer.store.${appfolder}.Store',
		<#if appfolder != categoryNav.appfolder>
		'Keer.store.${categoryNav.appfolder}.Store',
		</#if>
		'Keer.ui.${upfolder}.${appfolder}.container.grid.Grid'
	],
	controller: 'Keer.ui.${upfolder}.${appfolder}.container.grid.Controller',
	config: {
		childContainer: null,
		store: '${appfolder}-store',
		gridStore: '${categoryNav.appfolder}-store',
		gridTitle: '${categoryNav.name}分组',
		gridAlias: 'app-view-widget-list',
		gridColumns: [],
		navConfig: {},
		gridStoreConfig: {},
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
		var gridColumns = this.getGridColumns();
		if (gridColumns.length == 0){
			gridColumns = [
				
			];
		}
		var aliasStore = this.getStore();
		if (Ext.isString(aliasStore)){
			this.setStore(Ext.widget(aliasStore,this.getStoreConfig()));
		}
		var aliasGridStore = this.getGridStore();
		if (Ext.isString(aliasGridStore)){
			this.setGridStore(Ext.widget(aliasGridStore,this.getGridStoreConfig()));
		}
		var navPanel = {
			xtype: this.getGridAlias(),
			title: this.getGridTitle(),
			region: 'west',
			margin : '-1 0 2 -1',
			controller: this.getController(),
			columns: gridColumns,
			finalConfig: this.getNavConfig(),
			store:  this.getGridStore()
		};
		
		var gridPanel = {
			xtype: Ext.String.format('${aliasPrefix}-${appfolder}-container-grid-grid'),
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
			items: [navPanel,fillPanel]
		});
		this.callParent(arguments);	
	}
});