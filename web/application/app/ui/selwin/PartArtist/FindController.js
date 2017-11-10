Ext.define('Keer.ui.selwin.PartArtist.FindController',{
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
		this.doRefresh();
		var toolbar = this.getCmdToolBar();
		this.doInitToolBar(toolbar);
		this.setEditing(false);
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
	doRefresh: function(){
		var store = this.getGridStore();
		store.load();
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
	onBeforeAddViewComponent: function(container,config){
		if (config.itemId == 'querybar_search'){
			Ext.apply(config,{
				findReady: 'ready',
				findEdit: '!editing'
			});
		}
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