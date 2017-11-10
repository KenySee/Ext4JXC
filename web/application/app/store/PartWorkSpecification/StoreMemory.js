Ext.define('Keer.store.PartWorkSpecification.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.PartWorkSpecification-storememory',
	model: 'Keer.store.PartWorkSpecification.Model',
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