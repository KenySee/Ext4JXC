Ext.define('Keer.store.Post.ModelCheck',{
	extend: 'Keer.store.Post.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});