Ext.define('Keer.store.Menu.ModelCheck',{
	extend: 'Keer.store.Menu.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});