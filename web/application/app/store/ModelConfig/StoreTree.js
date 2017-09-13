Ext.define('Keer.store.ModelConfig.StoreTree',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.ModelConfig-storetree',
	model: 'Keer.store.ModelConfig.Model',
	constructor: function(cfg){
		this.callParent(arguments);
	}
});