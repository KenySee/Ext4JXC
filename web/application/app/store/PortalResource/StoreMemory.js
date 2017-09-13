Ext.define('Keer.store.PortalResource.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.PortalResource-storememory',
	model: 'Keer.store.PortalResource.Model',
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