Ext.define('Keer.store.EntityModel.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.EntityModel-storetreecheck',
	model: 'Keer.store.EntityModel.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({
			permissions:null,
			columns:null,
			details:null
		});
	}
});