Ext.define('Keer.ui.${upfolder}.${appfolder}.MainController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
		<#if layout?lower_case != 'form'>
		'Keer.ui.${upfolder}.${appfolder}.EditWindow'
		</#if>
	],
	//【混入功能】
	mixins: {
	},
	//【成员变量】
	config: {
		actionUrl: '${appfolder}',
		controllerType: 'main',
		editing: null,
		ready: null,
		<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
		navStore: null,		
		navModel: null,
		navModelPropName: '${categoryNav.displayField}',
		<#else>
		<#list toChildHiddenModel() as item>
		${item.dataIndex}Store: null,
		</#list>
		</#if>
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
		<#if layout?lower_case == 'form'>
		childPanel:{},
		winform:{},
		navToolBar:{},
		</#if>
		<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
		navPanel:{},
		navToolBar:{},
		navView:{	
			listeners: { 
				selectionchange: 'onNavItemSelection'	
			}
		},
		toolnav_refresh:{	listeners: { click: 'doNavRefresh'	} },
		<#if layout?lower_case == 'treenav'>
		toolnav_expand: {	listeners: { click: 'doNavExpand'	} },
		toolnav_collapse:{	listeners: { click: 'doNavCollapse'	} },
		</#if>	
		</#if>
		toolbar_add: 	{	listeners: { click: 'doCreate'	} },
		toolbar_save: 	{	listeners: { click: 'doSave'	} },
		toolbar_cancel: {	listeners: { click: 'doCancel'	} },
		toolbar_remove: {	listeners: { click: 'doRemove'	} },
		<#if layout?lower_case != 'form'>
		toolbar_edit: 	{	listeners: { click: 'doEdit'	} },
		</#if>
		toolbar_refresh:{	listeners: { click: 'doRefresh'	} }
	},
	//【监听Store事件】
	observe: {
		<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
		navStore: {
			beforeload: 'onNavStoreBeforeLoad'
		},
		</#if>
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
   		<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
   		var navModel = this.getNavModel();
   		if (navModel){
   			Ext.apply(params,{
   				${categoryField}: navModel.get('id')
   			});
   		}
   		</#if>
  	},
  	onCreateRecord: function(component,record){
     	this.callParent(arguments);
     	<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
     	var grid = this.getGridView();
     	if (component == grid){
	  		var navModel = this.getNavModel();
	   		if (navModel){
	   			record.set('${categoryField}',this.getJSONBean(navModel,'${categoryNav.displayField}'));
	   		}
	   	}
   		</#if>		
  	},
  	<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
  	//【navStore加载前执行】
  	onNavBeforeLoad: function(store,params){
		this.callParent(arguments);
	},
	</#if>
	onViewBoxReady: function(){
		var loadSync = this.get('loadSync');
		if (!loadSync){
			<#if layout?lower_case == 'treenav'>
			this.doRefresh();
			<#else>
			<#if layout?lower_case == 'grid' || layout?lower_case == 'form'>
			this.doRefresh();
			<#else>
			this.doNavRefresh();
			</#if>
			</#if>
		}
		var toolbar = this.getCmdToolBar();
		this.doInitToolBar(toolbar);
		this.setEditing(false);
	},
	<#if layout?lower_case != 'form'>
	doEdit: function(){
		var grid = this.getGridView();
		var store = this.getGridStore();
		var model = this.getGridModel();
		if (model){
			this.doOpenEditWindow('ui-${aliasPrefix}-${appfolder}-editwindow',grid,store,model,false);
		}
		else {
			Ext.Msg.alert('提示','请选择记录');
		}
	},
	</#if>
	doCreate: function(model){
		var store = this.getGridStore();
		var model = model.isModel ? model : store.createModel();
		this.doAddRecord(store,model);		
	},
	doAddRecord: function(store,model){
		var grid = this.getGridView();
		<#if layout?lower_case == 'form'>
		this.setGridModel(model);
		this.setAdding(true);
		this.setEditing(true);
		this.doReset();
		<#else>
		<#if grid?lower_case == 'popup'>
		this.doOpenEditWindow('ui-${aliasPrefix}-${appfolder}-editwindow',grid,store,model,true);
		<#else>
		var editor = grid.getPlugin('cellplugin');
		this.doCreateRecord(grid,model);
		store.add(model);
		var endRow = store.indexOf(model);
		editor.startEditByPosition({row: endRow, column: 1});
		this.setAdding(true);
		this.setEditing(true);
		</#if>
		</#if>
	},
	doSave: function(){
		var store = this.getGridStore();
		<#if layout?lower_case == 'form'>
		var form = this.getWinform();
		var record = form.getRecord();
		form.updateRecord(record);
		var add = this.getAdding();
		if (add){
			store.add(record);
		}
		</#if>
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
		<#if layout?lower_case == 'form'>
		var grid = this.getGridView();
		var selModel = grid.getSelectionModel();
		var records = selModel.getSelection();
		this.onGridItemSelection(selModel,records);
		<#else>
		this.doRefresh();
		</#if>
		this.setEditing(false);
	},
	<#if layout?lower_case == 'form'>
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
	</#if>
	doRemove: function(){
		<#if layout?lower_case == 'form'>
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
		<#else>
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
		</#if>
	},
	<#if layout?lower_case == 'form'>
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
	</#if>
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
	<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
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
	</#if>
	<#if layout?lower_case == 'treenav'>
  	doNavExpand: function(){
		this.getNavView().expandAll();
	},
	doNavCollapse: function(){
		this.getNavView().collapseAll();
	},
	</#if>
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
		<#if layout?lower_case == 'form'>
		this.doReset();
		</#if>
		var toolbar = this.getCmdToolBar();
		this.doResetToolBar(toolbar);	
	},
	onGridItemDbClick: function(grid, record, item, index){
		this.setGridModel(record);
		<#if grid?lower_case == 'popup'>
		this.doEdit();
		</#if>
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
	<#if layout?lower_case == 'listnav' || layout?lower_case == 'treenav' || layout?lower_case == 'gridnav'>
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
	</#if>
	applyAdding: function(adding){
		this.doSwitchComponent(adding,'mainAdd','adding','enable','disable');
		<#if layout?lower_case == 'form'>
		if (adding){
			this.doSwitchComponent(true,'addFocus','adding','focus','focus');
		}
		</#if>
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
		<#if layout?lower_case == 'form'>
		var form = this.getWinform();
  		var fields = form.query('[name]');
  		Ext.each(fields,function(field){
			field.setReadOnly(!ready);
		});
		if (!ready){
			form.reset();
		}
		</#if>
		return ready;
	}
});