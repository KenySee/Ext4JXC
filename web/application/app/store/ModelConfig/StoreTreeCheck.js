Ext.define('Keer.store.ModelConfig.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.ModelConfig-storetreecheck',
	model: 'Keer.store.ModelConfig.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
	}
});