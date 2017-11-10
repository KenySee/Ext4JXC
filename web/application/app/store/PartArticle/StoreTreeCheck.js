Ext.define('Keer.store.PartArticle.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartArticle-storetreecheck',
	model: 'Keer.store.PartArticle.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
	}
});