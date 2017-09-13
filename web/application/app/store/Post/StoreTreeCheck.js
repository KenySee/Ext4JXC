Ext.define('Keer.store.Post.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.Post-storetreecheck',
	model: 'Keer.store.Post.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
	}
});