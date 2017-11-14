Ext.define('Keer.store.PartWorkContent.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartWorkContent-storetreecheck',
	model: 'Keer.store.PartWorkContent.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
	}
});