Ext.define('Keer.store.Widget.ModelCheck',{
	extend: 'Keer.store.Widget.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});