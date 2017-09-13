Ext.define('Keer.store.Widget.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.Widget-storetree',
	model: 'Keer.store.Widget.Model',
	constructor: function(cfg){
		this.callParent(arguments);
	}
});