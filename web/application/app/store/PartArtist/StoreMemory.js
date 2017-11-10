Ext.define('Keer.store.PartArtist.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.PartArtist-storememory',
	model: 'Keer.store.PartArtist.Model',
	constructor: function(){
		this.proxy = {
			type : 'memory',
			reader : {
				type : 'json',
				root : 'data',
				totalProperty : 'totalCount',
				successProperty : 'success'
			}
		};
		this.callParent(arguments);
	}
});