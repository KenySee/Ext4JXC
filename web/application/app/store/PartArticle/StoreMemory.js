Ext.define('Keer.store.PartArticle.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.PartArticle-storememory',
	model: 'Keer.store.PartArticle.Model',
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