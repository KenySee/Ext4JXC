Ext.define('Keer.store.Role.ModelCheck',{
	extend: 'Keer.store.Role.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});