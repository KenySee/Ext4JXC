Ext.define('Keer.store.PortalWidget.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PortalWidget-storetreecheck',
	model: 'Keer.store.PortalWidget.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({
			items:null
		});
	}
});