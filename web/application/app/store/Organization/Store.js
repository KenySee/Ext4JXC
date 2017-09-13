Ext.define('Keer.store.Organization.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.Organization-store',
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