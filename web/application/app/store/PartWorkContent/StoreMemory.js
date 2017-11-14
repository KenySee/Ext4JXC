Ext.define('Keer.store.PartWorkContent.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.PartWorkContent-storememory',
	model: 'Keer.store.PartWorkContent.Model',
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