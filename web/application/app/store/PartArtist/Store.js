Ext.define('Keer.store.PartArtist.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.PartArtist-store',
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
			articles:null
		});
	}
});