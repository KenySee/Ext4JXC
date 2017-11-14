Ext.define('Keer.store.PartWork.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.PartWork-store',
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
			specifications:null,
			contents:null
		});
	}
});