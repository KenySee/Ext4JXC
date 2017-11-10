Ext.define('Keer.store.PartArtist.ModelCheck',{
	extend: 'Keer.store.PartArtist.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});