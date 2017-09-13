Ext.define('Keer.store.Role.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.Role-storetree',
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