Ext.define('Keer.store.Role.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.Role-storetreecheck',
	model: 'Keer.store.Role.ModelCheck',
	constructor: function(){
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