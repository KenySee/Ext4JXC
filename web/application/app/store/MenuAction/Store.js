Ext.define('Keer.store.MenuAction.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.MenuAction-store',
	model: 'Keer.store.MenuAction.Model',
	constructor: function(cfg){
		this.callParent(arguments);
	}
});