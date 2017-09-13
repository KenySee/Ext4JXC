Ext.define('Keer.store.User.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.User-store',
	model: 'Keer.store.User.Model',
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({
			userMembers:null
		});
	}
});