Ext.define('Keer.store.PartWorkContent.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.PartWorkContent-store',
	model: 'Keer.store.PartWorkContent.Model',
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