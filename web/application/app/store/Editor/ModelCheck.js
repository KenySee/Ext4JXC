Ext.define('Keer.store.Editor.ModelCheck',{
	extend: 'Keer.store.Editor.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});