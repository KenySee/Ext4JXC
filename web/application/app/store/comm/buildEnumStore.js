Ext.define('Keer.store.comm.buildEnumStore',{
	extend: 'Ext.data.Store',
	storeId: 'comm-buildEnum-store',
	alias: 'widget.comm-buildEnum-store',
	fields: [{name:'id', type: 'string'},'data','clazz'],
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
		url : 'EntityEnumAction!buildEnumStore.action'
	}
});