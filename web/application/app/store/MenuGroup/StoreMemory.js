Ext.define('Keer.store.MenuGroup.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.MenuGroup-storememory',
	model: 'Keer.store.MenuGroup.Model',
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