Ext.define('Keer.store.PortalResource.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.PortalResource-store',
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