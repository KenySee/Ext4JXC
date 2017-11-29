Ext.define('Keer.store.PartHomeSwiper.ModelCheck',{
	extend: 'Keer.store.PartHomeSwiper.Model',
	constructor: function(){
		this.callParent(arguments);
		var field = Ext.create('Ext.data.Field',{name: 'checked',type: 'boolean'});
		this.fields.add(field);
	}
});