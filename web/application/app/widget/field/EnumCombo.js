Ext.define('Keer.widget.field.EnumCombo',{
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.widget-field-enumcombo',
	valueField: 'id',
	displayField: 'name',
	queryMode: 'remote',
	queryCaching: false,
	editable: false,
	config: {
    	controller: null
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
		if (this.store && this.store.isStore){
			var editor = this;
			var localStore = this.store;
			this.store.addListener('beforeload',function(store, operation, eOpts){
				operation.params = operation.params || {};
				if (editor.isExpanded){
					var controller = editor.getParentController();
					if (controller){
						controller.doComboBeforeLoad(editor,store,operation.params);
					}
				}
			});
			var fullData = [];
			this.store.each(function(record){
				fullData.push(record.data);
			});
			Ext.apply(this,{
				listeners: {
					'collapse': function(field){
						localStore.removeAll();
						Ext.each(fullData,function(data){
							var model = new localStore.model(data);
							localStore.add(model);
						});
					}
				}
			});
		}
		this.callParent(arguments);
	}
});