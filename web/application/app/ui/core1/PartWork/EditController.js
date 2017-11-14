Ext.define('Keer.ui.core1.PartWork.EditController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
	],
	//【混入功能】
	mixins: {
	},
	//【成员变量】
	config: {
		//【请求URL】
		actionUrl: null,
		
		//【控制器类型】
		controllerType: 'edit',
		
		//【是否正在编辑】
		editing: null,
		
		//【是否添加记录】
		adding: null,
		
		//【调用者控制器的Store】
		gridStore: null,
		
		//【是否准备就绪】
		ready: null
	},
	//【监听View事件】
    control: {
    	cmdToolBar:{},
    	winform:{},
    	toolbar_add: 	{	listeners: { click: 'doCreate'	} },
		toolbar_save: 	{	listeners: { click: 'doSave'	} },
		toolbar_cancel: {	listeners: { click: 'doCancel'	} },
		toolbar_close: 	{	listeners: { click: 'doClose'	} }
	},
	//【监听Store事件】
	observe: {
	},
	//【下拉列表Store加载前执行 】
  	onComboBeforeLoad: function(component,store,params){
  		this.callParent(arguments);
  	},
  	//【编辑窗体创建之前执行】
	onEditWindowCreateBefore: function(component, appParams, viewParams){
		this.callParent(arguments);
	},
	//【查找再回窗体创建之前执行】
	onFindWindowCreateBefore: function(component, appParams, viewParams){
		this.callParent(arguments);
	},
	doCreate: function(model){ 
		var store = this.get('store');
		var model = model.isModel ? model : store.createModel();
		var form = this.getWinform();
		this.doCreateRecord(form,model);
		var callController = this.get('callController');
		if (callController){
			callController.doCreateRecord(form,model);
		}
		this.set('record',model);
		this.doUpdateForm(model);
		this.setAdding(true);
		this.setEditing(true);
	},
	doSave: function(){
		var store = this.get('store');
		var form = this.getWinform();
		var record = this.get('record');
		form.updateRecord(record);
		var autosync = this.get('autosync');
		if (autosync){
			this.doSyncStore(store,form);
		}
		else {
			this.doCreateSelectRecord(record);
			this.setAdding(false);
			this.setEditing(false);
			this.doClose();
		}
	},
	onStoreSyncComplete: function(record){
		this.doCreateSelectRecord(record);
		var autoclose = this.get('autoclose');
		if (autoclose){
			this.doClose();	
		}
		else {
			var view = this.getView();
			this.doLoadModel(view,record,this.loadFunc);
		}		
	},
	loadFunc: function(success,record){
		if (success){
  			this.doUpdateForm(record);
  			var canEdit = this.canEdit(record,'id');
  			this.setReady(canEdit);
		}
		else {
			this.setReady(false);
		}
	},
	doCancel: function(){
		var record = this.get('record');
		this.doUpdateForm(record);
		this.setEditing(false);
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
	//◎【将Record数据更新到表单】
	doUpdateForm: function(record){
		var form = this.getWinform();
  		form.loadRecord(record);
  		this.setReady(true);
	},
	onInitToolBar: function(toolbar){
		var toolbar_save = this.getToolbar_save();
		var toolbar_close = this.getToolbar_close();
		var autosync = this.get('autosync');
		toolbar_save.setText(autosync ? '保存' : '确定');
		toolbar_close.setText(autosync ? '关闭' : '取消');
	},
	onViewBoxReady: function(){
  		this.callParent(arguments);
  		var form = this.getWinform();
  		var upload = form.getForm().hasUpload();
  		if (upload){
  			this.set('autosync',upload);
  		}
  		var view = this.getView();
		var store  = this.get('store');
		var adding = this.get('adding');
		var record = this.get('record');
  		this.setAdding(adding);
  		this.setEditing(false);
  		this.doLoadModel(view,record,this.loadFunc);
  		var toolbar = this.getCmdToolBar();
		if (toolbar){
			this.doInitToolBar(toolbar);
		}  		
	},
	applyAdding: function(adding){
		this.doSwitchComponent(adding,'editAdd','adding','enable','disable');
		if (adding){
			this.doSwitchComponent(true,'addFocus','adding','focus','focus');
		}
		return adding;
	},
	applyEditing: function(editing){
		this.doSwitchComponent(editing,'editEdit','editing','enable','disable');
		return editing;
	},
	applyReady: function(ready){
		if (!ready){
			this.setEditing(false);
		}
		this.doSwitchComponent(ready,'editReady','ready','enable','disable');
		this.doSwitchComponent(ready,'childReady','ready','enable','disable');
		var form = this.getWinform();
  		var fields = form.query('[name]');
  		Ext.each(fields,function(field){
			field.setReadOnly(!ready);
		});
		if (!ready){
			form.reset();
		}
		return ready;
	}	
});