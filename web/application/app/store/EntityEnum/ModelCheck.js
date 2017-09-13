Ext.define('Keer.store.EntityEnum.ModelCheck',{
	extend: 'Keer.store.EntityEnum.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});