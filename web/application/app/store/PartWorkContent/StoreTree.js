Ext.define('Keer.store.PartWorkContent.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartWorkContent-storetree',
	model: 'Keer.store.PartWorkContent.Model',
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