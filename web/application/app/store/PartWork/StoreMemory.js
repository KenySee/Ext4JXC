Ext.define('Keer.store.PartWork.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.PartWork-storememory',
	model: 'Keer.store.PartWork.Model',
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