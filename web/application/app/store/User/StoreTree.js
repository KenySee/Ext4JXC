Ext.define('Keer.store.User.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.User-storetree',
	model: 'Keer.store.User.Model',
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({
			userMembers:null
		});
	}
});