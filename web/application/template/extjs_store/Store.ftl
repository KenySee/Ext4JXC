Ext.define('Keer.store.${appfolder}.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.${appfolder}-store',
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