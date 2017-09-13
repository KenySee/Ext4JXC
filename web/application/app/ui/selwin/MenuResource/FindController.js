Ext.define('Keer.ui.selwin.MenuResource.FindController',{
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
		controllerType: 'find',
		editing: null,
		ready: null,
		navStore: null,		
		navModel: null,
		gridStore: null,
		gridModel: null
	},
	//【监听View事件】
	control: {
		cmdToolBar:{},
		mainPanel:{},
		gridView:		{	
			listeners: {
				selectionchange: 'onGridItemSelection',
				itemdblclick: 'onGridItemDbClick'
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
		toolnav_expand: {	listeners: { click: 'doNavExpand'	} },
		toolnav_collapse:{	listeners: { click: 'doNavCollapse'	} },
		button_confirm: {
			listeners: {
				click: 'onButtonConfirm'
			}
		},
		button_cancel: {
			listeners: {
				click: 'onButtonCancel'
			}
		}
	},
	//【监听Store事件】
	observe: {
		gridStore:{
			beforeload: 'onGridStoreBeforeLoad'
		}
	},
	onViewBoxReady: function(){
		this.setEditing(false);
		this.doRefresh();
	},
	onCreateWidget: function(){
  		this.callParent(arguments);
  		var view = this.getView();
		var buttons = this.queryViewComponent(view,'toolbar[ui=footer]');
		if (buttons){
			this.addViewComponent(buttons,{text:'确定',itemId:'button_confirm'});
			this.addViewComponent(buttons,{text:'取消',itemId:'button_cancel'});
		}		
  	},
  	onButtonConfirm: function(){
  		var grid = this.getGridView();
		var selModel = grid.getSelectionModel();
		var records = selModel.getSelection();
		if (records && records.length > 0){
			this.doCreateSelectRecord(records);
			this.onButtonCancel();
		}
		else {
			Ext.Msg.alert('提示','确定前请选择记录');
		}
  	},
  	onButtonCancel: function(){
 		var win = this.getView();
		win.close(); 	
  	},
  	doNavExpand: function(){
		this.getNavView().expandAll();
	},
	doNavCollapse: function(){
		this.getNavView().collapseAll();
	},
  	onGridItemDbClick: function(grid, record, item, index){
  		this.onButtonConfirm();
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
	doRefresh: function(){
		var store = this.getGridStore();
		store.load();
	},
	onGridStoreBeforeLoad: function(store, operation){
		operation.params = operation.params || {};
		this.doBeforeLoad(store,operation.params);
	},
	onBeforeLoad: function(store,params){
		var model = this.getNavModel();
		if (model){
			Ext.apply(params,{
				node: model.get('id')
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
	onBeforeAddViewComponent: function(container,config){
		if (config.itemId == 'querybar_search'){
			Ext.apply(config,{
				findReady: 'ready',
				findEdit: '!editing'
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
		this.doSwitchComponent(adding,'findAdd','adding','enable','disable');
		return adding;
	},
	applyEditing: function(editing){
		this.doSwitchComponent(editing,'findEdit','editing','enable','disable');
		return editing;
	},
	applyReady: function(ready){
		if (!ready){
			this.setEditing(false);
		}
		this.doSwitchComponent(ready,'findReady','ready','enable','disable');
		return ready;
	}
});