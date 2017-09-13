Ext.define('Keer.store.EntityEnum.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.EntityEnum-storetree',
	model: 'Keer.store.EntityEnum.Model',
	constructor: function(cfg){
		this.callParent(arguments);
	}
});