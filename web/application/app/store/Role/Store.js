Ext.define('Keer.store.Role.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.Role-store',
	model: 'Keer.store.Role.Model',
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({
			bundlePermissions:null,
			modulePermissions:null,
			permissions:null,
			moduleActionPermissions:null,
			dataPermissions:null
		});
	}
});