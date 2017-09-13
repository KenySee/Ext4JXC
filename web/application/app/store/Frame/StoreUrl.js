Ext.define('Keer.store.Frame.StoreUrl',{
	extend: 'Keer.widget.store.Store',
	alias: 'widget.Frame-storeurl',
	model: 'Keer.store.Frame.Model',
	constructor: function(){
		this.callParent(arguments);
		this.setExclude({childs:null,permissions:null,permission:null});
	}
});