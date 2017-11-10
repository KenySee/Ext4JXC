Ext.define('Keer.store.PartArtist.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartArtist-storetreecheck',
	model: 'Keer.store.PartArtist.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({
			works:null,
			articles:null
		});
	}
});