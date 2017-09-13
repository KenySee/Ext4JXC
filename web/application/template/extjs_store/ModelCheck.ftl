Ext.define('Keer.store.${appfolder}.ModelCheck',{
	extend: 'Keer.store.${appfolder}.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});