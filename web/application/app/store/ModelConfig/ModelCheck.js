Ext.define('Keer.store.ModelConfig.ModelCheck',{
	extend: 'Keer.store.ModelConfig.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});