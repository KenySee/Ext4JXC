Ext.define('Keer.store.PartStory.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.PartStory-storememory',
	model: 'Keer.store.PartStory.Model',
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