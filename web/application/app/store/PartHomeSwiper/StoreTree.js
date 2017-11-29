Ext.define('Keer.store.PartHomeSwiper.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartHomeSwiper-storetree',
	model: 'Keer.store.PartHomeSwiper.Model',
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