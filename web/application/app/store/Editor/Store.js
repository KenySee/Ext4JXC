Ext.define('Keer.store.Editor.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.Editor-store',
	model: 'Keer.store.Editor.Model',
	constructor: function(cfg){
		this.callParent(arguments);
	}
});