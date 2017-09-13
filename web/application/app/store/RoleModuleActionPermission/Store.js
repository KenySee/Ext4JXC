Ext.define('Keer.store.RoleModuleActionPermission.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.RoleModuleActionPermission-store',
	model: 'Keer.store.RoleModuleActionPermission.Model',
	constructor: function(cfg){
		this.callParent(arguments);
	}
});