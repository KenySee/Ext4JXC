Ext.define('Keer.ui.core.Organization.Role.ChildController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
		'Keer.ui.selwin.Role.FindWindow'
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
		gridStore: null,		
		gridModel: null	
	},
	
	//【监听View事件】
    control: {
		cmdToolBar:{},
		gridView:		{	
			listeners: { 
				selectionchange: 'onGridItemSelection'
			}
		},
		toolbar_add: 	{	listeners: { click: 'doCreate'	} },
		toolbar_save: 	{	listeners: { click: 'doSave'	} },
		toolbar_cancel: {	listeners: { click: 'doCancel'	} },
		toolbar_remove: {	listeners: { click: 'doRemove'	} }
	},
	
	//【监听Store事件】
	observe: {
	},
	doCreate: function(){
		var store = this.getGridStore();
		var model = store.createModel();
		this.doAddRecord(store,model);		
	},
	doAddRecord: function(store,model){
		var grid = this.getGridView();
		this.doCreateRecord(grid,model);
		this.doOpenEditWindow('ui-selwin-Role-findwindow',grid,store,model,true);
	},	
	doSave: function(){
		var callController = this.get('callController');
		if (callController){
			callController.doSave();
		}
	},
	doCancel: function(){
		var callController = this.get('callController');
		if (callController){
			callController.doCancel();
			this.setEditing(false);
		}
	},
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
		else {
			Ext.Msg.alert('提示','记录前请选择记录');
		}
	},
	onViewBoxReady: function(){
		this.setEditing(false);
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
			this.doSwitchComponent(canRemove,'childRemove','canRemove','enable','disable');
		}
		else {
			this.doSwitchComponent(false,'childRemove','canRemove','enable','disable');
		}
	},
	applyEditing: function(editing){
		this.doSwitchComponent(editing,'childEdit','editing','enable','disable');
		return editing;
	},
	applyReady: function(ready){
		this.doSwitchComponent(ready,'childReady','ready','enable','disable');
		return ready;
	}
});