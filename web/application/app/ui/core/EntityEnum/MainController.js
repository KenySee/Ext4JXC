Ext.define('Keer.ui.core.EntityEnum.MainController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
		'Keer.ui.core.EntityEnum.EditWindow'
	],
	//【混入功能】
	mixins: {
	},
	//【成员变量】
	config: {
		actionUrl: 'EntityEnum',
		controllerType: 'main',
		editing: null,
		ready: null,
		navStore: null,		
		navModel: null,
		navModelPropName: 'name',
		gridStore: null,		
		gridModel: null	
	},
	//【监听View事件】
	control: {
		cmdToolBar:{},
		mainPanel:{},
		gridView:		{	
			listeners: {
				selectionchange: 'onGridItemSelection'
			}
		},
		navPanel:{},
		navToolBar:{},
		navView:{	
			listeners: { 
				selectionchange: 'onNavItemSelection'	
			}
		},
		toolnav_refresh:{	listeners: { click: 'doNavRefresh'	} },
		toolbar_add: 	{	listeners: { click: 'doCreate'	} },
		toolbar_save: 	{	listeners: { click: 'doSave'	} },
		toolbar_cancel: {	listeners: { click: 'doCancel'	} },
		toolbar_remove: {	listeners: { click: 'doRemove'	} },
		toolbar_edit: 	{	listeners: { click: 'doEdit'	} },
		toolbar_refresh:{	listeners: { click: 'doRefresh'	} }		
	},
	//【监听Store事件】
	observe: {
		gridStore:{
			beforeload: 'onGridStoreBeforeLoad'
		}
	},
	onViewBoxReady: function(){
		var loadSync = this.get('loadSync');
		if (!loadSync){
			this.doNavRefresh();
		}
		var toolbar = this.getCmdToolBar();
		this.doInitToolBar(toolbar);
		this.setEditing(false);
	},
	doEdit: function(){
		var grid = this.getGridView();
		var store = this.getGridStore();
		var model = this.getGridModel();
		if (model){
			this.doOpenEditWindow('ui-core-EntityEnum-editwindow',grid,store,model,false);
		}
		else {
			Ext.Msg.alert('提示','请选择记录');
		}
	},
	doCreate: function(model){
		var store = this.getGridStore();
		var model = model.isModel ? model : store.createModel();
		this.doAddRecord(store,model);		
	},
	doAddRecord: function(store,model){
		var grid = this.getGridView();
		var editor = grid.getPlugin('cellplugin');
		this.doCreateRecord(grid,model);
		store.add(model);
		var endRow = store.indexOf(model);
		editor.startEditByPosition({row: endRow, column: 2});
		this.setAdding(true);
		this.setEditing(true);
	},
	onCreateRecord: function(component,record){
		var model = this.getNavModel();
		if (model){
			record.set('clazzname',model.get('clazzname'));
			record.set('indexCls',model.get('indexCls'));
		}
	},
	doSave: function(){
		var store = this.getGridStore();
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
		this.doRefresh();
		this.setEditing(false);
	},
	doRemove: function(){
		var store = this.getGridStore();
		var grid = this.getGridView();
		var selMode = grid.getSelectionModel();
		var records = selMode.getSelection();
		if (records && records.length > 0){
			Ext.Msg.confirm('提示','记录删除后将无法恢复,确认要删除吗?',function(btn){
				if (btn == 'yes'){				
					Ext.each(records,function(record){
						store.remove(record);
					});
					var writeSync = this.get('writeSync');
					if (!writeSync){
						this.doSyncStore(store);
					}
				}
			},this);
		}
		else {
			Ext.Msg.alert('提示','记录前请选择记录');
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
	onNavItemSelection: function(selModel,selected){
		var store = this.getGridStore();
		if (selected && selected.length > 0){
			this.setNavModel(selected[0]);
			store.load();
		}
		else {
			this.setNavModel(null);
			store.loadData([]);
			var grid = this.getGridView();
			this.onGridItemSelection(grid.getSelectionModel(),null);
		}
	},
	doNavRefresh: function(){
		var store = this.getNavStore();
		store.load({params:{navLoad:true}});
	},
	onGridStoreBeforeLoad: function(store, operation){
		operation.params = operation.params || {};
		this.doBeforeLoad(store,operation.params);
		var model = this.getNavModel();
		if (model){
			Ext.apply(operation.params,{
				clazzname: model.get('clazzname')
			});
		}
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
	applyNavModel: function(model){
		var title = this.getNavPanel().title;
		if (title){
			var view = this.getView();
			var panel = this.getMainPanel();
			if (model){
				var prop = this.getNavModelPropName();
				panel.setTitle(Ext.String.format('当前{0}[{1}]',title,model.get(prop)));
				this.setReady(true);
			}
			else {
				panel.setTitle(Ext.String.format('当前{0}[未指定]',title));
				this.setReady(false);
			}
		}
		return model;
	},
	applyAdding: function(adding){
		this.doSwitchComponent(adding,'mainAdd','adding','enable','disable');
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
		return ready;
	}
});