Ext.define('Keer.ui.core.Organization.User.FindController',{
	extend: 'Keer.widget.mvc.Controller',
	requires:[
		'Keer.ui.core.Organization.User.EditWindow'
	],
	//【混入功能】
	mixins: {
	},
	//【成员变量】
	config: {
		actionUrl: null,
		controllerType: 'find',
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
		gridView: {
			listeners: {
				itemdblclick: 'onGridItemDbClick'
			}
		},
		navView:  {	
			listeners: { 
				selectionchange: 'onNavItemSelection'	
			}
		},
		button_confirm: {
			listeners: {
				click: 'onButtonConfirm'
			}
		},
		button_cancel: {
			listeners: {
				click: 'onButtonCancel'
			}
		},
		toolbar_add: 	{ listeners: { click: 'doCreate'	} },
		toolnav_refresh:{	listeners: { click: 'doNavRefresh'	} },
		toolnav_expand: {	listeners: { click: 'doNavExpand'	} },
		toolnav_collapse:{	listeners: { click: 'doNavCollapse'	} }	
	},
	//【监听Store事件】
	observe: {
		gridStore:{
			beforeload: 'onGridStoreBeforeLoad'
		}
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
  	onGridItemDbClick: function(grid, record, item, index){
  		this.onButtonConfirm();
  	},
	doAddRecord: function(store,model){
		var grid = this.getGridView();
		this.doCreateRecord(grid,model);
		this.doOpenEditWindow('ui-core-Organization-User-editwindow',grid,store,model,true);
	},
	onCreateRecord: function(component,record){
		var model = this.getNavModel();
  		if (model){
  			record.set('mainMember',this.getJSONBean(model));
  		}
	},
	onViewBoxReady: function(){
		this.setNavModel(null);
		this.doRefresh();
	},
	doCreate: function(model){
		var store = this.getGridStore();
		this.doAddRecord(store,model);
	},
	doRefresh: function(){
		var store = this.getGridStore();
		store.load();		
	},
	doNavRefresh: function(){
		this.setNavModel(null);
		this.doRefresh();
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
				mainMember: model ? model.get('id') : '-1'
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
		}
		else {
			this.setNavModel(null);
		}
		this.doRefresh();
	},
	applyNavModel: function(model){
		var title = this.getNavPanel().title;
		if (title){
			var view = this.getView();
			var panel = this.getMainPanel();
			if (model){
				panel.setTitle(Ext.String.format('当前{0}[{1}]',title,model.get('name')));
				var ready = model.data.orgType == 'DEPT';
				this.doSwitchComponent(ready,'findReady','ready','enable','disable');
			}
			else {
				panel.setTitle(Ext.String.format('当前{0}[未指定]',title));
				this.doSwitchComponent(false,'findReady','ready','enable','disable');
			}
		}
		return model;
	}
});