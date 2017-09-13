Ext.define('Keer.store.UserMember.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.UserMember-storememory',
	model: 'Keer.store.UserMember.Model',
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