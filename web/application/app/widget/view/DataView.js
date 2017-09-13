Ext.define('Keer.widget.view.DataView',{
	extend: 'Ext.view.View',
	alias: 'widget.widget-view-dataview',
	config:{
		lastSelectIndex: 0,
		finalConfig:{}
	},
	getControl: function(){
		if (!this.control){
			var view = this;
		  	while (view && !view.getController){
		  		view = view.up('box');
		  	}
		  	if (view){
		  		this.control = view.getController();
		  	}
		}
		return this.control;
	},
	constructor: function (config) {
		config = config || {};
		config.iconCls = config.iconCls ||  '';
		Ext.apply(config,{
			trackOver: true,
			autoScroll: true,
			cls: 'nav-list',
			itemSelector: '.nav-list-item',
			overItemCls: 'nav-list-item-hover',
			tpl: Ext.String.format('<tpl for="."><div class="nav-list-item {0}">{{1}}</div></tpl>',config.iconCls,config.displayField)		
		});
		this.initConfig(config);
		var store = config.store;
    	if (store){
    		store.addListener('load',this.onLoad,this);
    		store.addListener('add',this.onAdd,this);
    		store.addListener('remove',this.onRemove,this);
    		store.addListener('update',this.onUpdate,this);
    	}
		this.callParent(arguments);
	},
	onDestroy: function(){
 		var store = this.getStore();
    	if (store){
    		store.removeListener('load',this.onLoad,this);
    		store.removeListener('add',this.onAdd,this);
    		store.removeListener('remove',this.onRemove,this);
    		store.removeListener('update',this.onUpdate,this);
    	}   	
    },
    onSelect: function(view, record){
    	var store = this.getStore();
    	if (store){
    		this.lastSelectIndex = store.indexOf(record);
    	}
    },
    onAdd: function(store, records, index){
    	this.onUpdate(store,records[0],'add');
    },
    onRemove: function(store, records, index, isMove){
		this.onUpdate(store,records[0],'remove');
	},
	onUpdate: function(store, record, operation){
		if (operation == 'edit' || operation == 'add' || operation == 'remove'){
			var control = this.getControl();
			if (control){
				control.setEditing(true);
			}
		}
		else if (operation == 'commit'){
			this.getControl().setEditing(false);
			var selModel = this.getSelectionModel();
			if (selModel.hasSelection()){
				records = selModel.getSelection();
	  			this.fireEvent('selectionchange',selModel,records);
			}
		}
	},
    onLoad: function(store, records){
  		var selModel = this.getSelectionModel();
		if (records && records.length > 0){
	  		if (!selModel.hasSelection()){
	  			if (this.lastSelectIndex >= records.length){
	  				this.lastSelectIndex = records.length-1;
	  			}
	  			else if (this.lastSelectIndex < 0){
	  				this.lastSelectIndex = 0;
	  			}
	  			selModel.selectRange(this.lastSelectIndex,this.lastSelectIndex);
	  		}
	  		else {
	  			records = selModel.getSelection();
	  			this.fireEvent('selectionchange',selModel,records);
	  		}
  		}
    	else {
    		this.fireEvent('selectionchange',selModel,null);
  		}    
    },
	initComponent: function(){
		Ext.apply(this,{
    		listeners:{
    			destroy: this.onDestroy,
    			select: this.onSelect
    		}
    	});
		this.callParent(arguments);
	}
});