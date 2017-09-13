Ext.define('Keer.store.MenuResource.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.MenuResource-storetree',
	model: 'Keer.store.MenuResource.Model',
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({
			permissions:null,
			actions:null,
			childs:null
		});
	}
});