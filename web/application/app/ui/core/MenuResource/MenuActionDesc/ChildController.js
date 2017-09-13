Ext.define('Keer.ui.core.MenuResource.MenuActionDesc.ChildController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
	],
	//【混入功能】
	mixins: {
	},
	//【成员变量】
	config: {
		actionUrl: null,
		controllerType: 'child',
		editing: null,
		ready: null,
		gridStore: null,
		gridModel: null
	},
	
	//【监听View事件】
    control: {
		cmdToolBar:{},
		gridView: {	
			listeners: { 
				selectionchange: 'onGridItemSelection'
			}
		},
		toolbar_register: {
			listeners: {
				click: 'toolbar_register_click'
			}
		},
		toolbar_add: 	{	listeners: { click: 'doCreate'	} },
		toolbar_save: 	{	listeners: { click: 'doSave'	} },
		toolbar_cancel: {	listeners: { click: 'doCancel'	} },
		toolbar_remove: {	listeners: { click: 'doRemove'	} }
	},
	
	//【监听Store事件】
	observe: {
		gridStore:{
  			beforeload: 'onGridStoreBeforeLoad'
		},
		callController: {
			onStoreSyncComplete: 'onStoreSyncComplete'
		}
	},
	toolbar_register_click: function(){
		var model = this.get("parent");
		var control = this.get('callController');
		var view = this.getView();
		view.setLoading(true);
		Ext.Ajax.request({
			url: 'MenuResourceAction!resetMenuActions.action',
			method: 'post',
			params: {'beanId':model.get("id"), 'clazzAction': model.get("clazzAction")},
			success: function(response){
				view.setLoading(false);
				var result = Ext.decode(response.responseText);
				if (result.success) {
					control.doLoadModel(view,model,control.loadFunc);
				} else {
					Ext.Msg.alert('错误','<nobr>' + result.message +'</nobr>');
				}
			}
		});
	},
	onViewBoxReady: function(){
		var toolbar = this.getCmdToolBar();
		this.doInitToolBar(toolbar);
		this.setEditing(false);
	},
	doCreate: function(){
		var store = this.getGridStore();
		var model = store.createModel();
		this.doAddRecord(store,model);
	},
	doAddRecord: function(store,model){
		var grid = this.getGridView();
		var editor = grid.getPlugin('cellplugin');
		this.doCreateRecord(grid,model);
		store.add(model);
		var endRow = store.indexOf(model);
		editor.startEditByPosition({row: endRow, column: 1});
		this.setAdding(true);
	},
	doSave: function(){
		var callController = this.get('callController');
		if (callController){
			callController.doSave();
		}
	},
	doCancel: function(){
		var callController = this.get('callController');
		if (callController){
			callController.doCancel();
			this.setEditing(false);
		}
	},
	doRemove: function(){
		var store = this.getGridStore();
		var grid = this.getGridView();
		var selMode = grid.getSelectionModel();
		var records = selMode.getSelection();
		if (records && records.length > 0){
			Ext.each(records,function(record){
				store.remove(record);
			});
		}
		else {
			Ext.Msg.alert('提示','记录前请选择记录');
		}
	},
	onStoreSyncComplete: function(parent){
		this.set('parent',parent);
		this.setEditing(false);
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
		var toolbar = this.getCmdToolBar();
		this.doResetToolBar(toolbar);	
	},
	onInitToolBar: function(toolbar){
		toolbar.setVisible(false);	
	},
	onResetToolBar: function(toolbar){
		var model = this.getGridModel();
		if (model){
			var canRemove = this.canRemove(model);
			this.doSwitchComponent(canRemove,'childRemove','canRemove','enable','disable');
		}
		else {
			this.doSwitchComponent(false,'childRemove','canRemove','enable','disable');
		}
	},
	applyAdding: function(adding){
		this.doSwitchComponent(adding,'childAdd','adding','enable','disable');
		return adding;
	},
	applyEditing: function(editing){
		this.doSwitchComponent(editing,'childEdit','editing','enable','disable');
		return editing;
	},
	applyReady: function(ready){
		if (!ready){
			this.setEditing(false);
		}
		this.doSwitchComponent(ready,'childReady','ready','enable','disable');
		return ready;
	}
});