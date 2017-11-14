Ext.define('Keer.store.PartArticleContent.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.PartArticleContent-store',
	model: 'Keer.store.PartArticleContent.Model',
	config: {
		exclude:{},
		actionUrl: null,
		actionBean: null,
		actionMethod: null,
		controller: null
	},
    sorters: [{
        property: 'contentIndex',
        direction: 'ASC'
    }],
	buildProxy: function(proxy){
		return proxy;
	},	
	constructor: function(cfg){
		this.callParent(arguments);
	}
});