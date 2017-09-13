Ext.define('Keer.store.Widget.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.Widget-store',
	model: 'Keer.store.Widget.Model',
	constructor: function(cfg){
		this.callParent(arguments);
	}
});