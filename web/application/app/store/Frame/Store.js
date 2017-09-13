Ext.define('Keer.store.Frame.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.Frame-store',
	model: 'Keer.store.Frame.Model',
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({childs:null,permissions:null,permission:null});
	}
});