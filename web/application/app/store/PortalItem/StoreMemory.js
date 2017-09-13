Ext.define('Keer.store.PortalItem.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.PortalItem-storememory',
	model: 'Keer.store.PortalItem.Model',
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