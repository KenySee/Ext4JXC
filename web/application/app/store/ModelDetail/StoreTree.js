Ext.define('Keer.store.ModelDetail.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.ModelDetail-storetree',
	model: 'Keer.store.ModelDetail.Model',
	constructor: function(){
		this.callParent(arguments);
	}
});