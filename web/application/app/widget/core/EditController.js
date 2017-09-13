Ext.define('Keer.widget.core.EditController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
	],
	//【混入功能】
	mixins: {
	},
	//【成员变量】
	config: {
		actionUrl: null,		// 【请求的Action名】
		controllerType: 'edit',	// 【控制器类型】
		footerBar: false,		// 【命令Toolbar是否显示在底部】
		saveMsgBox: true,		// 【保存成功消息框】
		editTitle: null,		// 【编辑状态时的窗口标题】
		callController: null	// 【调用者控制器】
	},	
    //【监听View事件】
	control: {
		cmdToolBar: {},
		editCloseTool: {
			selector: '#editCloseTool',
			listeners: {
				click: 'toolbar_exit_click'
			}
		},
		toolbar_add: 	{	listeners: { click: 'toolbar_add_click'		} },
		toolbar_save: 	{	listeners: { click: 'toolbar_save_click'	} },
		toolbar_cancel: {	listeners: { click: 'toolbar_cancel_click'	} },
		toolbar_exit: 	{	listeners: { click: 'toolbar_exit_click'	} },		
		winform: {	
			selector: '#editFormPanel',
			listeners: { 
				change: 'form_change'		    
			} 
		}
	},
	//【监听Observe事件】
	observe: {
		
	},
	
	applyEditing: function(editing){
		if (editing){
			this.getToolbar_save().enable();
			this.getToolbar_cancel().enable();
		}
		else {
			this.getToolbar_save().disable();
			this.getToolbar_cancel().disable();
		}
		this.doResetToolBar();
		return editing;
	},
	
	applyAdding: function(adding){
		var view = this.getView();
		var title = view.getWinTitle();
		if (adding){
			view.setTitle(Ext.String.format('添加{0}',title));
		}
		else {
			var editTitle = this.getEditTitle();
			view.setTitle(Ext.String.format('{0}',editTitle || '编辑'+title));
		}
		return adding;
	},
	
	//◎【Store同步完成方法】
	onStoreSyncComplete: function(record){
		this.callParent(arguments);
		this.set('record',record);
		this.doLoadData(record);
		var msgbox = this.getSaveMsgBox();
		if (msgbox){
			var me = this;
			Ext.Msg.show({
				title:'提示',
				msg: '保存成功,是否退出?',
				buttons: Ext.MessageBox.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(btn){
					if (btn == 'yes'){
						me.getView().close();
					}
				}
			});
		}
	},
	
	//◎【表单值改变事件】
    form_change: function(field, newVal, oldVal){
		var form = this.getWinform();
		var model = form.getRecord();
		var dirty = field.isDirty();
		if (model && dirty && this.canEdit(model,field.name)){
			this.setEditing(true);
		}
	},
	
	//◎【集合容器创建前执行】
	onChildContainerCreateBefore: function(tabItem/*创建窗体的配置对象*/,appParams/*控制器参数*/,viewParams/*视图参数*/){
	
	},
	
	//◎【下拉列表Store加载前执行 ,子类可以实现】
  	onComboBeforeLoad: function(component,store,params){
  		this.callParent(arguments);
  	},
  	
  	//◎【控制器部件创建完成后执行】
  	onCreateWidgetAfter: function(){
  		this.callParent(arguments);
  		var view = this.getView();
 		var toolbar = this.queryViewComponent(view,'toolbar');
 		if (toolbar && toolbar.items.length == 0){
 			toolbar.setVisible(false);
 		}
 		toolbar = this.queryViewComponent(view,'toolbar[ui=footer]');
 		if (toolbar && toolbar.items.length == 0){
 			toolbar.setVisible(false);
 		}
  	},
  	
	onCreateWidget: function(){
  		this.callParent(arguments);
  		var view = this.getView();
  		var footer = this.getFooterBar();
 		var toolbar = footer ? this.queryViewComponent(view,'toolbar[ui=footer]') : this.queryViewComponent(view,'toolbar');
 		if (toolbar){
			this.control.cmdToolBar.selector = Ext.String.format('#{0}',toolbar.getItemId());
			this.addViewComponent(toolbar,{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: footer ? 'left' : 'top', privilege: 'ADD'});
			this.addViewComponent(toolbar,{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign: footer ? 'left' : 'top', privilege: 'EDIT'});
			this.addViewComponent(toolbar,{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: footer ? 'left' : 'top', privilege: 'EDIT',hidden: footer});
			this.addViewComponent(toolbar,{text: footer ? '关闭' : '退出',itemId:'toolbar_exit',iconCls: footer ? 'x-button-close' : 'exit',iconAlign: footer ? 'left' : 'top'});
 		}
  	},

	//◎【视图初始化组件完成时执行】
	onViewInitComponent: function(viewConfig){
		this.callParent(arguments);
	},
	
  	onCreateComplete: function(){
  		this.callParent(arguments);
  	},
  	
	onViewBoxReady: function(){
  		this.callParent(arguments);
   		var form = this.getWinform();
    	var tabList = form.query('[xcontainer]');
		if (tabList && tabList.length > 0){
			var view = this.getView();
  			var me = this;
  			var app = view.getAppParams();
  			var tabItems = [];
  			Ext.each(tabList,function(tabItem){
  				var appConfig = {};
  				var viewConfig = {};
  				if (tabItem.appParams){
  					Ext.apply(appConfig,tabItem.appParams);
  				}
  				if (tabItem.viewParams){
  					Ext.apply(viewConfig,tabItem.viewParams);
  				}
  				me.onChildContainerCreateBefore(tabItem,appConfig,viewConfig);
  				Ext.apply(appConfig,{
  					editor: tabItem,			//表单field配置对象
  					childs: tabItem.name,		//集合属性名
  					parent: app.record,			//集合父对象
  					menudata: app.menudata,		//当前权限信息
  					callController: me			//调用者控制器
  				});
  				appConfig.initParam = appConfig.initParam || {};
  				Ext.applyIf(appConfig.initParam,{
					actionUrl: me.getActionUrl()
				});
  				Ext.apply(viewConfig,{
  					appParams:appConfig,
  					title: tabItem.fieldLabel
  				});
  				var tab = Ext.widget(tabItem.xcontainer,viewConfig);
  				tabItems.push(tab);
  			});
  			var tabPanel = view.down('tabpanel[region=center]');
  			tabPanel.add(tabItems);
  			tabPanel.setActiveTab(0);
		}  
		var add = this.get('adding');
		var rec = this.get('record');
  		this.setAdding(add);
  		this.doLoadData(rec);
  		var toolbar = this.getCmdToolBar();
		if (toolbar){
			this.doInitToolBar(toolbar);
		}  		
	},
	//◎【初始化命令工具栏 】
	onInitToolBar: function(toolbar){
		this.callParent(arguments);
	},
	
	//◎【重置命令工具栏 】
  	onResetToolBar: function(toolbar){
  		this.callParent(arguments);
  	},
  	
	//◎【检查Model能否设置默认值】
	canDefaults: function(model){
		return model.canDefaults();
	},
	
	//◎【检查Model能否编辑】
	canEdit: function(record,colname){
		return record.canEdit(colname);
	},
	
	//◎【将Record数据绑定到表单】
	doUpdateForm: function(record){
		var form = this.getWinform();
  		var fields = form.query('[name]');
  		Ext.each(fields,function(field){
			field.suspendCheckChange++;
		});
  		form.loadRecord(record);
  		var task = new Ext.util.DelayedTask(function(){
    		Ext.each(fields,function(field){
				field.suspendCheckChange--;
			});
		});
  		task.delay(1000);
  		var me = this;
		Ext.each(fields,function(field){
			if (!me.canEdit(record,field.name)){
				field.setReadOnly(true);
			}
		});
	},
	
	//◎【将表单数据回写到Record】
	doUpdateRecord: function(){
  		var form = this.getWinform();
  		var record = this.get('record');
  		var store = this.get('store');
  		record.phantom = this.getAdding();
	  	form.getForm().updateRecord(record);
	  	record.onSyncBefore(store,this);
  	},
  	
	//◎【根据转入record加载表单数据】
    doLoadData: function(record){
  		if (!record){
			record = this.getWinform().getRecord();
  		}
  		var view = this.getView();
  		var adding = this.getAdding();
		//如果是添加状态
		if (adding){
			if (this.canDefaults(record)){
				view.setLoading(true);
				var params = {};
				record.requestDefaults(function(data){
  					record.set(data);
  					view.setLoading(false);
  					this.setEditing(false);
  					this.doUpdateForm(record);
  					this.fireEvent('onLoadDataComplete',record);
  				},params,this);
			}
			else {
  				this.doUpdateForm(record);
  				this.fireEvent('onLoadDataComplete',record);
  				this.setEditing(false);
  			}
		}
		else {
			view.setLoading(true);
			var id = record.getId();
			var store = this.get('store');
			var model = Ext.ModelManager.getModel(record.modelName);
			//根据当前ID重新向后台请求Model数据
  			model.applyload(id,{
				scope: this,
				instance: record,
				success: function(result, operation){
					var record = this.get('record');
					record.data = result.data;
					record.onLoadComplete(operation);
					this.set('record',record);
					this.doUpdateForm(record);
  					this.setEditing(false);
					this.fireEvent('onLoadDataComplete',record);
					this.getView().setLoading(false);
				},
				failure: function(record, operation){
					this.getView().setLoading(false);
					var msg = operation.request.proxy.reader.rawData.message;
				    Ext.Msg.alert('提示', msg);
				}
			});
		}
    },
    
	//◎【清空表单数据】
	clearForm: function(form){
  		var fields = form.query('[name]');
  		Ext.each(fields,function(field){
			field.suspendCheckChange++;
		});
		Ext.each(fields,function(field){
			field.setValue(null);
		});
  		var task = new Ext.util.DelayedTask(function(){
    		Ext.each(fields,function(field){
				field.suspendCheckChange--;
			});
		});
  		task.delay(1000);		
	},
	
	//◎【编辑窗体创建之前执行】
	onEditWindowCreateBefore: function(component, appParams, viewParams){
		this.callParent(arguments);
	},
	
	/**
  	 * alias, 		打开窗口的别名
  	 * component,	从那个控件上打开
  	 * store,		当前的store
  	 * record,		当前的model
  	 * adding		是否添加(true:添加,false:修改)
  	 */
  	//◎【创建并打开编辑窗体】
  	doOpenEditWindow: function(alias,component,store,record,adding){
		this.callParent(arguments);
  	},
  	
  	//◎【查找再回窗体创建之前执行】
	onFindWindowCreateBefore: function(component, appParams, viewParams){

	},
	  		
	//◎【执行创建记录动作】
  	doAddRecord: function(store,model){
 		var form = this.getWinform();
		model.onCreateBefore(store,this);
		this.doCreateRecord(form,model);
		var control = this.getCallController();
		if (control){
			var view = control.getGridView();
			control.doCreateRecord(view,model);
		}
		this.setAdding(true);
		this.set('record',model);
		this.clearForm(form);
		this.doLoadData(model); 		
  	},
 	
	//◎【同步Store方法】
	doSyncStore: function(store){
		var me = this;
		var callController = this.get('callController');
		var form = this.getWinform();
		var model = form.getRecord();
		if (form.isValid()){
			this.doUpdateRecord();
			if (form.getForm().hasUpload()){
				var actionUrl = store.getActionUrl() || this.getActionUrl(model);
				var actionBean = store.getActionBean() || ((actionUrl == model.getActionUrl()) ? '' : model.getActionBean());
				var operation = this.getAdding() ? 'save' : 'update';
				if (actionBean == ''){
					operation += 'Return';
				}
				form.submit({
					url:Ext.String.format('{0}Action!{1}{2}.action',actionUrl,operation,actionBean),
					clientValidation : true,
					waitMsg : '正在添加请稍后',
					waitTitle : '提示',
					success : function(form, action) {
						if (action.result.data && action.result.data.length > 0){
							var record = me.get('record');
							record.data = action.result.data[0];
							me.fireEvent('onStoreSyncComplete',record);
							me.onStoreSyncComplete(record);
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
						Ext.Msg.alert('添加失败', action.result.message);
					}					
				});
			}
			else {
				if (this.getAdding()){
					model.onAddBefore(store,this);
					store.add(model);
				}
				this.callParent(arguments);
			}
		}		
	},
	
   	//◎【新增方法】
  	doCreate: function(){
		if (this.doBeforeAddRecord()){
			var store = this.get('store');
			var model = new store.model();
			this.doAddRecord(store,model);
		}
  	},
  	
  	//◎【保存方法】
  	doSave: function(){
		var store = this.get('store');
		this.doSyncStore(store);
  	},
  	
  	//◎【取消方法】
  	doCancel: function(){
		var adding = this.getAdding();
		if (adding){
			var store = this.get('store');
			var model = new store.model();
			this.doAddRecord(store,model);			
		}
		else {
			this.doLoadData();
		}
  	},
  	
  	doClose: function(){
  		var win = this.getView();
  		var edit = this.getEditing();
  		if (edit){
	  		Ext.Msg.confirm('提示','表单未提交,是否关闭?',function(btn){
				if (btn == 'yes'){
					win.close();
				}
			});
  		}
  		else {
  			win.close();
  		}
  	},
  	
  	toolbar_add_click: function(){
		this.doCreate();		
	},
	
	toolbar_exit_click: function(){
		this.doClose();
	},
	
	toolbar_save_click: function(){
		this.doSave();
	},
	
	toolbar_cancel_click: function(){
		this.doCancel();
	}	
});