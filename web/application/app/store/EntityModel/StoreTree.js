Ext.define('Keer.store.EntityModel.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.EntityModel-storetree',
	model: 'Keer.store.EntityModel.Model',
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({
			permissions:null,
			columns:null,
			details:null
		});
	}
});