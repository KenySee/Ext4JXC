Ext.define('Keer.store.Editor.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.Editor-storetree',
	model: 'Keer.store.Editor.Model',
	constructor: function(cfg){
		this.callParent(arguments);
	}
});