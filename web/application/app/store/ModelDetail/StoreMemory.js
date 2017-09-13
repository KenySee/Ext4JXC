Ext.define('Keer.store.ModelDetail.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.ModelDetail-storememory',
	model: 'Keer.store.ModelDetail.Model',
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