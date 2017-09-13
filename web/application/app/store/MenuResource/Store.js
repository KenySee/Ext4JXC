Ext.define('Keer.store.MenuResource.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.MenuResource-store',
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