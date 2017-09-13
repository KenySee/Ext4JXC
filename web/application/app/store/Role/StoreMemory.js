Ext.define('Keer.store.Role.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.Role-storememory',
	model: 'Keer.store.Role.Model',
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