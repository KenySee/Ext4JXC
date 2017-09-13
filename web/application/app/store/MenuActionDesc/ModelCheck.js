Ext.define('Keer.store.MenuActionDesc.ModelCheck',{
	extend: 'Keer.store.MenuActionDesc.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});