Ext.define('Keer.store.PartArticle.ModelCheck',{
	extend: 'Keer.store.PartArticle.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});