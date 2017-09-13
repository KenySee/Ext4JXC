Ext.define('Keer.store.PortalWidget.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.PortalWidget-store',
	model: 'Keer.store.PortalWidget.Model',
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
			items:null
		});
	}
});