Ext.define('Keer.store.PartArticle.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartArticle-storetree',
	model: 'Keer.store.PartArticle.Model',
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
			contents:null
		});
	}
});