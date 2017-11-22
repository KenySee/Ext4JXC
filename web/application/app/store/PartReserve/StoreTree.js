Ext.define('Keer.store.PartReserve.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartReserve-storetree',
	model: 'Keer.store.PartReserve.Model',
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