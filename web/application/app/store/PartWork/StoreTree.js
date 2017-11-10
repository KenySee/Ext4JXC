Ext.define('Keer.store.PartWork.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartWork-storetree',
	model: 'Keer.store.PartWork.Model',
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
			specifications:null
		});
	}
});