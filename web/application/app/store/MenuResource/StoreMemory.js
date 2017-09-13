Ext.define('Keer.store.MenuResource.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.MenuResource-storememory',
	model: 'Keer.store.MenuResource.Model',
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