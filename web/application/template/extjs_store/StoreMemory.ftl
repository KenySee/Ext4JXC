Ext.define('Keer.store.${appfolder}.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.${appfolder}-storememory',
	model: 'Keer.store.${appfolder}.Model',
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