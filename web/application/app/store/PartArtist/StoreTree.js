Ext.define('Keer.store.PartArtist.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartArtist-storetree',
	model: 'Keer.store.PartArtist.Model',
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
		this.setExclude({
			works:null,
			storys:null,
			articles:null
		});
	}
});