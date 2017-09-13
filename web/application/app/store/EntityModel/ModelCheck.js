Ext.define('Keer.store.EntityModel.ModelCheck',{
	extend: 'Keer.store.EntityModel.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});