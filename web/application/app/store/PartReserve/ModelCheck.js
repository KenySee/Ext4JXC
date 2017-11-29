Ext.define('Keer.store.PartReserve.ModelCheck',{
	extend: 'Keer.store.PartReserve.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});