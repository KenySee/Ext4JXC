Ext.define('Keer.store.EntityEnum.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.EntityEnum-store',
	model: 'Keer.store.EntityEnum.Model',
	constructor: function(cfg){
		this.callParent(arguments);
	}
});