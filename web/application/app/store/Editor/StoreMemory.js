Ext.define('Keer.store.Editor.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.Editor-storememory',
	model: 'Keer.store.Editor.Model',
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