Ext.define('Keer.store.ModelDetail.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.ModelDetail-storetreecheck',
	model: 'Keer.store.ModelDetail.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
	}
});