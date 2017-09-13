Ext.define('Keer.store.Post.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.Post-store',
	model: 'Keer.store.Post.Model',
	constructor: function(cfg){
		this.callParent(arguments);
		this.setExclude({
			roles:null
		});
	}
});