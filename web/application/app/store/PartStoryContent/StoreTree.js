Ext.define('Keer.store.PartStoryContent.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartStoryContent-storetree',
	model: 'Keer.store.PartStoryContent.Model',
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