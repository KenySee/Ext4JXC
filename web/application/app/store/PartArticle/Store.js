Ext.define('Keer.store.PartArticle.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.PartArticle-store',
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