Ext.define('Keer.store.MenuGroup.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.MenuGroup-store',
	model: 'Keer.store.MenuGroup.Model',
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({
			permissions:null,
			childs:null
		});
	}
});