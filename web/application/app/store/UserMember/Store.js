Ext.define('Keer.store.UserMember.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.UserMember-store',
	model: 'Keer.store.UserMember.Model',
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({
			roles:null,
			orgRoles:null,
			childs:null,
			parentOrgRoles:null
		});
	}
});