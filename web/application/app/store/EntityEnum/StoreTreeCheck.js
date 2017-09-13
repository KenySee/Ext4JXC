Ext.define('Keer.store.EntityEnum.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.EntityEnum-storetreecheck',
	model: 'Keer.store.EntityEnum.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
	}
});