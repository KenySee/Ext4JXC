Ext.define('Keer.store.PortalItem.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.PortalItem-store',
	model: 'Keer.store.PortalItem.Model',
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