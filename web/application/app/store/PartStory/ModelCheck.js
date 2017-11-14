Ext.define('Keer.store.PartStory.ModelCheck',{
	extend: 'Keer.store.PartStory.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});