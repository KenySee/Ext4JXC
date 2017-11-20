Ext.define('Keer.store.PartHomeSwiper.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.PartHomeSwiper-store',
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