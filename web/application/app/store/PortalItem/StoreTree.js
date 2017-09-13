Ext.define('Keer.store.PortalItem.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PortalItem-storetree',
	model: 'Keer.store.PortalItem.Model',
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
	}
});