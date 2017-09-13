Ext.define('Keer.store.MenuResource.ModelCheck',{
	extend: 'Keer.store.MenuResource.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});