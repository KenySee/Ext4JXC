Ext.define('Keer.widget.store.Store',{
	extend: 'Ext.data.Store',
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
			if (this.initParam){
				Ext.apply(operations.params,this.initParam);
			}
			this.initParam = null;
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
	canValid: function(){
		var success = true;
		this.each(function(model){
			if (!model.isValid()){
				var errors = model.validate(); 
				var message = [];
				errors.each(function(v){  
				    message.push(v.field+' : '+v.message);
				});
				if (message.length > 0){
					success = false;
					Ext.Msg.alert('提示', message.join(';'));
				}
			}
		});
		return success;
	},
	add: function(model){
		model.phantom = true;
		model.data.modifyFlag = 'ADD';
        return this.callParent(arguments);
	},
	remove: function(records){
		var i = 0,length = 0,record;
        if (records.isModel) {
	        records = [records];
	        length = 1;
	    }
        else if (Ext.isIterable(records)) {
            length = records.length;
        }
        else {
	        if (typeof records === 'object') {
	            i = records.start;
	            length = records.end + 1;
	            records = this.getRange(i,length-1);
	        }
        }
        for (i = 0; i < length; ++i) {
            record = records[i];
            if (!record.phantom){
            	record.data.modifyFlag = 'DEL';
        	}
        }
		this.callParent(arguments);
	},
	removeAll: function(){
		this.loadData([]);
	},
	createModel: function(record){
		record = record || {};
		var model = this.callParent([record]);
		model.onCreateBefore(this);
		model.onAddBefore(this,this.controller);
		return model;
	},
	save: function(model,callback,scope){
		var batchParam = {};
		var records = Ext.isArray(model) ? model : [model];
		for(var i=0; i < records.length; i++){
			var record = records[i];
			var flag = record.get('modifyFlag');
			if (flag == 'ADD'){
				if (!batchParam.create){
					batchParam.create = [];
				}
				batchParam.create.push(record);
			}
			else if (flag == 'DEL'){
				if (!batchParam.destroy){
					batchParam.destroy = [];
				}
				batchParam.destroy.push(record);
			}
			else if (flag == 'EDIT'){
				if (!batchParam.update){
					batchParam.update = [];
				}
				batchParam.update.push(record);
			}
		}
		var hasUpdate = batchParam.update && batchParam.update.length > 0;
		var hasDestory = batchParam.destroy && batchParam.destroy.length > 0;
		var hasCreate = batchParam.create && batchParam.create.length > 0;
		if (hasUpdate || hasDestory || hasCreate){
			var proxy = this.getProxy();
			proxy.batch(batchParam,{
				complete:function(batch,operation){
					if (operation.success){
						scope = scope || this;
						callback.call(scope,batch);
					}
					else {
					    var msg = batch.proxy.reader.rawData.message;
					    Ext.Msg.alert('提示', msg);
					}
				},
				scope:this
			});
		}
		else {
			Ext.Msg.alert('提示','保存的Model没有标志modifyFlag');
		}
	},
	canSync: function() {
	    var result = false;
	    if (this.getNewRecords().length || this.getModifiedRecords().length || this.getRemovedRecords().length || this.getUpdatedRecords().length) {
	      result = true;
	    }
    	return result;
  	}
});