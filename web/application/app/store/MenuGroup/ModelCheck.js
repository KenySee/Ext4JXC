Ext.define('Keer.store.MenuGroup.ModelCheck',{
	extend: 'Keer.store.MenuGroup.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});