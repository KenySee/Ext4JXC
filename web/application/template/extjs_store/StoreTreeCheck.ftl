Ext.define('Keer.store.${appfolder}.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.${appfolder}-storetreecheck',
	model: 'Keer.store.${appfolder}.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
		<#assign itemlist = toModelCollect()>
		<#if (itemlist?size > 0)>
		this.setExclude({
			<#list itemlist as item>
			${item}:null<#if item_has_next>,</#if>
			</#list>
		});
		</#if>
	}
});