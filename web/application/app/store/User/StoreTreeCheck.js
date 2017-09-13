Ext.define('Keer.store.User.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.User-storetreecheck',
	model: 'Keer.store.User.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({
			userMembers:null
		});
	}
});