Ext.define('Keer.store.Menu.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.Menu-storememory',
	model: 'Keer.store.Menu.Model',
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