Ext.define('Keer.store.PartArticleContent.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartArticleContent-storetreecheck',
	model: 'Keer.store.PartArticleContent.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
	}
});