Ext.define('Keer.widget.field.CheckBoxGroup',{
	extend: 'Ext.form.CheckboxGroup',
	alias: 'widget.widget-field-checkboxgroup',
	rawToValue: function(raw){
		return raw;
	},
	valueToRaw: function(value){
		return value;
	},
	getModelData: function(){
		var values = {};
		values[this.name] = this.getValue();
		return values;
	},
	getValue: function(){
		var rawValue = this.callParent(arguments);
		return this.rawToValue(rawValue);
	},
	setValue: function(value){
		var rawValue = this.valueToRaw(value);
		this.callParent([rawValue]);
	}
});