Ext.define('Keer.store.ModelDetail.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.ModelDetail-store',
	model: 'Keer.store.ModelDetail.Model',
	constructor: function(){
		this.callParent(arguments);
	}
});