Ext.define('Keer.store.EntityModel.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.EntityModel-storememory',
	model: 'Keer.store.EntityModel.Model',
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