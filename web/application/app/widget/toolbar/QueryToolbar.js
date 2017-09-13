Ext.define('Keer.widget.toolbar.QueryToolbar',{
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.querybar',
	config:{
		dock: 'top',
		store: null
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
		if (config.store){
			config.store.addListener('beforeload',this.onBeforeLoad,this);
			config.items = config.items || [];
			if (config.items.length == 0){
				config.hidden = true;
			}
		}
		this.callParent(arguments);
	},
	doQuery: function(){
		var store = this.getStore();
		store.load();
	},
	doReset: function(){
		var fields = this.query('[name]');
		Ext.each(fields,function(field){
			field.setValue(null);
		});
	},
	onBeforeLoad: function(store, operation){
		var fields = this.query('[name]');
		var params = {};
		Ext.each(fields,function(field){
			var name = field.name;
			var record = field.getOutValue ? field.getOutValue() : null;
			var value = record || field.value;
			if (Ext.isObject(value)){
				value = value.id;
			}
			params[name] = value;
		});
		operation.params = operation.params || {};
		Ext.apply(operation.params,params);	
	},
	onDestroy: function(){
 		var store = this.getStore();
    	if (store){
    		store.removeListener('beforeload',this.onBeforeLoad,this);
    	}   	
    },
    onViewBoxReady: function(){
    	var fields = this.query('[name]');
    	if (fields.length > 0){
			var control = this.getControl();
			control.addViewComponent(this,{text:'查询',xtype:'button',itemId:'querybar_search',iconCls:'query',iconAlign: 'left', privilege: 'VIEW',handler: Ext.bind(this.doQuery,this)});
			control.addViewComponent(this,{text:'重置',xtype:'button',itemId:'querybar_reset',iconCls:'x-button-refresh',handler: Ext.bind(this.doReset,this)});
    	}
    },
	initComponent: function(){
		this.listeners = this.listeners || {};
		Ext.apply(this.listeners,{
			boxready: this.onViewBoxReady,
    		destroy: this.onDestroy
    	});
		this.callParent(arguments);
	}
});