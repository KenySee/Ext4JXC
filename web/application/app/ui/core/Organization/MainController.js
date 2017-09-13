Ext.define('Keer.ui.core.Organization.MainController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
		'Keer.ui.core.Organization.EditWindow'
	],
	//【混入功能】
	mixins: {
	},
	//【成员变量】
	config: {
		actionUrl: 'Organization',
		controllerType: 'main',
		editing: null,
		navStore: null,		
		navModel: null,
		gridStore: null,		
		gridModel: null	
	},
	//【监听View事件】
	control: {
		cmdToolBar:{},
		navToolBar:{},
		navPanel:{},
		mainPanel:{},
		navView:  {	
			listeners: { 
				selectionchange: 'onNavItemSelection'	
			}
		},
		gridView: {	
			listeners: { 
				selectionchange: 'onGridItemSelection'
			}
		},
		toolbar_add: 	{	listeners: { click: 'doCreate'	} },
		toolbar_save: 	{	listeners: { click: 'doSave'	} },
		toolbar_cancel: {	listeners: { click: 'doCancel'	} },
		toolbar_edit: 	{	listeners: { click: 'doEdit'	} },
		toolbar_remove: {	listeners: { click: 'doRemove'	} },
		toolbar_refresh:{	listeners: { click: 'doRefresh'	} },
		toolnav_refresh:{	listeners: { click: 'doNavRefresh'	} },
		toolnav_expand: {	listeners: { click: 'doNavExpand'	} }	,
		toolnav_collapse:{	listeners: { click: 'doNavCollapse'	} }			
	},
	//【监听Store事件】
	observe: {
		gridStore:{
			beforeload: 'onGridStoreBeforeLoad'
		}
	},
	doAddRecord: function(store,model){
		var grid = this.getGridView();
		var editor = grid.getPlugin('cellplugin');
		this.doCreateRecord(grid,model);
		store.add(model);
		var endRow = store.getCount() - 1;
		editor.startEditByPosition({row: endRow, column: 1});
	},
	onCreateRecord: function(component,record){
		var model = this.getNavModel();
		if (model){
			record.set('parent',this.getJSONBean(model));
		}
	},
	onStoreSyncComplete: function(model){
		this.setEditing(false);
	},	
	onViewBoxReady: function(){
		this.setNavModel(null);
		this.doRefresh();
		this.setEditing(false);
	},
	doCreate: function(model){
		var store = this.getGridStore();
		var model = model.isModel ? model : store.createModel();
		var clazzname = model.get('clazzname');
		var allWidget = clazzname.split('.');
		var len = allWidget.length;
		var clazzType = allWidget[len-1];
		if (clazzType.indexOf('Member') > 0){
			var grid = this.getGridView();
			this.doOpenEditWindow('ui-core-Organization-editwindow',grid,store,model,true);
		}
		else {
			this.doAddRecord(store,model);
		}
	},
	doSave: function(){
		var store = this.getGridStore();
		this.doSyncStore(store);
	},
	doCancel: function(){
		this.doRefresh();
		this.setEditing(false);
	},
	doEdit: function(){
		var model = this.getGridModel();
		if (model){
			var grid = this.getGridView();
			var store = this.getGridStore();
			this.doOpenEditWindow('ui-core-Organization-editwindow',grid,store,model,false);
		}
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
					this.doSyncStore(store);
				}
			},this);
		}
		else {
			Ext.Msg.alert('提示','记录前请选择记录');
		}
	},
	doRefresh: function(){
		var store = this.getGridStore();
		store.load();		
	},
	doNavRefresh: function(){
		this.setNavModel(null);
		this.doRefresh();
		var button = this.getToolbar_add();
		button.findMenu();
		var navStore = this.getNavStore();
  		navStore.load({params:{navLoad:true}});
	},
	doNavExpand: function(){
		this.getNavView().expandAll();
	},
	doNavCollapse: function(){
		this.getNavView().collapseAll();
	},
	onBeforeLoad: function(store,params){
		var model = this.getNavModel();
		if (model){
			Ext.apply(params,{
				node: model.get('id')
			});
		}
	},
	onGridStoreBeforeLoad: function(store, operation){
		operation.params = operation.params || {};
		this.doBeforeLoad(store,operation.params);
	},	
	onNavItemSelection: function(selModel,selected){
		var store = this.getGridStore();
		if (selected && selected.length > 0){
			this.setNavModel(selected[0]);
			var button = this.getToolbar_add();
			button.loadMenu(selected[0]);
		}
		else {
			this.setNavModel(null);
		}
		this.doRefresh();
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
			this.doSwitchComponent(canRemove,'mainRemove','canRemove','enable','disable');
			var canView = model.data.orgType == 'USER';
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
				mainEdit: '!editing',
				mainReady:'ready'
			});
		}
	},
	applyNavModel: function(model){
		var title = this.getNavPanel().title;
		if (title){
			var view = this.getView();
			var panel = this.getMainPanel();
			if (model){
				panel.setTitle(Ext.String.format('当前{0}[{1}]',title,model.get('name')));
				var ready = model.data.orgType != 'USER';
				this.doSwitchComponent(ready,'mainReady','ready','enable','disable');
			}
			else {
				panel.setTitle(Ext.String.format('当前{0}[未指定]',title));
				this.doSwitchComponent(true,'mainReady','ready','enable','disable');
			}
		}
		return model;
	},	
	applyEditing: function(editing){
		this.doSwitchComponent(editing,'mainEdit','editing','enable','disable');
		return editing;
	}
});