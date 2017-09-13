Ext.define('Keer.store.EntityModel.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.EntityModel-store',
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