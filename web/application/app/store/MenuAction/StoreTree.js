Ext.define('Keer.store.MenuAction.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.MenuAction-storetree',
	model: 'Keer.store.MenuAction.Model',
	constructor: function(cfg){
		this.callParent(arguments);
	}
});