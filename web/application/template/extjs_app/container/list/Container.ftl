Ext.define('Keer.ui.${upfolder}.${appfolder}.container.list.Container',{
	extend: 'Ext.container.Container',
	<#assign itemlist = toToolbarRequires()>
	requires:[
		<#list itemlist as item>
		'${item}',
		</#list>
		'Keer.app.view.widget.Panel',
		'Keer.store.${appfolder}.Store',
		<#if appfolder != categoryNav.appfolder>
		'Keer.store.${categoryNav.appfolder}.Store',
		</#if>
		'Keer.ui.${upfolder}.${appfolder}.container.list.Grid'
	],
	controller: 'Keer.ui.${upfolder}.${appfolder}.container.list.Controller',
	config: {
		childContainer: null,
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
			finalConfig: this.getNavConfig(),
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
		
		var gridPanel = {
			xtype: Ext.String.format('${aliasPrefix}-${appfolder}-container-list-grid'),
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
			items: [listPanel,fillPanel]
		});
		this.callParent(arguments);	
	}
});