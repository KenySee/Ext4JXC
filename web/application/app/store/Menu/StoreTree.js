Ext.define('Keer.store.Menu.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.Menu-storetree',
	model: 'Keer.store.Menu.Model',
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({
			childs:null,
			actions:null,
			permissions:null
		});
	}
});