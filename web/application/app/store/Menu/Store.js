Ext.define('Keer.store.Menu.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.Menu-store',
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