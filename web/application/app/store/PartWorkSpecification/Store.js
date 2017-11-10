Ext.define('Keer.store.PartWorkSpecification.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.PartWorkSpecification-store',
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