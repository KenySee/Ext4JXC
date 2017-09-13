Ext.define('Keer.store.RoleModuleActionPermission.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.RoleModuleActionPermission-storetree',
	model: 'Keer.store.RoleModuleActionPermission.Model',
	constructor: function(cfg){
		this.callParent(arguments);
	}
});