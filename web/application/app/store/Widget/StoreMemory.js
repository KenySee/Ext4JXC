Ext.define('Keer.store.Widget.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.Widget-storememory',
	model: 'Keer.store.Widget.Model',
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