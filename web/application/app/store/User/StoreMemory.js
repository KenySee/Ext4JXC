Ext.define('Keer.store.User.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.User-storememory',
	model: 'Keer.store.User.Model',
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