Ext.define('Keer.widget.mvc.Controller',{
	extend: 'Keer.widget.AbstractController',
	mixins : {
		observable : 'Ext.util.Observable',
		EnumRender: 'Keer.widget.mixin.EnumRender'
	},
	/**
		appParams: 应用初始化参数结构如下
		{
			xwindow: 窗口视图别名,
			xcontainer: 窗口视图别名, 
			store:     当前编辑的Store, 	
			record:    当前编辑的Model,
			addStore:  查找载回使用Store,
			addRecord:  查找载回使用Model,
			autosync:   编辑窗口是否自动保存同步
			autoclose:  编辑窗口保存后是否自动关闭
			component: 调用者组件,
			parent: 目前仅用在EditController在构造子ChildContainer时转入的Model,用于实现一对多关系,
			childs：目前仅用在EditWindow在构造子ChildContainer时转入的集合属性名,用于实现一对多关系,
			editor: 目前仅用在EditController在构造子ChildContainer时转入的集合隐藏域控件实例,
			menudata: 权限数据(包含权限信息),
			{
				menu: 当前菜单Model
				actions: 当前菜单的动作
			},
			initParam: 控制器初始化参数
			callController: 调用者控制器
			frameController: 框架控制器
			callFunc: 被调用的控制器在onViewBoxReady事件中会执行此回调函数 形式如下: function(controller) { 业务实现代码 };  
			selMode:{
				selKey: 查找的Model搜索字段名
				addKey: 添加的Model搜索字段名
				addRef: 是否按外键引用的方式添加
				addName: 外键引用添加的实体中文标题属性名
				callFunc: 查找再回窗口将执行的回调函数,无返回值，形式如下: function(records) { 业务实现代码 }
				callDefaultValueFun: 设置默认值回调函数,形如如下: function(model,record){ 业务实现代码 }
				callScope: 回调函数作用域
			},
			constParam: 调用者转入的常量参数,形式如下：{id: 20,name: 'xxx'},
			callParam: 调用者转入的回调函数,形式如下: 
						function(model,params) {  
							Ext.apply(params,{
								node: model.get('id')
							});  
						}
		},
		viewParams: 视图初始化参数结构如下
		{
			canMulti: false,	【是否允许多选】									
			dragDrop: false, 	【是否拖动排序】
			navStoreConfig: {},【treeStore配置参数】
			gridStoreConfig: {},【gridStore配置参数】
			formFields: [],		【表单初始字段数组】
			addFields: [],		【表单附加字段数组】
			gridColumns:[],		【Grid列定数组】
			addColumns:[]		【Grid附加列数组】
		}
	**/	
	config: {
		actionUrl: null,
		controllerType: '',		// 【控制器类型如:main,find,edit,child】
		editing: null,			// 【是否正在编辑】
		adding: null,			// 【是否添加记录】
		ready: null,			// 【是否准备就绪】
		childList:[],			// 【当前控制器创建的子控制器列表】
		callFunc: null			// 【控制器回调函数】
	},
	isDigital : /^[0-9]+.?[0-9]*$/,
	init: function() {
		this.doCreateComplete();
		this.createObservers();
  	},
  	control: {
		view: {
			boxready: 'view_boxready',
			show: 'view_show',
			beforeclose: 'view_beforeclose'
		}
	},
	//【构造方法】
	constructor: function (config) {
		if (config == null) {
			config = {};
		}
        this.mixins.observable.constructor.call(this, config);
        this.initConfig(config);
        this.addEvents(
            'onStoreSyncComplete',	//Store同步完成事件
            'onStoreSyncError',		//Store同步失败事件
            'onLoadDataComplete'	//表单数据加载完成事件
        );
		var instance = this;
		while(Ext.getClassName(instance) != 'Keer.widget.mvc.Controller'){
			if (Ext.isObject(instance.mixins)){
				for(var index in instance.mixins){
					if (instance.mixins[index].inMergerControl){
						instance.mixins[index].inMergerControl(this);
					}
					if (instance.mixins[index].inMergerObserve){
						instance.mixins[index].inMergerObserve(this);
					}
				}
			}
			instance = instance.superclass;
			instance.inMergerControl(this);
		}
		this.callParent(arguments);
    },
	//◎【控制器创建时执行,此方法可以完成动态视图创建以及 选择器的定位】
  	onCreateWidget: function(){	},
  	
  	//◎【所有动态视图创建完成后执行,此方法可以进行视图初始化工作,例如根据权限来隐藏或显示指定控件】
  	onCreateComplete: function(){},
  	
  	onStoreSyncComplete: function(record){},
	
  	onStoreSyncError: function(options){},
  	
  	onLoadDataComplete: function(record){},
  	
  	onCreateWidgetAfter: function(){},

  	/**【视图boxready事件监听方法】
  	 * 
  	 */
	onViewBoxReady: function(){	},
	
	/**
	 * 
	 * @param {} container 视图容器
	 */
	//◎【视图初始化组件完成时执行】
	onViewInitComponent: function(container){},
	
  	/**【执行创建记录动作】
  	 * 
  	 * @param {} store	创建记录的Store
  	 * @param {} model	创建的Model
  	 */
  	doAddRecord: function(store,model){},
  	
  	/**【编辑窗体创建之前执行】
  	 * 
  	 * @param {} component	发起者
  	 * @param {} appParams	控制器参数
  	 * @param {} viewParams	视图参数
  	 */
	onEditWindowCreateBefore: function(component, appParams, viewParams){},
	
	//◎【查找再回窗体创建之前执行,子类可以覆盖】
	onFindWindowCreateBefore: function(component, appParams, viewParams){},
	
	//◎【集合容器创建前执行】
	onChildContainerCreateBefore: function(tabItem/*创建窗体的配置对象*/,appParams/*控制器参数*/,viewParams/*视图参数*/){},
	
	//◎【设置组件状态】
	doSwitchComponent: function(value,selector,groupid,trueFunc,falseFunc){
		var view = this.getView();
		var components = view.query(Ext.String.format('[{0}]',selector));
		for(var i in components){
			var component = components[i];
			var status = component[selector];
			if (status == groupid){
				component[value ? trueFunc : falseFunc]();
			}
			if (status == '!'+groupid){
				component[!value ? trueFunc : falseFunc]();
			}
		}
	},
	
	/**【创建并打开编辑窗体】
  	 * alias, 		打开窗口的别名
  	 * component,	从那个控件上打开
  	 * store,		当前的store
  	 * model,		当前的model
  	 * adding		是否添加(true:添加,false:修改)
  	 */
  	doOpenEditWindow: function(alias,component,store,model,adding,autoclose,appParams,viewParams,autosync){
  		var appConfig = {};
  		var viewConfig = {};
  		if (adding){
	  		model.onCreateBefore(store,this);
			this.doCreateRecord(component,model);
			if (typeof(autosync) == 'undefined'){
  				autosync = true;
  			}
  		}
  		else {
  			autosync = true;
  		}
  		Ext.apply(appConfig,{
  			xwindow: alias,
			store: store,							//当前编辑store
			record: model,							//当前编辑model
			adding: adding,							//是否新增
			autosync: autosync,						//是否自动同步
			autoclose: autoclose,					//是否自动关闭
			menudata: this.get('menudata'),			//当前权限信息
			component: component,					//调用者组件
			callController: this					//调用者控制器
		});
		appParams = appParams || {};
  		viewParams = viewParams || {};
  		Ext.apply(appConfig,appParams);
  		Ext.apply(viewConfig,viewParams);
  		this.onEditWindowCreateBefore(component,appConfig,viewConfig);
  		
  		appConfig.initParam = appConfig.initParam || {};
  		Ext.apply(appConfig.initParam,{
			actionUrl: appConfig.actionUrl || this.getActionUrl(),
			callController: this
		});
  		Ext.apply(viewConfig,{appParams:appConfig});
  		if (appConfig.xwindow){
  			if (Ext.isString(appConfig.xwindow)){
	  			var win = Ext.widget(appConfig.xwindow,viewConfig);
				win.show();
  			}
  			else {
	  			Ext.Error.raise({
	            	msg: Ext.String.format('错误>>  {0}: appParams.xwindow必须是字符串.',Ext.getClassName(win))
	          	});
  			}
  		}
  		else {
  			Ext.Error.raise({
            	msg: Ext.String.format('错误>>  {0}: appParams.xwindow未指定.',Ext.getClassName(win))
          	});
  		}
	},
	onSelectRecordComplete: function(selected){
	},
	doCreateSelectRecord: function(records,form){
		if (records){
			var selected = [];
			records = Ext.isArray(records) ? records : [records];
			var selMode = this.get('selMode') || {};	//获取调用窗口转入的选择模式配置对象
			var callFunc = selMode.callFunc;
			var callScope = selMode.callScope || this;
			if (callFunc && Ext.isFunction(callFunc)){
				callFunc.call(callScope,records);
				return;
			}
			var store = this.get('addStore') || this.get('store');		//获取查找载回使用Store
			if (!store || !store.findBy){								//如果是TreeStore就返回
				return;
			}
			var value = this.get('addRecord') || this.get('record');	//获取查找载回使用Model
			selMode.selKey = selMode.selKey || 'id';
			selMode.addKey = selMode.addKey || 'id';
			selMode.addName = selMode.addName || 'name';
			var selKey = selMode.selKey;		//查找再回比对字段
			var addKey = selMode.addKey;		//调用窗口比对字段
			var addName = selMode.addName;
			var addRef = (selKey != addKey) || (selMode.addRef);	//是否按外键引用的方式添加
			var callDefaultValueFun = selMode.callDefaultValueFun;
			Ext.each(records,function(record){
				var index = store.findBy(function(item) {
					var selValue = record.get(selKey);
					var addValue = item.get(addKey);
					var selId = Ext.isObject(selValue) ? selValue.id : selValue;
					var addId = Ext.isObject(addValue) ? addValue.id : addValue;
					return selId == addId;
				});
				if (index == -1) {
					var model = null;
					if (addRef){
						model = store.createModel(value.data);
						model.set(addKey,record.data);
					}
					else {
						model = store.createModel(record.data);
					}
					if (callDefaultValueFun && Ext.isFunction(callDefaultValueFun)){
						callDefaultValueFun.call(callScope,model,record);
					}
					selected.push(model);
					if (!addRef && form && form.getForm().hasUpload()){
						var data = [];
						store.each(function(record){
							data.push(record.data);
						});
						data.push(model.data);
						store.loadData(data);
					}
					else {
						store.add(model);
					}
				}
				else {
					var model = store.getAt(index);
					if (addRef){
						model.data[addKey] = record.data;
					}
					else {
						model.data = record.data;
					}
				}
			},this);
			var callController = this.get('callController');
			if (callController){
				callController.onSelectRecordComplete(selected);
			}
		}
	},
	doCreateChildContainer: function(view){
    	var tabList = view.tabList || view.query('[xcontainer]');
		if (tabList && tabList.length > 0){
  			this.childList = [];
  			var tabItems = [];
  			var index = 0;
  			Ext.each(tabList,function(tabItem){
  				var appConfig = {};
  				var viewConfig = {};
  				if (tabItem.appParams){
  					Ext.apply(appConfig,tabItem.appParams);
  				}
  				if (tabItem.viewParams){
  					Ext.apply(viewConfig,tabItem.viewParams);
  				}
  				this.doChildContainerCreateBefore(tabItem,appConfig,viewConfig);
  				if (typeof(tabItem.writeSync) === 'undefined'){
  					tabItem.writeSync = true;
  				}
  				if (typeof(tabItem.loadSync) === 'undefined'){
  					tabItem.loadSync = true;
  				}
  				Ext.apply(appConfig,{
  					store: tabItem.store,			//集合Store
  					writeSync: tabItem.writeSync,	//是否回写
  					loadSync: tabItem.loadSync,		//是否加载
  					parent: this.get('record'),		//集合父对象
  					menudata: this.get('menudata'),	//当前权限信息
  					component: view,				//调用者组件
  					callController: this			//调用者控制器
  				});
  				appConfig.initParam = appConfig.initParam || {};
  				Ext.apply(appConfig.initParam,{
					actionUrl: appConfig.actionUrl || this.getActionUrl(),
					callController: this
				});
  				Ext.apply(viewConfig,{
  					appParams:appConfig,
  					store: tabItem.store,
  					title: tabItem.fieldLabel || tabItem.text
  				});
  				if (view.tabLayout === false){
  					Ext.applyIf(viewConfig,{
  						flex: 1,
	  					border: 1,
						margin: Ext.String.format('-1 {0} -1 {1}',index == 0 ? 1 : -1,(index == tabList.length-1) ? 1 : -1)			
  					});
  				}
  				var tab = Ext.widget(tabItem.xcontainer,viewConfig);
  				tabItems.push(tab);
  				index = index + 1;
  				var control = tab.getController();
  				if (control){
  					this.childList.push(control);
  					if (tabItem.store){
  						Ext.apply(tabItem.store,{
  							controller: control
  						});
  					}
  				}
  			},this);
  			var tabPanel = view.down('panel[itemId=tabPanel]');
  			tabPanel.add(tabItems);
  			if (view.tabLayout){
  				if (tabPanel.setActiveTab){
  					tabPanel.setActiveTab(0);
  				}
  			}
		}	
	},
	doCreateSplitButton: function(button, menus, func){
		var me = this;
		Ext.each(menus,function(item1){
			if (item1.menu){
				Ext.each(item1.menu,function(item2){
					Ext.apply(item2,{handler: function(menu){
						func.call(me,menu);
					}});
				});
			}
			else {
				Ext.apply(item1,{handler: function(menu){
					func.call(me,menu);
				}});
			}
		});
		button.menu = Ext.create('Ext.menu.Menu',{items: menus});
	},
	//◎【根据转入record加载数据】
	doLoadModel: function(view,record,callFunc){
		var adding = this.getAdding();
		//如果是添加状态
		if (adding){
			if (this.canDefaults(record)){
				view.setLoading(true);
				var params = {};
				record.requestDefaults(function(data){
  					record.data = data;
  					view.setLoading(false);
  					this.setEditing(false);
  					this.setReady(true);
  					this.fireEvent('onLoadDataComplete',record);
  					callFunc.call(this,true,record);
  				},params,this);
			}
			else {
				this.fireEvent('onLoadDataComplete',record);
  				callFunc.call(this,true,record);
  			}
		}
		else {
			view.setLoading(true);
			var id = record.getId();
			var model = Ext.ModelManager.getModel(record.modelName);
			//根据当前ID重新向后台请求Model数据
  			model.applyload(id,{
				scope: this,
				instance: record,
				success: function(result, operation){
					record.data = result.data;
					view.setLoading(false);
  					this.setEditing(false);
  					this.setReady(true);
  					this.fireEvent('onLoadDataComplete',record);
  					callFunc.call(this,true,record);
				},
				failure: function(record, operation){
					view.setLoading(false);
					this.setReady(false);
					callFunc.call(this,false,record);
					var msg = operation.request.proxy.reader.rawData.message;
				    Ext.Msg.alert('提示', msg);
				}
			});
		}		
	
	},	

	doChildContainerCreateBefore: function(tabItem,appParams,viewParams){
		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onChildContainerCreateBefore){
					var succ = this.mixins[index].onChildContainerCreateBefore.call(this,tabItem,appParams,viewParams);
					if (!succ){
						return false;
					}
				}
			}
		}		
		return this.onChildContainerCreateBefore(tabItem,appParams,viewParams);
	},
	
	onStoreSyncBefore: function(store){
		return true;
	},
	
	doStoreSyncBefore: function(store){
		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onStoreSyncBefore){
					var succ = this.mixins[index].onStoreSyncBefore.call(this,store);
					if (!succ){
						return false;
					}
				}
			}
		}		
		return this.onStoreSyncBefore(store);
	},
	
	/**【同步Store方法】
	 * 
	 * @param {} store
	 */
	doSyncStore: function(store,form){
		if (form && form.getForm().hasUpload()){
			var model = store.createModel();
			var actionUrl = store.getActionUrl() || this.getActionUrl(model);
			var actionBean = store.getActionBean() || ((actionUrl == model.getActionUrl()) ? '' : model.getActionBean());
			var operation = this.getAdding() ? 'save' : 'update';
			if (actionBean == ''){
				operation += 'Return';
			}
			var me = this;
			form.submit({
				url:Ext.String.format('{0}Action!{1}{2}.action',actionUrl,operation,actionBean),
				clientValidation : true,
				waitMsg : '正在添加请稍后',
				waitTitle : '提示',
				success : function(form, action) {
					me.setEditing(false);
					me.setAdding(false);
					if (action.result.data && action.result.data.length > 0){
						var record = me.get('record');
						record.data = action.result.data[0];
						me.fireEvent('onStoreSyncComplete',record);
						me.onStoreSyncComplete(record);
						var callController = me.get('callController');
						if (callController){
							callController.onStoreSyncComplete(record);
						}
					}
					else {
						me.fireEvent('onStoreSyncComplete');
						me.onStoreSyncComplete();
					}
				},
				failure : function(form, action) {
					me.setEditing(false);
					Ext.Msg.alert('添加失败', action.result.message);
				}					
			});
		}
		else {
			var adding = this.getAdding();
			if (adding && form){
				var record = this.get('record');
				store.add(record);
			}
			var canBefore = this.doStoreSyncBefore(store);
			var canSync = store.canSync();
			if (canBefore && canSync){
				this.getView().setLoading(true);			
				store.sync({
					success: function(batch, options) {
					 	this.setEditing(false);
					 	this.setAdding(false);
					 	var operation = options.operations;
					 	var model = operation.create || operation.update || operation.destroy;
					 	var record = this.get('record') || model[0];
					 	record.data = model[0].data;
						this.fireEvent('onStoreSyncComplete',record);
						this.onStoreSyncComplete(record);
					 	this.getView().setLoading(false);
			    	},
				    failure: function(batch, options) {
				    	var msg = options.batch.proxy.reader.rawData.message;
				    	Ext.Msg.alert('提示', msg);
				    	store.rejectChanges();
				    	this.fireEvent('onStoreSyncError',options);
			    		this.getView().setLoading(false);
			    		this.setEditing(false);
				    },
			    	scope: this
				});
			}
		}
	},
	
  	onBeforeAddRecord: function(){
		return true;
	},
	
	doBeforeAddRecord: function(){
		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onBeforeAddRecord){
					var succ = this.mixins[index].onBeforeAddRecord.call(this);
					if (!succ){
						return false;
					}
				}
			}
		}		
		return this.onBeforeAddRecord();
	},
	
	//◎【Model创建时执行 ,子类可以实现】
  	onCreateRecord: function(component/*在哪个控件上创建*/,record/*创建Model*/){},
	doCreateRecord: function(component,record){
 		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onCreateRecord){
					this.mixins[index].onCreateRecord.call(this,component,record);
				}
			}
		}
		this.onCreateRecord(component,record); 		
  	},
	//◎【Model选中时执行 ,子类可以实现】
  	onNavItemSelection: function(component/*在哪个控件上选中*/,record/*选中Model*/){},
  	doNavItemSelection: function(component,record){
   		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onNavItemSelection){
					this.mixins[index].onNavItemSelection.call(this,component,record);
				}
			}
		}
		this.onNavItemSelection(component,record);
  	},
  	//◎【Model选中时执行 ,子类可以实现】
  	onGridItemSelection: function(component/*在哪个控件上选中*/,record/*选中Model*/){},
  	doGridItemSelection: function(component,record){
   		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onGridItemSelection){
					this.mixins[index].onGridItemSelection.call(this,component,record);
				}
			}
		}
		this.onGridItemSelection(component,record);
  	},
  	//◎【重置命令工具栏视图 ,子类可以实现】
  	onResetToolBar: function(toolbar){},
  	doResetToolBar: function(toolbar){
   		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onResetToolBar){
					this.mixins[index].onResetToolBar.call(this,toolbar);
				}
			}
		}
   		this.onResetToolBar(toolbar);
  	},
  	//◎【初始化命令工具栏视图 ,子类可以实现】
	onInitToolBar: function(toolbar){},
  	doInitToolBar: function(toolbar){
   		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onInitToolBar){
					this.mixins[index].onInitToolBar.call(this,toolbar);
				}
			}
		}
   		this.onInitToolBar(toolbar);
  	},
  	//◎【列表Store加载前执行 ,子类可以实现】
  	onBeforeLoad: function(store,params){
  	},
  	doBeforeLoad: function(store,params){
  		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onBeforeLoad){
					this.mixins[index].onBeforeLoad.call(this,store,params);
				}
			}
		}
		var constParam = this.get('constParam') || {};
  		Ext.apply(params,constParam);
  		var callParam = this.get('callParam');
		if (callParam && Ext.isFunction(callParam)){
			callParam.call(this,params);
		}
		this.onBeforeLoad(store,params);  		
  	},
  	//◎【列表Store加载前执行 ,子类可以实现】
  	onTreeBeforeLoad: function(store,params){
  	},
  	doTreeBeforeLoad: function(store,params){
  		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onTreeBeforeLoad){
					this.mixins[index].onTreeBeforeLoad.call(this,store,params);
				}
			}
		}
		this.onTreeBeforeLoad(store,params);  		
  	},
  	//◎【列表Store加载前执行 ,子类可以实现】
  	onNavBeforeLoad: function(store,params){
  	},
  	doNavBeforeLoad: function(store,params){
  		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onNavBeforeLoad){
					this.mixins[index].onNavBeforeLoad.call(this,store,params);
				}
			}
		}
		this.onNavBeforeLoad(store,params);  		
  	},
  	//◎【下拉列表Store加载前执行 ,子类可以实现】
  	onComboBeforeLoad: function(component,store,params){
  	},
  	doComboBeforeLoad: function(component,store,params){
  		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onComboBeforeLoad){
					this.mixins[index].onComboBeforeLoad.call(this,component,store,params);
				}
			}
		}
		this.onComboBeforeLoad(component,store,params);  		
  	},
  	doViewInitComponent: function(viewConfig){
  		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onViewInitComponent){
					this.mixins[index].onViewInitComponent.call(this,viewConfig);
				}
			}
		}
		this.onViewInitComponent(viewConfig);  		
  	}, 	
  	//◎【新增方法】
  	doCreate: function(){},
  	
  	//◎【保存方法】
  	doSave: function(){},
  	
  	//◎【关闭方法】
  	doClose: function(){},
  	
  	//◎【查看方法】
  	doEdit: function(){},
  	
  	//◎【取消方法】
  	doCancel: function(){},
  	
  	//◎【删除方法】
  	doRemove: function(){},
  	
  	//◎【刷新方法】
  	doRefresh: function(){},
  	
	/**
	 * 【获取视图参数appParams内的属性值】
	 * @param {} key
	 * @return {}
	 */
	get: function(key){
		var view = this.getView();
		var params = view.getAppParams ? view.getAppParams() : null;
		if(params){
			return params[key];
		}else{
			return null;
		}
	},
	
	/**
	 * 设置视图参数appParams内的属性值
	 * @param {} key
	 * @param {} value
	 */
	set: function(key,value){
		var view = this.getView();
		var params = view.getAppParams ? view.getAppParams() : null;
		if (params){
			params[key] = value;
		}
	},
	getActionUrl: function(model){
		return this.actionUrl || (model ? model.getActionUrl() : null);
	},
	
	//◎【检查Model能否设置默认值】
	canDefaults: function(model){
		return model.canDefaults();
	},
	
	//◎【检查Model能否编辑】
	canEdit: function(record,colname){
		return record.canEdit(colname);
	},
	
	//◎【检查Model能否删除】
	canRemove: function(record){
		return record.canRemove();
	},
	
	/**【将指定的Model转换成只包含{id,version,clazzname}一个属性的Js对象】
	 * @param {} model
	 * @param {} name
	 * @return {}
	 */
	getJSONBean: function(model,name){
		var bean = {
			id: model.data.id,
			clazzname: model.data.clazzname,
			version: model.data.version
		};
		if (!name){
			name = 'name';
		}
		bean[name] = model.get(name);
		return bean;
	},
	/**
	 * 在视图中查找指定了itemId的配置对象
	 * @param {} viewConfig
	 * @param {} itemId
	 * @return {}
	 */
	down: function(viewConfig,itemId){
		for(var key in viewConfig){
			var obj = viewConfig[key];
			if (Ext.isObject(obj) || Ext.isArray(obj)){
				if (this.isDigital.test(key) || key == 'buttons' || key == 'tbar' || key == 'bbar' || key == 'items' || key == 'dockedItems' || key == 'tools'){
					var config = this.down(obj,itemId);
					if (config){
						return config;
					}
				}
			}
			else { 
				if(key == 'itemId' && obj == itemId){
					return viewConfig;
				}
			}
		}
		return null;
	},
	onBeforeClose: function(){
		return true;
	},
	view_beforeclose: function(){
		return this.onBeforeClose();
	},
	view_show: function(){
		var view = this.getView();
		if (view.componentCls == "x-window"){
			if (Ext.isObject(this.mixins)){
				for(var index in this.mixins){
					if (this.mixins[index].onViewBoxReady){
						this.mixins[index].onViewBoxReady.call(this);
					}
				}
			}
			this.onViewBoxReady();
			var callFunc = this.get('callFunc');
	  		if (callFunc && Ext.isFunction(callFunc)){
	  			callFunc.call(this);
	  		}				
		}
	},
	view_boxready: function(){
		var view = this.getView();
		if (view.componentCls != "x-window"){
			if (Ext.isObject(this.mixins)){
				for(var index in this.mixins){
					if (this.mixins[index].onViewBoxReady){
						this.mixins[index].onViewBoxReady.call(this);
					}
				}
			}
			this.onViewBoxReady();
			var callFunc = this.get('callFunc');
	  		if (callFunc && Ext.isFunction(callFunc)){
	  			callFunc.call(this);
	  		}
		}
	},
	//◎【再添加组件之前执行 ,子类可以实现】
  	onBeforeAddViewComponent: function(container/*在哪个容器上添加*/,config/*配置对象*/){},
	doBeforeAddViewComponent: function(container,config){
		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onBeforeAddViewComponent){
					this.mixins[index].onBeforeAddViewComponent.call(this,container,config);
				}
			}
		}
		this.onBeforeAddViewComponent(container,config);
	},
	
  	queryViewComponent: function(view,selector){
  		return view ? view.down(selector) : null;
  	},
  	
  	selectViewComponent: function(view,selector){
  		return Ext.ComponentQuery.query(selector,view); 		
  	},
  	
  	/**
  	 * 在指定的视图下创建子部件
  	 * @param {} view
  	 * @param {} container
  	 * @param {} config
  	 */
  	addViewComponent: function(component,config,arr){
  		arr = arr || 'items';
		var widget = component.isComponent ? this.queryViewComponent(component,'#'+config.itemId) : null;
		if (!widget){
			if (config.itemId){
				this.doBeforeAddViewComponent(component,config);
				config.itemId = this.createWidgetId(config.itemId);
				Ext.apply(config,{
					setVisibility: function(visible){
						this.setVisible(visible);
						if (!visible){
							this.privilege = undefined;
						}
					}
				});
				if (component.add){
					component.add(config);
				}
				else {
					if (component[arr]){
						if (!Ext.isArray(component[arr])){
							component[arr] = [];
						}
						component[arr].push(config);
					}
					else {
						Ext.Error.raise({
			            	msg: Ext.String.format('错误>>  {0}: 父组件未指定{1}属性.',Ext.getClassName(this),arr)
			          	});					
					}
				}
			}
			else {
				Ext.Error.raise({
	            	msg: Ext.String.format('错误>>  {0}: addViewComponent()添加的 组件未指定itemId.',Ext.getClassName(this))
	          	});
			}
		}
		else {
			component.itemId = this.createWidgetId(config.itemId);
		}
	},
  	createWidgetId: function(itemid){
 		var compid = Ext.String.format('{0}{1}',this.controllerType,itemid);
 		var identifier = this.control[itemid];
 		if (identifier){
 			identifier.selector = Ext.String.format('#{0}',compid);
 		}
 		return compid;
  	},
  	doCreateWidget: function(){
   		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onCreateWidget){
					this.mixins[index].onCreateWidget.call(this);
				}
			}
		}
  		this.onCreateWidget(); 		
  	},
  	doCreateWidgetAfter: function(){
   		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onCreateWidgetAfter){
					this.mixins[index].onCreateWidgetAfter.call(this);
				}
			}
		}
  		this.onCreateWidgetAfter(); 		
  	},
  	
  	doCreateComplete: function(){
   		if (Ext.isObject(this.mixins)){
			for(var index in this.mixins){
				if (this.mixins[index].onCreateComplete){
					this.mixins[index].onCreateComplete.call(this);
				}
			}
		}
  		this.onCreateComplete();
		var initParam = this.get('initParam');
		if (initParam && Ext.isObject(initParam)){
			Ext.apply(this,initParam);
		}  		
  	},
  	
  	onViewInitialize: function(){
  		Ext.suspendLayouts();
  		
  		this.doCreateWidget();
  		
  		this.doCreateWidgetAfter();
  		
  		Ext.resumeLayouts(true);
  		
  		this.callParent(arguments);
  	},
	seed: 1,
	/**
	 * 添加事件监听
	 * @param {} observer 事件源
	 * @param {} event	  事件名
	 * @param {} handler  处理函数
	 */
	doAddListener: function(observer,event,handler){
		if (observer && event && Ext.isFunction(handler)){
			if(observer.on){
				var target = 'observer'+this.seed;
				var func = 'function'+this.seed++;
				this[target] = observer;
				this[func] = handler;
				var events = {};
				events[event] = func;
				this.observe[target] = events;
				this.addObserver(target,events);
			}
		}
	}
});