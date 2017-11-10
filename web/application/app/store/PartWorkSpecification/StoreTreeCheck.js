Ext.define('Keer.store.PartWorkSpecification.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartWorkSpecification-storetreecheck',
	model: 'Keer.store.PartWorkSpecification.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
	}
});