Ext.define('Keer.store.Organization.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.Organization-storetree',
	model: 'Keer.store.Organization.Model',
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({
			orgRoles:null,
			parentOrgRoles:null,
			roles:null,
			childs:null
		});
	}
});