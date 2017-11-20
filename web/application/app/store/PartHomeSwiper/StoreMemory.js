Ext.define('Keer.store.PartHomeSwiper.StoreMemory',{
	extend: 'Ext.data.Store',
	alias: 'widget.PartHomeSwiper-storememory',
	model: 'Keer.store.PartHomeSwiper.Model',
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