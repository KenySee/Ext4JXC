Ext.define('Keer.store.MenuGroup.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.MenuGroup-storetreecheck',
	model: 'Keer.store.MenuGroup.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({
			permissions:null,
			childs:null
		});
	}
});