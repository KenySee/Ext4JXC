Ext.define('Keer.widget.field.CollectionHidden',{
	extend: 'Ext.form.field.Hidden',
	alias: 'widget.widget-field-collectionhidden',
    displayField: 'name',
    config: {
		outValue: null,
		store: null,
		mem: false,		//是否为多对多集合
		writeSync: true,	//Store数据发生改变时是否回写到Editor
		loadSync: true,		//Editor数据发生改变时是否同步到Store
		suppress:false
	},
	isEqual: function(value1, value2) {
        return false;
    },
    getValue: function(){
		var value = this.getOutValue();
		return value;
	},
	
	setValue: function(value){
		this.setOutValue(value);
		this.callParent(arguments);
	},    
    constructor: function(config){
    	config = config || {};
    	this.initConfig(config);
    	var store = config.store;
    	if (store){
    		store.addListener('add',this.onAdd,this);
    		store.addListener('update',this.onEdit,this);
    		store.addListener('remove',this.onRemove,this);
    	}
    	this.callParent(arguments);
    },
	onDestroy: function(){
		var store = this.getStore();
    	if (store){
    		store.removeListener('add',this.onAdd,this);
    		store.removeListener('update',this.onEdit,this);
    		store.removeListener('remove',this.onRemove,this);
    	}
	},
	onChange: function(editor, newValue, oldValue){
		var suppress = this.getSuppress();
		var store = this.getStore();
		if (!suppress && store){
			var outValue = this.getOutValue();
			if (outValue){
				outValue = Ext.isArray(outValue) ? outValue : [outValue];
				if (this.loadSync) store.loadData(outValue);
			}
		}
	},
    onAdd: function(store, records, index){
		this.onEdit(store,records[0],'add');
	},
	
	onRemove: function(store, record, index, isMove){
		this.onEdit(store,record,'remove');
	},
	onEdit: function(store, record, operation, modifiedFieldNames){
		if (operation == 'edit' || operation == 'add' || operation == 'remove'){
			var data = [];
			if (this.mem){
				store.each(function(record){
					data.push(record.data);
				},this);
			}
			else {
				var newRecords = store.getNewRecords();
				Ext.each(newRecords,function(record){
					record.data.modifyFlag = 'ADD';
					data.push(record.data);
				});
				var editRecords = store.getUpdatedRecords();
				Ext.each(editRecords,function(record){
					record.data.modifyFlag = 'EDIT';
					data.push(record.data);
				});
				var delRecords = store.getRemovedRecords();
				Ext.each(delRecords,function(record){
					record.data.modifyFlag = 'DEL';
					data.push(record.data);
				});
			}
			this.suppress = true;
			if (this.writeSync) this.setValue(data);
			this.suppress = false;
		}		
	},
    initComponent: function(){
    	Ext.apply(this,{
    		listeners:{
    			destroy: this.onDestroy,
    			change: this.onChange
    		}
    	});
    	this.callParent(arguments);
    }
});