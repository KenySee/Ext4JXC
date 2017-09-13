Ext.define('Keer.store.comm.clazzScopeStore',{
	extend: 'Ext.data.Store',
	storeId: 'comm-clazzScopestore',
	alias: 'widget.comm-clazzScopestore',
	fields: [{name:'id', type: 'string'},'name'],
	autoLoad: false,
	proxy : {
		type : 'ajax',
		reader : {
			type : 'json',
			root : 'data',
			successProperty : 'success'
		},
		actionMethods: {
		    create : 'POST',
		    read   : 'POST',
		    update : 'POST',
		    destroy: 'POST'
    	},
		url : 'AccessScopeAction!findAll.action'
	}
});