Ext.define('Keer.widget.view.GridView',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.widget-view-gridview',
	requires:[
		'Ext.grid.plugin.CellEditing',
		'Ext.selection.CheckboxModel'
	],
	config:{
		lastSelectIndex: 0,
		finalConfig:{}
	},
	columnOverWriter: false,
	columnLines: true,
	margin: '-1 -1 -1 -1',
	mixins : {
		EnumRender: 'Keer.widget.mixin.EnumRender',
		TriggerValue: 'Keer.widget.mixin.TriggerValue'
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
	constructor: function(config){
    	config = config || {};
    	if (config.innerEdit){
    		config.plugins = config.plugins || [];
    		config.plugins.push(Ext.create('Ext.grid.plugin.CellEditing', {
					pluginId: 'cellplugin',
				    clicksToEdit: 2
			}));
		}
		if (config.dragDrop){
			config.viewConfig = config.viewConfig || {};
			Ext.apply(config.viewConfig,{
				plugins : {
					ptype : 'gridviewdragdrop',
					dragText : 'Drag and drop to reorganize'
				},
				listeners : {
					drop : function(node, data, overModel, dropPosition, dropHandlers) {
						var store = overModel.store;
						var sortno = 1;
						store.each(function(item) {
							item.set('modifyFlag','EDIT');
							item.set('sortno',Ext.String.leftPad(sortno, 5, '0'));
							sortno += 1;
						});
					}
				}
			});
		}
		if (config.canMulti){
			config.selModel = Ext.create('Ext.selection.CheckboxModel')
		}
		if (config.queryToolbar && Ext.isArray(config.queryToolbar)){
			config.dockedItems = config.dockedItems || [];
			var dockedItem = {
				xtype: 'querybar',
				dock: 'top',
				store: config.store,
				items: []
			};
			config.dockedItems.push(dockedItem);
			Ext.each(config.queryToolbar,function(bar){
				if (Ext.isString(bar)){
					dockedItem = {
						xtype: 'querybar',
						dock: 'top',
						store: config.store,
						items: []
					};
					config.dockedItems.push(dockedItem);
				}
				else {
					dockedItem.items.push(bar);
				}
			});
		}
    	var store = config.store;
    	if (store){
    		store.addListener('load',this.onLoad,this);
    		store.addListener('add',this.onAdd,this);
    		store.addListener('remove',this.onRemove,this);
    		store.addListener('update',this.onUpdate,this);
    		store.addListener('datachanged',this.onDataChange,this);
    	}
    	this.initConfig(config);
    	this.callParent(arguments);
    },
    onDestroy: function(){
 		var store = this.getStore();
    	if (store){
    		store.removeListener('load',this.onLoad,this);
    		store.removeListener('add',this.onAdd,this);
    		store.removeListener('remove',this.onRemove,this);
    		store.removeListener('update',this.onUpdate,this);
    		store.removeListener('datachanged',this.onDataChange,this);
    	}   	
    },
    onDataChange: function(store){
    	var control = this.getControl();
    	if (control.controllerType == 'child'){
	  		var selModel = this.getSelectionModel();
			var count = store.getCount();
			if (count > 0){
		  		if (!selModel.hasSelection()){
		  			selModel.selectRange(0,0);
		  		}
		  		else {
		  			var records = selModel.getSelection();
		  			this.fireEvent('selectionchange',selModel,records);
		  		}
	  		}
	    	else {
				this.fireEvent('selectionchange',selModel,null);
	  		}
    	}
    },
    onAdd: function(store, records, index){
    	var index = store.indexOf(records[0]);
    	if (index >= 0){
    		var selModel = this.getSelectionModel();
    		selModel.selectRange(index,index);
    	}
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
			var selModel = this.getSelectionModel();
			if (selModel.hasSelection()){
				records = selModel.getSelection();
	  			this.fireEvent('selectionchange',selModel,records);
			}
			var control = this.getControl();
			if (control){
				control.setEditing(false);
			}
		}
	},
    onLoad: function(store, records){
    	var control = this.getControl();
    	var childList = control.childList;
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
    		Ext.each(childList,function(child){
    			child.setReady(true);
    		});
  		}
    	else {
    		Ext.each(childList,function(child){
    			child.setReady(false);
    		});
    		this.fireEvent('selectionchange',selModel,null);
  		}    
    },
    onSelect: function(grid, record, index){
    	this.lastSelectIndex = index;
    },
    onEditAfter: function(editor, context){
		if (context.column.editor){
			context.column.editor.record = context.record;
			context.column.editor = null;
		}
		var store = this.getStore();
		if (store){
			var editing = store.canSync();
			this.getControl().setEditing(editing);
			if (editing){
				var selModel = this.getSelectionModel();
				records = selModel.getSelection();
				this.fireEvent('selectionchange',selModel,records);
			}
		}
    },
    onEditBefore: function(editor,context){
    	return this.getControl().canEdit(context.record,context.field);
    },
	initComponent: function(){
		Ext.apply(this,this.finalConfig);
		this.listeners = this.listeners || {};
		Ext.apply(this.listeners,{
    		destroy: this.onDestroy,
    		edit: this.onEditAfter,
    		beforeedit: this.onEditBefore,
    		select: this.onSelect
    	});
		this.callParent(arguments);
	}
});