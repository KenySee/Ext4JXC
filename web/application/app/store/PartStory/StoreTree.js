Ext.define('Keer.store.PartStory.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartStory-storetree',
	model: 'Keer.store.PartStory.Model',
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