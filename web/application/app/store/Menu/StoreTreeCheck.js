Ext.define('Keer.store.Menu.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.Menu-storetreecheck',
	model: 'Keer.store.Menu.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({
			childs:null,
			actions:null,
			permissions:null
		});
	}
});