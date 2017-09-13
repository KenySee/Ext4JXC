Ext.define('Keer.store.MenuActionDesc.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.MenuActionDesc-storetree',
	model: 'Keer.store.MenuActionDesc.Model',
	constructor: function(cfg){
		this.callParent(arguments);
	}
});