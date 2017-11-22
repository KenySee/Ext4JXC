Ext.define('Keer.store.PartReserve.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.PartReserve-storememory',
	model: 'Keer.store.PartReserve.Model',
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