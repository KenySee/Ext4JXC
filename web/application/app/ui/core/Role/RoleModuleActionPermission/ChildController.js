Ext.define('Keer.ui.core.Role.RoleModuleActionPermission.ChildController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
		'Keer.ui.selwin.MenuActionDesc.FindWindow'
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
		navStore: null,		
		navModel: null,
		navModelPropName: 'name',
		gridStore: null,		
		gridModel: null,
		menuStore: null
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
				selectionchange: 'onNavItemSelection',
				checkchange: function(node, checked){
					var check = node.get('checked');
					node.set('checked',!check);
				}
			}
		},
		toolnav_refresh:{	listeners: { click: 'doNavRefresh'	} },
		toolnav_expand: {	listeners: { click: 'doNavExpand'	} },
		toolnav_collapse:{	listeners: { click: 'doNavCollapse'	} },
		toolbar_add: 	{	listeners: { click: 'doCreate'	} },
		toolbar_remove: {	listeners: { click: 'doRemove'	} },
		toolbar_edit: 	{	listeners: { click: 'doEdit'	} }
	},
	//【监听Store事件】
	observe: {
		navStore: {
			beforeload: 'onNavStoreBeforeLoad'
		},
		gridStore:{
			beforeload: 'onGridStoreBeforeLoad'
		},
		menuStore: {
			load: 'onMenuStoreLoad'
		},
		callController: {
			onLoadDataComplete: 'onLoadDataComplete'
		}
	},
	onMenuStoreLoad: function(store, records){
		var navModel = this.getNavModel();
		while(navModel){
			var model = store.getById(navModel.data.id);
			navModel.set('checked',model != null);
			navModel = navModel.parentNode;
		}
	},
	//【调用者控制器加载数据完成时执行 】
	onLoadDataComplete: function(parent){
		this.callParent(arguments);
		var model = this.get('parent');
		this.set('parent',parent);
		if (model == null || model.data.id != parent.data.id){
			this.doNavRefresh();			
		}
		else {
			var navModel = this.getNavModel();
			if (navModel){
				var menuStore = this.getMenuStore();
				menuStore.load({
					params:{
						role: parent.get('id')
					}
				});
			}
		}
		this.set('parent',parent);
		var loadSync = this.get('loadSync');
		if (!loadSync){
			var store = this.getGridStore();
			store.load();
		}
		this.setEditing(false);
	},
	//【下拉列表Store加载前执行 】
  	onComboBeforeLoad: function(component,store,params){
  		this.callParent(arguments);
  		if (component.dataIndex == 'clazzScope'){
			var record = this.getGridModel();
			if (record){
				var menu = record.get('menu');
				Ext.apply(params,{
					clazzAction: menu.clazzAction,
					actionType: record.data.actionType
				});
			}
		}
  	},
  	//【编辑窗体创建之前执行】
	onEditWindowCreateBefore: function(component, appParams, viewParams){
		this.callParent(arguments);
		var model = this.getNavModel();
		if (model){
			Ext.apply(appParams,{
				xwindow:'ui-selwin-MenuActionDesc-findwindow',
				selMode:{
						selKey: 'actionType',
						addKey: 'actionType',
						addRef: true,
						callDefaultValueFun: function(model,record){
							var type = record.get('actionType')
							model.set('actionType',type);
							model.set('action',null);
						}
				},
				constParam: {
					clazzAction: model.get('clazzAction')
				}
			});
		}
		Ext.apply(viewParams,{
			canMulti: true,
			showType: 'grid'
		});
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
  		var model = this.getNavModel();
  		var parent = this.get('parent');
  		if (parent && model){
  			Ext.apply(params,{
  				menu: model.get('id'),
  				type: model.get('menuType'),
  				role: parent.get('id')
  			});
  		}
  	},
  	onCreateRecord: function(component,record){
     	this.callParent(arguments);
     	var parent = this.get('parent');
		if (parent){
			record.set('role',this.getJSONBean(parent,'name'));
		}
     	var grid = this.getGridView();
     	if (component == grid){
	  		var navModel = this.getNavModel();
	   		if (navModel){
	   			record.set('menu',navModel.data);
	   		}
	   	}
  	},
  	//【navStore加载前执行】
  	onNavBeforeLoad: function(store,params){
		this.callParent(arguments);
		var record = this.get('parent');
		if (record){
			Ext.apply(params,{
				role: record.get('id')
			});
		}
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
	doEdit: function(){
		var grid = this.getGridView();
		var store = this.getGridStore();
		var model = this.getGridModel();
		if (model){
//			this.doOpenEditWindow('ui-selwin-Role-findwindow',grid,store,model,false);
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
		this.doOpenEditWindow('ui-selwin-Role-findwindow',grid,store,model,true);
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
  	doNavExpand: function(){
		this.getNavView().expandAll();
	},
	doNavCollapse: function(){
		this.getNavView().collapseAll();
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
			this.doSwitchComponent(canRemove,'childRemove','canRemove','enable','disable');
			this.doSwitchComponent(canView,'childView','canView','enable','disable');
		}
		else {
			this.doSwitchComponent(false,'childRemove','canRemove','enable','disable');
			this.doSwitchComponent(false,'childView','canView','enable','disable');
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
				var menuType = model.get('menuType');
				if (menuType == 'MenuItem'){
					this.setAdding(true);
				}
				else {
					this.setAdding(false);
				}
				this.setReady(true);
			}
			else {
				panel.setTitle(Ext.String.format('当前{0}[未指定]',title));
				this.setReady(false);
				this.setAdding(false);
			}
		}
		return model;
	},
	applyAdding: function(adding){
		this.doSwitchComponent(adding,'childAdd','canAdd','enable','disable');
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
		Ext.each(this.childList,function(child){
			child.setReady(ready);
		});
		this.doSwitchComponent(ready,'childReady','ready','enable','disable');
		return ready;
	}
});