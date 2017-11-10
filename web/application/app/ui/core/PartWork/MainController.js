Ext.define('Keer.ui.core.PartWork.MainController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
		'Keer.ui.core.PartWork.EditWindow'
	],
	//【混入功能】
	mixins: {
	},
	//【成员变量】
	config: {
		actionUrl: null,
		controllerType: 'main',
		editing: null,
		ready: null,
		navStore: null,		
		navModel: null,
		navModelPropName: 'nickname',
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
		navStore: {
			beforeload: 'onNavStoreBeforeLoad'
		},
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
   		var navModel = this.getNavModel();
   		if (navModel){
   			Ext.apply(params,{
   				artist: navModel.get('id')
   			});
   		}
  	},
  	onCreateRecord: function(component,record){
     	this.callParent(arguments);
     	var grid = this.getGridView();
     	if (component == grid){
	  		var navModel = this.getNavModel();
	   		if (navModel){
	   			record.set('artist',this.getJSONBean(navModel,'name'));
	   		}
	   	}
  	},
  	//【navStore加载前执行】
  	onNavBeforeLoad: function(store,params){
		this.callParent(arguments);
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
			this.doOpenEditWindow('ui-core-PartWork-editwindow',grid,store,model,false);
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
		this.doOpenEditWindow('ui-core-PartWork-editwindow',grid,store,model,true);
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
			var writeSync = this.get('writeSync');
			if (writeSync){
				Ext.each(records,function(record){
					store.remove(record);
				});
			}
			else {
				Ext.Msg.confirm('提示','记录删除后将无法恢复,确认要删除吗?',function(btn){
					if (btn == 'yes'){				
						Ext.each(records,function(record){
							store.remove(record);
						});
						this.doSyncStore(store);
					}
				},this);
			}
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
	onNavStoreBeforeLoad: function(store, operation){
		operation.params = operation.params || {};
		this.setNavModel(null);
		this.doNavBeforeLoad(store,operation.params);
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
	onGridItemDbClick: function(grid, record, item, index){
		this.setGridModel(record);
		this.doEdit();
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