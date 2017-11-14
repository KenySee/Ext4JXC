Ext.define('Keer.store.PartStoryContent.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartStoryContent-storetreecheck',
	model: 'Keer.store.PartStoryContent.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
	}
});