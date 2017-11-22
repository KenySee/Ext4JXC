Ext.define('Keer.store.PartReserve.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.PartReserve-store',
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