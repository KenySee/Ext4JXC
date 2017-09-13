Ext.define('Keer.store.PortalItem.ModelCheck',{
	extend: 'Keer.store.PortalItem.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});