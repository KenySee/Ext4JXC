Ext.define('Keer.widget.field.ObjectCombo',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.widget-field-objectcombo',
	displayField: 'name',
	editable: false,
	queryCaching: false,
    config: {
    	controller: null,
    	selValue: null,
		outValue: null
	},
	isEqual: function(value1, value2) {
		if (value1 && value2 == null){
			this.setOutValue(null);
			return false;
		}
		var selValue = this.getSelValue();
		var outValue = this.getOutValue();
		if (selValue){
			return outValue ? this.isEqualAsString(outValue.id,selValue.id) : false;
		}
		else {
			return true;
		}
	},
    getValue: function(){
		var value = this.callParent();
		if (!Ext.isObject(value)){
			value = this.getOutValue();
		}
		return value;
	},
	setValue: function(value){
		this.callParent(arguments);
		if (value){
			if (Ext.isArray(value)){
				var text = '';
				var name = this.displayField;
				if (value.length == 1){
					if (Ext.isObject(value[0])){
						this.setOutValue(value[0].data);
						if (Ext.isObject(value[0].data)){
							text = value[0].data[name];
						}
					}
				}
				else {
					this.setOutValue(value);
					Ext.each(value,function(v){
						if (v.data && Ext.isObject(v.data)){
							text += '['+v.data[name]+']';
						}
					});
				}
				this.setRawValue(text);
			}
			else {
				this.setOutValue(value);
				this.setRawValue(value[this.displayField]);
			}
		}
	},
	getParentController: function(){
		var view = this;
	  	while (view && !view.controller){
	  		view = view.up('box');
	  	}
	  	if (view){
	  		var controller = view.getController();
	  		this.setController(controller);
	  	}
	  	return view ? view.getController() : null;
	},
    initComponent: function(){
    	Ext.apply(this,{
			queryMode:'remote',
			triggerAction:'all'
    	});
        var editor = this;
		if (this.store != null && Ext.isString(this.store)){
			this.store = Ext.widget(this.store,{
				listeners: {
					beforeload: function(store, operation, eOpts){
						operation.params = operation.params || {};
						if (editor.isExpanded){
							var controller = editor.getParentController();
							if (controller){
								controller.doComboBeforeLoad(editor,store,operation.params);
							}
						}
					}
				}
			});
		}
		Ext.apply(this,{
			listeners: {
				beforeselect: function(combox,record,index){
                    debugger;
					editor.setSelValue(record.data);
				}
			}
		});
    	this.callParent(arguments);
    }
});