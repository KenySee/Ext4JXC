Ext.define('Keer.store.Organization.ModelCheck',{
	extend: 'Keer.store.Organization.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});