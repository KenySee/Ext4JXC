Ext.define('Keer.widget.core.FindController',{
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
		controllerType: 'find',	// 【控制器类型】
		navStore: null,			// 【Nav的Store】
		navModel: null,	    	// 【Nav当前选择的Model】
		navModelPropName: 'name', //【NavModel的标题属性】
		gridStore: null,		// 【Grid的Store】
		gridModel: null,		// 【Grid当前选择的Model】
		gridTitle: '标题'		// 【Grid标题】
	},	
	//【监听View事件】
	control: {
		navPanel: {
			selector: '#findNavPanel'
		},
		gridPanel: {
			selector: '#findGridPanel'
		},
		cmdToolBar: {
			selector: '#findCmdToolbar'
		},
		navToolBar: {
			selector: '#findNavToolbar'
		},
		navRefreshTool:{
			selector: '#findRefreshTool',
			listeners: {
				click: 'navRefreshTool_click'
			}
		},
		navExpandTool:{
			selector: '#findExpandTool',
			listeners: {
				click: 'navExpandTool_click'
			}
		},
		navCollapseTool:{
			selector: '#findCollapseTool',
			listeners: {
				click: 'navCollapseTool_click'
			}
		},		
		navView: {
			selector: '#findNavView',
			listeners: {
				selectionchange: 'navView_selectionchange'
			}
		},
		gridView: {
			selector: '#findGridView',
			listeners: {
				selectionchange: 'gridView_selectionchange',
				itemclick: 'gridView_itemclick',
				itemdblclick: 'gridView_itemdblclick',
				beforeedit: 'gridView_beforeedit'
			}
		},		
		footerButtonOK: {
			listeners: {
				click: 'footerButtonOK_click'
			}
		},
		footerButtonClose: {
			listeners: {
				click: 'footerButtonClose_click'
			}
		}
	},
	//【监听Observe事件】
	observe: {
		gridStore: {
			load: 'gridStore_load',
  			beforeload: 'gridStore_beforeload'
  		},
  		navStore: {
  			load: 'navStore_load',
  			beforeload: 'navStore_beforeload'
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
	//【gridModel改变时调用】
	applyGridModel: function(model){
		return model;
	},	
	//【navModel改变时调用】
	applyNavModel: function(model){
		var title = this.getGridTitle();
		if (title){
			var view = this.getView();
			var panel = this.getGridPanel(view);
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
  		operation.params = operation.params || {};
		this.doBeforeLoad(store,operation.params);
  	},
  	
  	//【GridPanel单击事件】
	gridView_itemclick: function(view, record, item, index){
		var grid = this.getGridView();
		this.doGridItemSelection(grid,record);
	},
	
	//【GridPanel双击事件】
	gridView_itemdblclick: function(view, record, item, index){
		this.doSelect();
		var win = this.getView();
		win.close();
	},
	//【GridPanel编辑前事件】
	gridView_beforeedit: function(editor,context){
		return false;
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
  
  	//◎【初始化命令工具栏】
	onInitToolBar: function(toolbar){
		this.callParent(arguments);
	},
	
  	//◎【下拉列表Store加载前执行 ,子类可以实现】
  	onComboBeforeLoad: function(component,store,params){
  		this.callParent(arguments);
  	},
  	
  	//◎【NavStore加载前执行 】
  	onNavBeforeLoad: function(store,params){
  		
  	},
  	
	//◎【Store加载前执行 】
  	onBeforeLoad: function(store,params){
  		this.callParent(arguments);
  		var callParam = this.get('callParam');
		if (callParam && Ext.isFunction(callParam)){
			var model = this.getNavModel();
			callParam.call(this,model,params);
		}
  	},
  	
	//◎【导航部件选择事件】
  	onNavItemSelection: function(component/*在哪个控件上选中*/,record/*选中Model*/){
  		this.callParent(arguments);
    	var store = this.getGridStore();
  		store.load();  		
  	},
  	
	doSelect: function(){
		var grid = this.getGridView();
		var selModel = grid.getSelectionModel();
		var records = selModel.getSelection();
		this.doSelectComplete(records);
	},
	
	doSelectComplete: function(records){
		if (records && Ext.isArray(records)){
			var selected = [];
			var store = this.get('store');			//获取调用窗口转入的Store
			var value = this.get('record');			//获取将要创建Model范本
			var selMode = this.get('selMode');		//获取调用窗口转入的选择模式配置对象
			selMode = selMode || {};
			selMode.selKey = selMode.selKey || 'id';
			selMode.addKey = selMode.addKey || 'id';
			selMode.addName = selMode.addName || 'name';
			var selKey = selMode.selKey;		//查找再回比对字段
			var addKey = selMode.addKey;		//调用窗口比对字段
			var addName = selMode.addName;
			var addRef = (selKey != addKey) || (selMode.addRef);	//是否按外键引用的方式添加
			var isChanged = false;
			var callDefaultValueFun = selMode.callDefaultValueFun;
			var callFunc = selMode.callFunc;
			var callScope = selMode.callScope || this;
			if (callFunc && Ext.isFunction(callFunc)){
				callFunc.call(callScope,records);
				return;
			}
			Ext.each(records,function(record){
				var index = store.findBy(function(item) {
					var selValue = record.get(selKey);
					var addValue = item.get(addKey);
					var selId = Ext.isObject(selValue) ? selValue.id : selValue;
					var addId = Ext.isObject(addValue) ? addValue.id : addValue;
					return selId == addId;
				});
				if (index == -1) {
					var model = new store.model(value.data);
					if (addRef){
						//设置外键引用对象的值
						var addObject = {id:record.data.id,
							version:record.data.version,
							clazzname:record.data.clazzname
						};
						addObject[addName] = record.get(addName);
						model.set(addKey,addObject);
					}
					else {
						//复制整个查找对象的属性
						for(var i in record.data){
							model.set('id',record.data.id);
							model.set('version',record.data.version);
							model.set('clazzname',record.data.clazzname);
							if (model.data[i] == null || model.data[i] == ''){
								model.set(i,record.data[i]);
							}
						}
					}
					if (callDefaultValueFun && Ext.isFunction(callDefaultValueFun)){
						callDefaultValueFun.call(callScope,model,record);
					}
					model.onAddBefore(store,this);
					selected.push(model);
					store.add(model);
					isChanged = true;
				}
			},this);
			var callController = this.get('callController');
			if (callController){
				callController.onSelectRecordComplete(selected);
			}
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
		var toolbar = this.getCmdToolBar();
		if (toolbar){
			if (toolbar){
		  		if (toolbar.items.length == 0){
		  			toolbar.setVisible(false);
		  		}
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
		var buttons = this.queryViewComponent(view,'toolbar[ui=footer]');
		if (buttons){
			this.addViewComponent(buttons,{text:'确定',itemId:'footerButtonOK'});
			this.addViewComponent(buttons,{text:'取消',itemId:'footerButtonClose'});
		}		
  	},
	
  	//◎【视图初始化组件完成时执行】
	onViewInitComponent: function(viewConfig){
		this.callParent(arguments);
	},
		
  	//◎【视图boxready事件监听】
	onViewBoxReady: function(){
		this.callParent(arguments);
		var view = this.getView();
		var showType = view.getShowType();
		var navView = this.getNavView();
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
  	
	footerButtonOK_click: function(){
		this.doSelect();
		var win = this.getView();
		win.close();
	},
	
	footerButtonClose_click: function(){
		var win = this.getView();
		win.close();
	}
});