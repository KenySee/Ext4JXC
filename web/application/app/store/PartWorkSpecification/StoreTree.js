Ext.define('Keer.store.PartWorkSpecification.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartWorkSpecification-storetree',
	model: 'Keer.store.PartWorkSpecification.Model',
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