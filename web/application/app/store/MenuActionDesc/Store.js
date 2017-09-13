Ext.define('Keer.store.MenuActionDesc.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.MenuActionDesc-store',
	model: 'Keer.store.MenuActionDesc.Model',
	constructor: function(cfg){
		this.callParent(arguments);
	}
});