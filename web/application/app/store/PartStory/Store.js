Ext.define('Keer.store.PartStory.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.PartStory-store',
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