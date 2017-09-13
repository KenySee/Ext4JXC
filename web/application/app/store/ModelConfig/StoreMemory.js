Ext.define('Keer.store.ModelConfig.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.ModelConfig-storememory',
	model: 'Keer.store.ModelConfig.Model',
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