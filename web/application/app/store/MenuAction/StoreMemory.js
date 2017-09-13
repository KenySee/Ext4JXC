Ext.define('Keer.store.MenuAction.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.MenuAction-storememory',
	model: 'Keer.store.MenuAction.Model',
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