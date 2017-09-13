Ext.define('Keer.store.MenuGroup.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.MenuGroup-storetree',
	model: 'Keer.store.MenuGroup.Model',
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({
			permissions:null,
			childs:null
		});
	}
});