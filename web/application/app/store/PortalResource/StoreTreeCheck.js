Ext.define('Keer.store.PortalResource.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PortalResource-storetreecheck',
	model: 'Keer.store.PortalResource.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({
			childs:null,
			permissions:null
		});
	}
});