Ext.define('Keer.widget.field.CollectionColumn',{
	extend: 'Ext.grid.column.Column',
	alias: 'widget.widget-field-collectioncolumn',
	show: function(){},
	config:{
		store: null,
		parentProp:'parent'
	},
	constructor: function(config){
    	config = config || {};
    	this.initConfig(config);
    	var store = config.store;
    	if (store){
    		store.addListener('add',this.onAdd,this);
    		store.addListener('update',this.onUpdate,this);
    		store.addListener('remove',this.onRemove,this);
    		store.addListener('beforeload',this.onBeforeLoad,this);
    	}
    	this.callParent(arguments);
    },
    onDestroy: function(){
		var store = this.getStore();
    	if (store){
    		store.removeListener('add',this.onAdd,this);
    		store.removeListener('update',this.onUpdate,this);
    		store.removeListener('beforeload',this.onBeforeLoad,this);
    	}
	},
	onBeforeLoad: function(store, operation){
		var grid = this.up('grid');
    	if (grid){
    		var selModel = grid.getSelectionModel();
    		if (selModel.hasSelection()){
    			var selected = selModel.getSelection();
    			var model = selected[0];
    			var control = store.getController();
    			if (control){
    				control.set('parent',model);
    			}
    		}
    	}
	},
    onAdd: function(store, records, index){
    	var grid = this.up('grid');
    	if (grid){
    		var selModel = grid.getSelectionModel();
    		if (selModel.hasSelection()){
    			var selected = selModel.getSelection();
    			var model = selected[0];
		    	var parentProp = this.parentProp;
		    	Ext.each(records,function(record){
		    		record.set(parentProp,model.data);
		    	},this);
    		}
    	}
    	this.onUpdate(store,records[0],'add');
	},
	onRemove: function(store, record, index, isMove){
		this.onUpdate(store,record,'remove');
	},
	onUpdate: function(store, record, operation){
		if (operation == 'edit' || operation == 'add' || operation == 'remove'){
		}
		else if (operation == 'commit'){
		}
	},
	initComponent: function(){
		Ext.apply(this,{
			hidden: true
		});
		Ext.apply(this,{
    		listeners:{
    			destroy: this.onDestroy
    		}
    	});
		this.callParent(arguments);
	}
});