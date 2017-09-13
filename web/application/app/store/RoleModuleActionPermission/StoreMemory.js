Ext.define('Keer.store.RoleModuleActionPermission.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.RoleModuleActionPermission-storememory',
	model: 'Keer.store.RoleModuleActionPermission.Model',
	constructor: function(){
		this.proxy = {
			type : 'memory',
			reader : {
				type : 'json',
				root : 'data',
				totalProperty : 'totalCount',
				successProperty : 'success'
			}
		};
		this.callParent(arguments);
	}
});