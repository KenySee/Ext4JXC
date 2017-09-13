Ext.define('Keer.store.EntityEnum.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.EntityEnum-storememory',
	model: 'Keer.store.EntityEnum.Model',
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