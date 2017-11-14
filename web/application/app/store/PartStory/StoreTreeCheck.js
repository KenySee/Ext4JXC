Ext.define('Keer.store.PartStory.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartStory-storetreecheck',
	model: 'Keer.store.PartStory.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({
			contents:null
		});
	}
});