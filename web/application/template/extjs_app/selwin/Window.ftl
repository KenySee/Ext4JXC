Ext.define('Keer.ui.${upfolder}.${appfolder}.selwin.Window',{
	extend: 'Ext.window.Window',
	<#assign itemlist = toToolbarRequires()>
	requires: [
		<#list itemlist as item>
		'${item}',
		</#list>
		'Keer.store.${appfolder}.Store',
		'Keer.ui.${upfolder}.${appfolder}.selwin.Grid'
	],
	controller: 'Keer.ui.${upfolder}.${appfolder}.selwin.Controller',
	config: {
		store: '${appfolder}-store',
		storeConfig: {},
		gridPlugins: [],
		gridConfig: {},
		gridType: null,
		toolbarItems: [],
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
		var gridPanel = {
			xtype: Ext.String.format('${aliasPrefix}-${appfolder}-selwin-grid'),
			store: this.getStore(),
			controller: this.getController(),
			border: 0,
			margin: '1 0 1 0',
			styleConfig:{},
			plugins: [],
			tbar: toolItems
		};
		var gridType = this.getGridType();
		if (gridType){
			Ext.apply(gridPanel,{
				selModel: Ext.create('Ext.selection.CheckboxModel')
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
			region: 'center',
			border: 0,
			margin : '-5 -1 -1 -1',
			tbar: [],
			items:[gridPanel]
		};
		Ext.apply(this,{
			title: '选择'+this.getWinTitle(),
			width: this.getWinWidth(),
			height: this.getWinHeight(),
			layout: 'fit',
			modal: true,
			items: [fillPanel],
			buttons:[]
		});
		this.callParent(arguments);
	}
});