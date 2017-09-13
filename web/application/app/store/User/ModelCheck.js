Ext.define('Keer.store.User.ModelCheck',{
	extend: 'Keer.store.User.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});