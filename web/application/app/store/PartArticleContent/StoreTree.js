Ext.define('Keer.store.PartArticleContent.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartArticleContent-storetree',
	model: 'Keer.store.PartArticleContent.Model',
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