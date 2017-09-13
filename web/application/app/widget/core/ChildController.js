Ext.define('Keer.widget.core.ChildController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
	],
	//【混入功能】
	mixins: {
	},
	//【成员变量】
	config: {
		actionUrl: null,			// 【请求的Action名】
		controllerType: 'child',	// 【控制器类型】
		navStore: null,				// 【Nav的Store】
		navModel: null,				// 【Nav当前选择的Model】
		navModelPropName: 'name', 	//【NavModel的标题属性】
		gridStore: null,		// 【Grid的Store】
		gridModel: null,		// 【Grid当前选择的Model】
		gridTitle: '标题',		// 【Grid标题】
		colEdit: 2,		    	// 【新增记录时默认第几列获得焦点】
		popupNew: true,			// 【是否允许弹出新增】
		inlineEdit: false,  	// 【是否允许行内编辑】
		allowDbClick: false, 	// 【是否允许双击】
		editing: null,			// 【是否正在编辑】
		saveButton: false,		// 【是否显示保存按钮】
		suspendStoreUpdate: 0,
		callController: null	// 【父控制器】
	},	
	//【监听View事件】
	control: {
		navPanel: {
			selector: '#childNavPanel'
		},
		gridPanel: {
			selector: '#childGridPanel'
		},
		cmdToolBar: {
			selector: '#childCmdToolbar'
		},
		navToolBar: {
			selector: '#childNavToolbar'
		},
		queryToolBar: {
			selector: '#childQueryToolbar'
		},
		navRefreshTool:{
			selector: '#childRefreshTool',
			listeners: {
				click: 'navRefreshTool_click'
			}
		},
		navExpandTool:{
			selector: '#childExpandTool',
			listeners: {
				click: 'navExpandTool_click'
			}		
		},
		navCollapseTool:{
			selector: '#childCollapseTool',
			listeners: {
				click: 'navCollapseTool_click'
			}
		},		
		navView: {
			selector: '#childNavView',
			listeners: {
				selectionchange: 'navView_selectionchange'
			}
		},
		gridView: {
			selector: '#childGridView',
			listeners: {
				selectionchange: 'gridView_selectionchange',
				itemclick: 'gridView_itemclick',
				itemdblclick: 'gridView_itemdblclick',
				beforeedit: 'gridView_beforeedit',
				edit: 'gridView_edit'
			}
		},
		toolbar_add: 	{	listeners: { click: 'toolbar_add_click'		} },
		toolbar_save: 	{	listeners: { click: 'toolbar_save_click'	} },
		toolbar_cancel: {	listeners: { click: 'toolbar_cancel_click'	} },
		toolbar_edit: 	{	listeners: { click: 'toolbar_edit_click'	} },
		toolbar_remove: {	listeners: { click: 'toolbar_remove_click'	} }
	},
	
	//【监听Observe事件】
	observe: {
		gridStore: {
  			add: 'gridStore_add',
  			update: 'gridStore_update',
  			remove: 'gridStore_remove',
  			load: 'gridStore_load',
  			beforeload: 'gridStore_beforeload'
  		},
  		navStore: {
  			load: 'navStore_load',
  			beforeload: 'navStore_beforeload'
  		},
  		callController:{
  			onLoadDataComplete: 'onLoadDataComplete'
  		}
	},
	navRefreshTool_click: function(){
		this.doNavRefresh();	
	},
	navExpandTool_click: function(){
		this.doNavExpand();	
	},
	navCollapseTool_click: function(){
		this.doNavCollapse();	
	},	
	onLoadDataComplete: function(parent){
		this.set('parent',parent);
		this.doLoadData();
		this.setEditing(false);
		var toolbar = this.getCmdToolBar();
		this.doResetToolBar(toolbar);		
	},
	
	//◎【Store同步完成方法】
	onStoreSyncComplete: function(record){
		if (record){
			var store = this.getGridStore();
			if (record.modelName == store.model.$className){
				var model = store.getById(record.data.id);
				if (model){
					model.data = record.data;			
				}
				else {
					var dataList = [];
					store.each(function(item){
						dataList.push(item.data);
					});
					dataList.push(record.data);
					this.setSuspendStoreUpdate(1);
					store.loadData(dataList);
					this.setSuspendStoreUpdate(0);
				}
			}
		}
		this.setEditing(false);
		this.callParent(arguments);
	},
	//【加载数据到Store】
	doLoadData: function(){
		var view = this.getView();
		var showType = view.getShowType();
		if (showType == 'grid'){
			var childs = this.get('childs');
			var parent = this.get('parent');
			var childData = parent.get(childs);
			if (childData && childData.length > 0){
				var store = this.getGridStore();
				store.loadData(childData);
			}
		}
		else {
			var navModel = this.getNavModel();
			if (navModel){
				var store = this.getGridStore();
				store.load();
			}
		}
	},
	//【editing改变时调用】
	applyEditing: function(editing){
		if (editing){
			this.getToolbar_save().enable();
			this.getToolbar_cancel().enable();
			this.getNavView().disable();
		}
		else {
			this.getToolbar_save().disable();
			this.getToolbar_cancel().disable();
			this.getNavView().enable();
		}
		var toolbar = this.getCmdToolBar();
		this.doResetToolBar(toolbar);
		return editing;
	},	
	//【gridModel改变时调用】
	applyGridModel: function(model){
		return model;
	},
	//【navModel改变时调用】
	applyNavModel: function(model){
		var title = this.getGridTitle();
		if (title){
			var view = this.getView();
			var panel = this.getGridPanel();
			if (model){
				var prop = this.getNavModelPropName();
				var propWidget = prop.split('.');
				var value = model.get(propWidget[0]);
				if (Ext.isObject(value)){
					for (i = 1,ln = propWidget.length; i < ln; i++) {
						var prop = propWidget[i];
						if (Ext.isObject(value)){
							value = value[prop];
						}
					}
				}
				panel.setTitle(Ext.String.format('当前{0}[{1}]',title,value));
			}
			else {
				panel.setTitle(Ext.String.format('当前{0}[未指定]',title));
			}
		}
		return model;
	},
	
	//◎【NavStore加载前执行 】
  	onNavBeforeLoad: function(store,params){
  		
  	},
  	
	//【NavStore加载之前事件】
	navStore_beforeload: function(store, operation, eOpts){
		operation.params = operation.params || {};
		this.doNavBeforeLoad(store,operation.params);		
	},
	
	//【NavPanel选择改变事件】
	navView_selectionchange: function(view, selected){
		var navView = this.getNavView();
		if (selected && selected.length > 0){
			this.setNavModel(selected[0]);
			this.doNavItemSelection(navView,selected[0]);
		}
		else {
			this.setNavModel(null);
			this.doNavItemSelection(navView,null);
		}
		var toolbar = this.getCmdToolBar();
		this.doResetToolBar(toolbar);		
	},
	navStore_load: function(store, records, successful){
		if (records && records.length > 0){
  			var navView = this.getNavView();
  			var selModel = navView.getSelectionModel();
	  		if (!selModel.hasSelection()){
	  			selModel.selectRange(0,0);
	  		}
	  		else {
	  			records = selModel.getSelection();
	  			navView.fireEvent('selectionchange',navView.getView ? navView.getView() : navView,records);			
	  		}
  		}
  		else {
  			this.setNavModel(null);
			this.doNavItemSelection(navView,null);
  		}
	},
	
	gridStore_load: function(store, records, successful){
		if (records && records.length > 0){
			this.get('editor').setValue([]);
			var callController = this.getCallController();
			if (callController){
				callController.setEditing(false);
			}
  			var grid = this.getGridView();
			var selModel = grid.getSelectionModel();
			if (!selModel.hasSelection()){
				if (grid.selType == 'rowmodel'){
					selModel.selectRange(0,0);
				}
				else {
					grid.fireEvent('selectionchange',grid.getView(),records);
				}
			}
  		}
	},
  	
	gridStore_beforeload: function(store, operation, eOpts){
		var editor = this.get('editor');
		if (editor.mem)	return false;
  		operation.params = operation.params || {};
		this.doBeforeLoad(store,operation.params);		
  	},
  	
  	gridStore_add: function( store, records, index){
  		this.gridStore_update(store,records[0],'add');
  	},
  	
  	gridStore_remove: function(store, record, index, isMove){
  		this.gridStore_update(store,record,'remove');
  	},
  	
	gridStore_update: function(store, record, operation){
		var suspend = this.getSuspendStoreUpdate();
		if ((operation == 'edit' || operation == 'add' || operation == 'remove') && suspend == 0){
			var editor = this.get('editor');
			if (editor){
				var data = [];
				if (editor.mem){//多对多集合
					store.each(function(record){
						data.push(record.data);
					},this);
				}
				else {//一对多集合
					var newRecords = store.getNewRecords();
					Ext.each(newRecords,function(record){
						data.push(record.data);
					});
					var editRecords = store.getUpdatedRecords();
					Ext.each(editRecords,function(record){
						data.push(record.data);
					});
					var delRecords = store.getRemovedRecords();
					Ext.each(delRecords,function(record){
						data.push(record.data);
					});
				}
				editor.setValue(data);
				this.setEditing(true);
			}
		}		
		else {
			var grid = this.getGridView();
			var selModel = grid.getSelectionModel();
			var selected = selModel.getSelection();
			if (selected && selected.length > 0){
				grid.fireEvent('selectionchange',grid.getView(),selected);
			}
			var callController = this.getCallController();
			if (callController){
				callController.setEditing(false);
			}
			this.setEditing(false);
		}
	},
	
	//检查当前Model能否删除
	canRemove: function(record){
		return record.canRemove();
	},
	
	//检查当前Model的指定属性能否编辑
	canEdit: function(record,colname){
		return record.canEdit(colname);
	},
	
	gridView_edit: function(editor, context){
		if (context.column.editor){
			context.column.editor.record = context.record;
			context.column.editor = null;
		}
	},
	
	gridView_beforeedit: function(editor,context){
		var edit = this.getInlineEdit();
		var canEdit = this.canEdit(context.record,context.field);
		if (edit && canEdit){
			return true;
		}
		else {
			return false;
		}	
	},
	
	//【GridPanel单击事件】
	gridView_itemclick: function(view, record, item, index){

	},
	
	//【GridPanel双击事件】
	gridView_itemdblclick: function(view, record, item, index){
		var edit = this.getInlineEdit();
		var dbclick = this.getAllowDbClick();
		if (!edit && dbclick){
			var grid = this.getGridView();
			var store = this.getGridStore();
			this.doOpenEditWindow(null,grid,store,record,false);
		}
	},
	
	//【GridPanel选择改变事件】
	gridView_selectionchange: function(selmodel,selected){
		var grid = this.getGridView();
		if (selected){
			this.setGridModel(selected[0]);
			this.doGridItemSelection(grid,selected[0]);
		}
		else {
			this.setGridModel(null);
			this.doGridItemSelection(grid,null);
		}
		var toolbar = this.getCmdToolBar();
		this.doResetToolBar(toolbar);		
  	},
  	
 	//◎【下拉列表Store加载前执行 】
  	onComboBeforeLoad: function(component,store,params){
  		this.callParent(arguments);
  	},
  	
	//◎【查找再回窗体创建之前执行】
	onFindWindowCreateBefore: function(component, appParams, viewParams){

	},
	//◎【编辑窗体创建之前执行】
	onEditWindowCreateBefore: function(component, appParams, viewParams){

	},
  	//◎【导航部件选择事件】
  	onNavItemSelection: function(component/*在哪个控件上选中*/,record/*选中Model*/){
  		this.callParent(arguments);
  		var editor = this.get('editor');
  		if (!editor.mem && record){
  			var store = this.getGridStore();
  			store.load();
  		}
  	},
  	//◎【编辑部件选择事件】
  	onGridItemSelection: function(component/*在哪个控件上选中*/,record/*选中Model*/){
  		this.callParent(arguments);
		if (record){
			var canRemove = this.canRemove(record);
			if (canRemove){
				this.getToolbar_remove().enable();
			}
			else {
				this.getToolbar_remove().disable();
			}
			this.getToolbar_edit().enable();
		}
		else {
			this.getToolbar_remove().disable();
			this.getToolbar_edit().disable();
		}  		
  	},
  	//◎【所有动态视图创建完成后执行,此方法可以进行视图初始化工作,例如根据权限来隐藏或显示指定控件】
  	onCreateComplete: function(){
  		this.callParent(arguments);
  		var view = this.getView();
  		var navToolbar = this.getNavToolBar();
 		if (navToolbar){
		  	if (navToolbar.items.length == 0){
		  		navToolbar.setVisible(false);
		  	}
 		}
  	},
  	
  	//◎【控制器部件创建完成后执行】
  	onCreateWidgetAfter: function(){
  		this.callParent(arguments);
  	},
  	
  	//◎【控制器部件创建事件】
  	onCreateWidget: function(){
  		this.callParent(arguments);
  		var view = this.getView();
		var gridPanel = this.queryViewComponent(view,'#childGridPanel');
 		var toolbar = this.queryViewComponent(gridPanel,'#childCmdToolbar');
		if (toolbar){
			var editor = this.get('editor');
			var savebutton = this.getSaveButton();
			var hiden = editor.mem || !savebutton;
			this.addViewComponent(toolbar,{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: 'left', privilege: 'EDIT'});
			this.addViewComponent(toolbar,{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign: 'left', privilege: 'EDIT', hidden: hiden,disabled:true});
			this.addViewComponent(toolbar,{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: 'left', privilege: 'EDIT',disabled:true});
			this.addViewComponent(toolbar,{text:'查看',itemId:'toolbar_edit',iconCls:'application_form_magnify',iconAlign: 'left',disabled:true,hidden:true});
			this.addViewComponent(toolbar,{text:'删除',itemId:'toolbar_remove',iconCls:'remove',iconAlign: 'left', privilege: 'EDIT',disabled:true});
		}
  	},
  	
  	//◎【视图初始化组件完成时执行】
	onViewInitComponent: function(viewConfig){
		this.callParent(arguments);
	},
	
  	//◎【初始化命令工具栏 】
	onInitToolBar: function(toolbar){
		this.callParent(arguments);
		var editor = this.get('editor');
		if (editor.mem){
			this.getToolbar_cancel().setVisibility(false);	
		}
	},
	
	//◎【重置命令工具栏 】
  	onResetToolBar: function(toolbar){
  		this.callParent(arguments);
  	},
  	
	//◎【视图boxready事件监听】
	onViewBoxReady: function(){
		this.callParent(arguments);
		this.setEditing(false);
		var grid = this.getGridView();
 		this.keyNav = Ext.create('Ext.util.KeyNav', grid.id, {  
                down: function(){ 
                	var add = this.getAdding();
                	if (add){
                		var editor = grid.getPlugin('cellplugin');
                		editor.completeEdit();
                		this.setPopupNew(false);
                		var store = this.getGridStore();
						var model = new store.model();
						if (this.getSplitMenu){
							var menu = this.getSplitMenu();
							model.set('clazzname',menu.clazz);
					  		model.set('iconCls',menu.prop);
							model.set('indexCls',menu.iconCls);	
						}
                		this.doAddRecord(store,model);
                	}
                },  
                scope: this  
         });		
		var view = this.getView();
		var showType = view.getShowType();
		if (showType == 'grid') {
			var store = this.getGridStore();
			if (store){
				store.load();
			}		
		}
		else {
			if (showType == 'listnav' || showType == 'gridnav'){
				var navStore = this.getNavStore();
				navStore.load({params:{navLoad:true}});
			}
		}
		var toolbar = this.getCmdToolBar();
		if (toolbar){
			this.doInitToolBar(toolbar);
		}
	},
	
	//◎【Model创建时执行】
  	onCreateRecord: function(component/*在哪个控件上创建*/,record/*创建Model*/){
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
  	
	//◎【执行创建记录动作】
  	doAddRecord: function(store,model){
		var grid = this.getGridView();
		var popupNew = this.getPopupNew();
  		if (popupNew){
			this.doOpenEditWindow(null,grid,store,model,true);
  		}
  		else {
			var editor = grid.getPlugin('cellplugin');
			model.onCreateBefore(store,this);
			this.doCreateRecord(grid,model);
			model.onAddBefore(store,this);
			store.add(model);
			var endRow = store.getCount() - 1;
			editor.startEditByPosition({row: endRow, column: this.getColEdit()});
			this.setAdding(true);
  		}
	},
	//◎【新增方法】
  	doCreate: function(){
		if (this.doBeforeAddRecord()){
			var store = this.getGridStore();
			var model = new store.model();
			this.doAddRecord(store,model);
		}  	
  	},
  	
  	//◎【删除方法】
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
  	},
  	
   	//◎【查看方法】
  	doEdit: function(){
  		var record = this.getGridModel();
		if (record){
			var grid = this.getGridView();
			var store = this.getGridStore();
			this.doOpenEditWindow(null,grid,store,record,false);
		}
  	},
  	
  	//◎【保存方法】
  	doSave: function(){
 		var controller = this.get('callController');
		controller.doSave();	
  	},
  	
  	//◎【取消方法】
  	doCancel: function(){
		var editor = this.get('editor');
		var store = this.getGridStore();
		if (editor.mem){
			store.rejectChanges();
		}
		else {
			store.load();
		}
		this.setEditing(false);
  	},
  	
  	//◎【处理导航面板刷新事件】
  	doNavRefresh: function(){
  		var store = this.getNavStore();
  		store.load({params:{navLoad:true}});
  	},
  	
  	//◎【处理导航面板展开事件】
  	doNavExpand: function(){
  		this.getNavView().expandAll();
  	},
  	
   	//◎【处理导航面板收编事件】
  	doNavCollapse: function(){
  		this.getNavView().collapseAll();
  	},
  	
  	//◎【新增按钮单击事件】
	toolbar_add_click: function(){
		this.doCreate();
	},
	
  	//◎【保存按钮单击事件】
	toolbar_save_click: function(){
		this.doSave();	
	},
	
	//◎【取消按钮单击事件】
	toolbar_cancel_click: function(){
		this.doCancel();
	},
	
	//◎【查看按钮单击事件】
	toolbar_edit_click: function(){
		this.doEdit();
	},
	
	//◎【删除按钮单击事件】
	toolbar_remove_click: function(){
		this.doRemove();
	} 	
});