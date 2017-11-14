Ext.define('Keer.store.PartStoryContent.ModelCheck',{
	extend: 'Keer.store.PartStoryContent.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});