Ext.define('Keer.store.ModelConfig.Store',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.ModelConfig-store',
	model: 'Keer.store.ModelConfig.Model',
	constructor: function(cfg){
		this.sorters = [{property : 'sortno',direction : 'ASC'}];
		this.callParent(arguments);
	}
});