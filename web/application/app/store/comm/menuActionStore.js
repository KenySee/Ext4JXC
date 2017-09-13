Ext.define('Keer.store.comm.menuActionStore',{
	extend: 'Ext.data.Store',
	storeId: 'comm-menuActionstore',
	alias: 'widget.comm-menuActionstore',
	fields: ['id','actionDesc','actionType','version','clazzname'],
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
		url : 'MenuActionAction!findActionList.action'
	}
});