Ext.define('Keer.ui.core.Role.MainController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
	],
	//【混入功能】
	mixins: {
	},
	//【成员变量】
	config: {
		actionUrl: 'Role',
		controllerType: 'main',
		editing: null,
		ready: null,
		moduleActionPermissionsStore: null,
		gridStore: null,		
		gridModel: null	
	},
	//【监听View事件】
	control: {
		cmdToolBar:{},
		mainPanel:{},
		gridView:		{	
			listeners: {
				itemdblclick: 'onGridItemDbClick',
				selectionchange: 'onGridItemSelection'
			}
		},
		childPanel:{},
		winform:{},
		navToolBar:{},
		toolbar_add: 	{	listeners: { click: 'doCreate'	} },
		toolbar_save: 	{	listeners: { click: 'doSave'	} },
		toolbar_cancel: {	listeners: { click: 'doCancel'	} },
		toolbar_remove: {	listeners: { click: 'doRemove'	} },
		toolbar_refresh:{	listeners: { click: 'doRefresh'	} }
	},
	//【监听Store事件】
	observe: {
		gridStore:{
			beforeload: 'onGridStoreBeforeLoad'
		}
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
	//【编辑窗体或查找再回窗体完成记录添加后执行】
	onSelectRecordComplete: function(selected){
		this.callParent(arguments);
	},
	//【gridStore加载前执行】
	onBeforeLoad: function(store,params){
  		this.callParent(arguments);
  	},
	onViewBoxReady: function(){
		var loadSync = this.get('loadSync');
		if (!loadSync){
			this.doRefresh();
		}
		var toolbar = this.getCmdToolBar();
		this.doInitToolBar(toolbar);
		this.setEditing(false);
	},
	doCreate: function(model){
		var store = this.getGridStore();
		var model = model.isModel ? model : store.createModel();
		this.doAddRecord(store,model);		
	},
	doAddRecord: function(store,model){
		var grid = this.getGridView();
		this.setGridModel(model);
		this.setAdding(true);
		this.setEditing(true);
		this.doReset();
	},
	onCreateRecord: function(component,record){
     	this.callParent(arguments);
  	},
	doSave: function(){
		var store = this.getGridStore();
		var form = this.getWinform();
		var record = form.getRecord();
		form.updateRecord(record);
		var add = this.getAdding();
		if (add){
			store.add(record);
		}
		var writeSync = this.get('writeSync');
		if (writeSync){
			var callController = this.get('callController');
			if (callController){
				callController.doSave();
			}
		}
		else {
			this.doSyncStore(store);
		}		
	},
	onStoreSyncComplete: function(model){
		this.setEditing(false);
	},
	doCancel: function(){
		var grid = this.getGridView();
		var selModel = grid.getSelectionModel();
		var records = selModel.getSelection();
		this.onGridItemSelection(selModel,records);
		this.setEditing(false);
	},
	doReset: function(){
		var record = this.getGridModel();
		if (record){
			var view = this.getChildPanel();
			this.doLoadModel(view,record,this.loadFunc);
		}
		else {
			var store = this.getGridStore();
			var model = store.createModel();
			this.doUpdateForm(model);
			this.setReady(false);
		}
	},
	doUpdateForm: function(record){
		var form = this.getWinform();
  		form.loadRecord(record);
	},	
	doRemove: function(){
		var model = this.getGridModel();
		if (model){
			Ext.Msg.confirm('提示','记录删除后将无法恢复,确认要删除吗?',function(btn){
				if (btn == 'yes'){
					var store = this.getGridStore();
					store.remove(model);
					var writeSync = this.get('writeSync');
					if (!writeSync){
						this.doSyncStore(store);
					}
				}
			},this);
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
	doRefresh: function(){
		var loadSync = this.get('loadSync');
		if (loadSync){
			var callController = this.get('callController');
			if (callController){
				callController.doCancel();
				this.setEditing(false);
			}			
		}
		else {
			var store = this.getGridStore();
			store.load();
		}
	},
	onGridStoreBeforeLoad: function(store, operation){
		operation.params = operation.params || {};
		this.doBeforeLoad(store,operation.params);
	},
	onGridItemSelection: function(selModel,selected){
		if (selected && selected.length > 0){
			this.setGridModel(selected[0]);
		}
		else {
			this.setGridModel(null);
		}
		this.doReset();
		var toolbar = this.getCmdToolBar();
		this.doResetToolBar(toolbar);	
	},
	onGridItemDbClick: function(grid, record, item, index){
		this.setGridModel(record);
	},
	onResetToolBar: function(toolbar){
		var model = this.getGridModel();
		if (model){
			var canRemove = this.canRemove(model);
			var canView = this.canEdit(model,'id');
			this.doSwitchComponent(canRemove,'mainRemove','canRemove','enable','disable');
			this.doSwitchComponent(canView,'mainView','canView','enable','disable');
		}
		else {
			this.doSwitchComponent(false,'mainRemove','canRemove','enable','disable');
			this.doSwitchComponent(false,'mainView','canView','enable','disable');
		}
	},
	onBeforeAddViewComponent: function(container,config){
		if (config.itemId == 'querybar_search'){
			Ext.apply(config,{
				mainReady: 'ready',
				mainEdit: '!editing'
			});
		}
	},
	applyAdding: function(adding){
		this.doSwitchComponent(adding,'mainAdd','adding','enable','disable');
		if (adding){
			this.doSwitchComponent(true,'addFocus','adding','focus','focus');
		}
		return adding;
	},
	applyEditing: function(editing){
		this.doSwitchComponent(editing,'mainEdit','editing','enable','disable');
		return editing;
	},
	applyReady: function(ready){
		if (!ready){
			this.setEditing(false);
		}
		Ext.each(this.childList,function(child){
			child.setReady(ready);
		});
		this.doSwitchComponent(ready,'mainReady','ready','enable','disable');
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