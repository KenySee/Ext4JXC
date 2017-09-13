Ext.define('Keer.store.UserMember.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.UserMember-storetreecheck',
	model: 'Keer.store.UserMember.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({
			orgRoles:null,
			childs:null,
			parentOrgRoles:null
		});
	}
});