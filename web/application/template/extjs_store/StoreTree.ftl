Ext.define('Keer.store.${appfolder}.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.${appfolder}-storetree',
	model: 'Keer.store.${appfolder}.Model',
	config: {
		exclude:{},
		actionUrl: null,
		actionBean: null,
		actionMethod: null,
		controller: null
	},
	buildProxy: function(proxy){
		return proxy;
	},		
	constructor: function(cfg){
		this.callParent(arguments);
		<#assign itemlist = toModelAllCollect()>
		<#if (itemlist?size > 0)>
		this.setExclude({
			<#list itemlist as item>
			${item}:null<#if item_has_next>,</#if>
			</#list>
		});
		</#if>
	}
});