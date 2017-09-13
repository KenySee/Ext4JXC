Ext.define('Keer.ui.${upfolder}.${appfolder}.container.mem.Container',{
	extend: 'Ext.container.Container',
	requires:[
		'Keer.store.${appfolder}.StoreMemory',
		'Keer.ui.${upfolder}.${appfolder}.container.mem.Grid'
	],
	controller: 'Keer.ui.${upfolder}.${appfolder}.container.mem.Controller',
	config: {
		store: '${appfolder}-storememory',
		storeConfig: {},
		toolbarItems: [],
		gridPlugins: [],
		gridConfig: {},
		gridType: null,
		gridDrag: null
	},
	initComponent: function(){
		var toolItems = this.getToolbarItems();
		var aliasStore = this.getStore();
		if (Ext.isString(aliasStore)){
			this.setStore(Ext.widget(aliasStore,this.getStoreConfig()));
		}
		var gridPanel = {
			xtype: Ext.String.format('${aliasPrefix}-${appfolder}-container-mem-grid'),
			store: this.getStore(),
			controller: this.getController(),
			border: 0,
			region: 'center',
			margin: '1 0 1 0',
			styleConfig:{},
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
		
		Ext.applyIf(gridPanel,this.getGridConfig());
		var plugins = this.getGridPlugins();
		Ext.each(plugins,function(plugin){
			gridPanel.plugins.push(plugin);
		});
		
		var fillPanel = {
			xtype: 'panel',
			layout: 'fit',
			border: 0,
			region: 'center',
			margin: '-1 -1 -1 -1',
			tbar: [],
			items:[gridPanel]
		};
		Ext.apply(this,{
			layout: 'fit',
			items: [fillPanel]
		});
		this.callParent(arguments);		
	}
});