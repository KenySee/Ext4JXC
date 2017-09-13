Ext.define('Keer.store.PortalResource.ModelCheck',{
	extend: 'Keer.store.PortalResource.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});