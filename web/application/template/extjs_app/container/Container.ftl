Ext.define('Keer.ui.${upfolder}.${appfolder}.container.Container',{
	extend: 'Ext.container.Container',
	<#assign itemlist = toToolbarRequires()>
	requires:[
		<#list itemlist as item>
		'${item}',
		</#list>
		'Keer.store.${appfolder}.Store',
		'Keer.ui.${upfolder}.${appfolder}.container.Grid'
	],
	controller: 'Keer.ui.${upfolder}.${appfolder}.container.Controller',
	config: {
		navContainer: null,
		childContainer: null,
		store: '${appfolder}-store',
		storeConfig: {},
		toolbarItems: [],
		gridPlugins: [],
		gridConfig: {},
		gridType: null,
		gridDrag: null
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
		var gridPanel = {
			xtype: Ext.String.format('${aliasPrefix}-${appfolder}-container-grid'),
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
			layout: 'fit',
			items: [fillPanel]
		});
		var navPanel = this.getNavContainer();
		if (navPanel){
			Ext.apply(this,{
				layout: 'border',
				items: [navPanel,fillPanel]
			});
		}
		this.callParent(arguments);		
	}
});