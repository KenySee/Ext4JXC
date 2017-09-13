Ext.define('Keer.store.MenuActionDesc.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.MenuActionDesc-storememory',
	model: 'Keer.store.MenuActionDesc.Model',
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