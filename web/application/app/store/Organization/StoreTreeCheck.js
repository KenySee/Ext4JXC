Ext.define('Keer.store.Organization.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.Organization-storetreecheck',
	model: 'Keer.store.Organization.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({
			orgRoles:null,
			parentOrgRoles:null,
			childs:null
		});
	}
});