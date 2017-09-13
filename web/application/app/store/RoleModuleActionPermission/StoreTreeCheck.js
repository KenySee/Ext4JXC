Ext.define('Keer.store.RoleModuleActionPermission.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.RoleModuleActionPermission-storetreecheck',
	model: 'Keer.store.RoleModuleActionPermission.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
	}
});