Ext.define('Keer.store.PartArticleContent.ModelCheck',{
	extend: 'Keer.store.PartArticleContent.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});