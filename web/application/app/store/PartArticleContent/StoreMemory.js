Ext.define('Keer.store.PartArticleContent.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.PartArticleContent-storememory',
	model: 'Keer.store.PartArticleContent.Model',
	constructor: function(){
		this.proxy = {
			type : 'memory',
			reader : {
				type : 'json',
				root : 'data',
				totalProperty : 'totalCount',
				successProperty : 'success'
			}
		};
		this.callParent(arguments);
	}
});