Ext.define('Keer.store.PortalItem.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PortalItem-storetreecheck',
	model: 'Keer.store.PortalItem.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
	}
});