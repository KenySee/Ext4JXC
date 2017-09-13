Ext.define('Keer.widget.model.Model',{
	extend: 'Ext.data.Model',
	config: {
		actionUrl: '',
		actionBean: '',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},
	constructor: function(cfg){
		cfg = cfg || {};
    	this.initConfig(cfg);
	    return this.callParent(arguments);
	},
	getChanges: function(){
		var changes = this.callParent(arguments);
		var modify = this.get('modifyFlag');
		if (modify == 'DEL'){
			var items = this.fields.items;
			var fLen = items.length;
			for (var f = 0; f < fLen; f++) {
				field = items[f];
                if (field.persist) {
                	changes[field.name] = this.get(field.name);
                }
			}
		}
		else {
			changes['clazzname'] = this.get('clazzname');
			changes['version'] = this.get('version');
			changes['modifyFlag'] = this.get('modifyFlag');
		}
		return changes;
	},
	inheritableStatics: {
		clazzname: null,
		requireJSON: function(exclude){
			var json = {};
			var exclude = exclude || {};
			Ext.each(this.getFields(),function(field){
				if (field.persist != false && !exclude.hasOwnProperty(field.name)){
					json[field.name] = field.configMap.hasOwnProperty('id') ? field.configMap : null;
				}
			});
			return json;
		},
		applyload: function(id, config){
			var model = config.instance;
			var actionUrl = config.scope.getActionUrl(model);
			var actionBean = ((actionUrl == model.getActionUrl()) ? '' : model.getActionBean());
			var proxy = {
				type : 'ajax',
				reader : {
					type: 'json',
					root: 'data'
				},
				actionMethods: {
			        create : 'POST',
			        read   : 'POST',
			        update : 'POST',
			        destroy: 'POST'
    			},
				url: Ext.String.format('{0}Action!find{1}.action',actionUrl,actionBean)
			};
			this.setProxy(proxy);
			config.params = config.params || {};
			this.load(id,config);
		}
	},
	requestDefaults: function(callback,params,scope){
		var actionUrl = scope.getActionUrl(this);
		Ext.apply(params,{
				defaultclazz: this.get('clazzname')
			}
		);
		Ext.Ajax.request({
			url: Ext.String.format('{0}Action!findDefault.action',actionUrl),
			params: params,
			success: function(response, opts){
				var model = Ext.decode(response.responseText);
				callback.call(scope,model.data);
				if (!model.success){
					Ext.Msg.alert('提示', model.message);
				}
			}
		});
	},
	set: function(fieldName, newValue){
		if(!this.data.modifyFlag){
			this.data.modifyFlag = 'EDIT';
		}
		return this.callParent(arguments);
	},
	getActionUrl: function(){
		return this.config.actionUrl;
	},
	getActionBean: function(){
		return this.config.actionBean;
	},
	getActionMethod: function(){
		return this.config.actionMethod;
	},
	canEdit: function(field){
		return true;
	},
	canRemove: function(){
		return true;
	},
	canDefaults: function(){
		return false;
	},
	canAddDetail: function(field){
		return true;
	},
	canPreView: function(){
		return false;
	},
	canDownLoad: function(){
		return false;
	},
	//Model加载完成
	onLoadComplete: function(operations){
		
	},	
	//记录同步之前
	onSyncBefore: function(store,scope){
	
	},
	//记录添加之前
	onAddBefore: function(store,scope){
	
	},
	//记录创建之前
	onCreateBefore: function(store,scope){
		var clazz = this.get('clazzname');
		var value = this.self.clazzname;
		if (!clazz && value){
			this.set('clazzname',value);
		}
		if(store){
			var count = store.getCount()+1;
			this.set('sortno',Ext.String.leftPad(count, 5, '0'));
			this.set('status','USING');
		}
	}
});