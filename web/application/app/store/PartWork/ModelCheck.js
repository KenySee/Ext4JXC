Ext.define('Keer.store.PartWork.ModelCheck',{
	extend: 'Keer.store.PartWork.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});