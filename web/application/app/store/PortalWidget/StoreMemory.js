Ext.define('Keer.store.PortalWidget.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.PortalWidget-storememory',
	model: 'Keer.store.PortalWidget.Model',
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