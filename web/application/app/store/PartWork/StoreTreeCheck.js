Ext.define('Keer.store.PartWork.StoreTreeCheck',{
	extend: 'Keer.widget.store.StoreTree',
	alias: 'widget.PartWork-storetreecheck',
	model: 'Keer.store.PartWork.ModelCheck',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({
			specifications:null,
			contents:null
		});
	}
});