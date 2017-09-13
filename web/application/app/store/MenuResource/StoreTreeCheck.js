Ext.define('Keer.store.MenuResource.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.MenuResource-storetreecheck',
	model: 'Keer.store.MenuResource.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({
			permissions:null,
			actions:null,
			childs:null
		});
	}
});