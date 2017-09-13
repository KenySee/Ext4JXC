Ext.define('Keer.store.RoleModuleActionPermission.ModelCheck',{
	extend: 'Keer.store.RoleModuleActionPermission.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});