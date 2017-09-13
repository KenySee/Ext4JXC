Ext.define('Keer.store.comm.storeStore',{
	extend: 'Ext.data.Store',
	storeId: 'comm-storestore',
	alias: 'widget.comm-storestore',
	fields : [
		{name:'clazzname',type:'string'},
		{name:'aliasname',type:'string'},
		{name:'id',type:'auto'},
		{name:'sortno',type:'string'},
		{name:'status',type:'auto'},
		{name:'version'},
		{name:'privilegeMap'},
		{name:'code',type:'string'},
		{name:'classname',type:'string'},
		{name:'remark',type:'string'},
		{name:'modifyFlag',type:'string'},
		{name:'createdTime',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'indexCls',type:'string'},
		{name:'name',type:'string'}
	],
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
		extraParams: {clazzname:'com.keer.core.bean.model.WidgetStore'},
		url : 'WidgetAction!findAll.action'
	}
});