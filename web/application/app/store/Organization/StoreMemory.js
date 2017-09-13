Ext.define('Keer.store.Organization.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.Organization-storememory',
	model: 'Keer.store.Organization.Model',
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