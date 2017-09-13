Ext.define('Keer.store.Frame.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.Frame-storetree',
	model: 'Keer.store.Frame.Model',
	config: {
		exclude:{},
		actionMethod: 'findHomeMenu'
	},
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({parent:null,childs:null,permissions:null,permission:null,registers:null});
	}
});