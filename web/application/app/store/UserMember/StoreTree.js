Ext.define('Keer.store.UserMember.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.UserMember-storetree',
	model: 'Keer.store.UserMember.Model',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({
			roles:null,
			orgRoles:null,
			childs:null,
			parentOrgRoles:null
		});
	}
});