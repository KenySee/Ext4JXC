Ext.define('Keer.store.PartWorkSpecification.ModelCheck',{
	extend: 'Keer.store.PartWorkSpecification.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});