Ext.define('Keer.store.PartReserve.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartReserve-storetreecheck',
	model: 'Keer.store.PartReserve.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
	}
});