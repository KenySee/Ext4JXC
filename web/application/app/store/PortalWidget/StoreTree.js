Ext.define('Keer.store.PortalWidget.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PortalWidget-storetree',
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