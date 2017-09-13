Ext.define('Keer.store.Post.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.Post-storememory',
	model: 'Keer.store.Post.Model',
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