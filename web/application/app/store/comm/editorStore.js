Ext.define('Keer.store.comm.editorStore',{
	extend: 'Ext.data.Store',
	storeId: 'comm-editorstore',
	alias: 'widget.comm-editorstore',
	fields: [{name:'id', type: 'int'},'version','clazzname','name','colField'],
	autoLoad: true,
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
		extraParams: {node:'root'},
		url : 'EditorAction!findAll.action'
	}
});