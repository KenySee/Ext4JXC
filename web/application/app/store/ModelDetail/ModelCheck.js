Ext.define('Keer.store.ModelDetail.ModelCheck',{
	extend: 'Keer.store.ModelDetail.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});