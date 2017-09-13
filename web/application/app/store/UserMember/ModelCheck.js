Ext.define('Keer.store.UserMember.ModelCheck',{
	extend: 'Keer.store.UserMember.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});