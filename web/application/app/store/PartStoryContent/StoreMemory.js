Ext.define('Keer.store.PartStoryContent.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.PartStoryContent-storememory',
	model: 'Keer.store.PartStoryContent.Model',
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