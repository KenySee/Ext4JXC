Ext.define('Keer.store.PartStoryContent.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.PartStoryContent-store',
	model: 'Keer.store.PartStoryContent.Model',
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