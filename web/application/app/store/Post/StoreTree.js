Ext.define('Keer.store.Post.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.Post-storetree',
	model: 'Keer.store.Post.Model',
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({
			roles:null
		});
	}
});