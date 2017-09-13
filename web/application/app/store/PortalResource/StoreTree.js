Ext.define('Keer.store.PortalResource.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PortalResource-storetree',
	model: 'Keer.store.PortalResource.Model',
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
			childs:null,
			permissions:null
		});
	}
});