Ext.define('Keer.store.PartWorkContent.ModelCheck',{
	extend: 'Keer.store.PartWorkContent.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});