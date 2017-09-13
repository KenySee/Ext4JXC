Ext.define('Keer.widget.store.StoreTree',{
	extend: 'Ext.data.TreeStore',
	autoLoad : false,
	constructor: function(cfg){
		cfg = cfg || {};
    	this.initConfig(cfg);
    	var config = this.configProxy();
    	this.proxy = this.buildProxy(config);
	    return this.callParent(arguments);
	},
	config: {
		exclude:{},
		navParams:{},
		initParam:{},
		actionUrl: null,
		actionBean: null,
		actionMethod: null,
		controller: null		
	},
	buildProxy: function(proxy){
		return proxy;
	},	
	listeners:{
		beforeload: function(store,operations){
			operations.params = operations.params || {};
			if (!operations.params.navLoad){
				Ext.apply(operations.params,this.navParams);
			}
			Ext.apply(operations.params,this.initParam);
		},
		load: function(store, node, records, successful, eOpts){
			if (successful == false){
				var proxy = store.getProxy();
				var reader = proxy.getReader();
				Ext.Msg.alert('提示', reader.rawData.message);
			}
		}
	},
	configProxy: function(){
		var model = Ext.create(this.model);
		var controller = this.getController();
		var action = this.getActionUrl() || (controller ? controller.getActionUrl(model) : model.getActionUrl());
		var bean = (this.getActionBean()=='') ? '' : ((action == model.getActionUrl()) ? '' : model.getActionBean());
		var method = this.getActionMethod() || model.getActionMethod();
		return {
			type : 'ajax',
			reader : {
			    type: 'json',
			    root: 'data',
			    idProperty: 'id',
			    totalProperty: 'totalCount',
			    successProperty: 'success'
			},
			actionMethods: {
		        create : 'POST',
		        read   : 'POST',
		        update : 'POST',
		        destroy: 'POST'
    		},
			writer: {
				type: 'json',
				allowSingle: false,
				encode: false,
				writeAllFields: false
			},
			api: {
			    create: Ext.String.format('{0}Action!{1}{2}.action',action,'save',bean ? bean : ''),
			    read: Ext.String.format('{0}Action!{1}{2}.action',action,method ? method : 'findAll',bean ? bean : ''),
			    update: Ext.String.format('{0}Action!{1}{2}.action',action,'update',bean ? bean : ''),
			    destroy: Ext.String.format('{0}Action!{1}{2}.action',action,'remove',bean ? bean : '')
			}
		};
	},
	createModel: function(record){
		record = record || {};
		var model = new this.model();
		model.onCreateBefore(this);
		model.onAddBefore(this,this.controller);
		return model;
	},
	add: function(model){
		model.phantom = true;
		var parentProp = model.getParentProp();
		var parentData = model.get(parentProp);
		var parentNode = parentData ? this.getNodeById(parentData.id) : this.getRootNode();
		if (parentNode){
			if (!parentNode.isExpanded()){
				parentNode.expand();
			}
			model.data.leaf = false;
			var node = parentNode.createNode(model.data);
			parentNode.appendChild(node);
		}
	},
	remove: function(model){
		var id = model.get('id');
		var node = this.getNodeById(id);
		if (node){
			node.remove();
		}
	},
	canValid: function(){
		var success = true;
		return success;
	},
	canSync: function() {
	    var result = false;
	    if (this.getNewRecords().length || this.getModifiedRecords().length || this.getRemovedRecords().length || this.getUpdatedRecords().length) {
	      result = true;
	    }
    	return result;
  	}
});