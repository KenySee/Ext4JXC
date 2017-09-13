Ext.define('Keer.widget.field.ArrayCombo',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.widget-field-arraycombo',
	data:[],
	displayField:'name',
	valueField:'id',
	initComponent: function(){
		this.store = Ext.create('Ext.data.Store', {
			fields:['id','name'],
			queryMode: 'local',
			triggerAction:'all',
			data:this.data
		});
		this.callParent(arguments);
	}
});