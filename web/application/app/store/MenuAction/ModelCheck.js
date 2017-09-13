Ext.define('Keer.store.MenuAction.ModelCheck',{
	extend: 'Keer.store.MenuAction.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});