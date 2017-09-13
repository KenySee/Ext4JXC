Ext.define('Keer.ui.core.EntityModel.ModelConfig.ChildController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
		'Keer.widget.field.EnumCombo',
		'Keer.widget.field.ObjectCombo',
		'Keer.widget.action.Form',
		'Keer.widget.view.DataView',
		'Keer.store.comm.storeStore',
		'Keer.store.comm.windowStore',
		'Keer.store.comm.containerStore',
		'Keer.store.ModelConfig.Store',
		'Keer.store.Editor.Model',
		'Keer.ui.core.EntityModel.ModelConfig.FindWindow',
		'Keer.ui.core.EntityModel.ModelDetail.FindWindow'	
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
		navStore: null,
		navModel: null,
		gridModel: null
	},
	
	//【监听View事件】
    control: {
		cmdToolBar:{},
		winform: {
			listeners: {
				change: 'onValueChange'
			}
		},
		gridView: {	
			listeners: { 
				selectionchange: 'onGridItemSelection'
			}
		},
		navPanel: {
			listeners: {
				selectionchange: 'onNavItemSelection'
			}
		},
		toolbar_add: 	{	listeners: { click: 'doCreate'	} },
		toolbar_save: 	{	listeners: { click: 'doSave'	} },
		toolbar_cancel: {	listeners: { click: 'doCancel'	} },
		toolbar_remove: {	listeners: { click: 'doRemove'	} },
		toolbar_copy:   {	listeners: { click: 'doCopy'    } },
		tool_refresh:	{	listeners: { click: 'doNavRefresh' } }
	},
	
	//【监听Store事件】
	observe: {
		gridStore:{
  			beforeload: 'onGridStoreBeforeLoad'
		},
		callController: {
			onStoreSyncComplete: 'onStoreSyncComplete'
		}
	},
	onValueChange: function(field, newVal, oldVal){
		var gridModel = this.getGridModel();
		var form = this.getWinform();
		if (!form.suppress && gridModel){
			var form = this.getWinform();
			var task = new Ext.util.DelayedTask(function(){
				form.updateRecord();
				var record = form.getRecord();
				gridModel.set('editor',record.data);
			});
  			task.delay(200);
		}
	},
	doHiddenForm: function(){
		var form = this.getWinform();
		var items = form.query('field');
		Ext.each(items,function(item){
			item.setVisible(false);
		});
	},
	doShowForm: function(editor){
		var form = this.getWinform();
		var colArray = editor.colField.split(',');
		Ext.each(colArray,function(col){
			var child = form.child('#'+col);
			if (child){
				child.setVisible(true);
			}
		});
		var model = new Keer.store.Editor.Model(editor);
		this.doLoadForm(form,model);
	},
	doLoadForm: function(form,model){
		form.loadRecord(model);
	},
	onStoreSyncComplete: function(parent){
		var model = this.get('parent');
		this.set('parent',parent);
		var navModel = this.getNavModel();
		if (navModel){
			var grid = this.getNavPanel();
			var selModel = grid.getSelectionModel();
			var records = selModel.getSelection();
	  		this.onNavItemSelection(selModel,records);
		}
		this.setEditing(false);
	},
	onGridStoreBeforeLoad: function(store, operation){
		operation.params = operation.params || {};
		var model = this.getNavModel();
  		var parent = this.get('parent');
  		if (parent && model){
  			Ext.apply(operation.params,{
		  		clazzname: model.get('clazzname'),
		  		parent: parent.get('id')
		  	});
  		}
		this.doBeforeLoad(store,operation.params);		
	},
	doNavRefresh: function(){
		var store = this.getNavStore();
		store.load({params:{navLoad:true}});
	},
	onNavItemSelection: function(selModel,selected){
		var store = this.getGridStore();
		if (selected && selected.length > 0){
			var record = selected[0];
			this.setNavModel(record);
			store.load();
		}
		else {
			this.setNavModel(null);
			store.loadData([]);
		}
	},
	applyNavModel: function(model){
		var store = this.getGridStore();
		if (model){
			this.setReady(true);
		}
		else {
			this.setReady(false);
		}
		return model;
	},
	doCopy: function(){
		var grid = this.getGridView();
		var store = this.getGridStore();
		var model = store.createModel();
		this.doCreateRecord(grid,model);
		this.doOpenEditWindow('ui-core-EntityModel-ModelConfig-findwindow',grid,store,model,true);
	},
	doCreate: function(){
		var store = this.getGridStore();
		var model = store.createModel();
		this.doAddRecord(store,model);
	},
	doAddRecord: function(store,model){
		var grid = this.getGridView();
		this.doCreateRecord(grid,model);
		this.doOpenEditWindow('ui-core-EntityModel-ModelDetail-findwindow',grid,store,model,true);
	},
	onEditWindowCreateBefore: function(component, appParams, viewParams){
		var parent = this.get('parent');
		Ext.apply(viewParams,{
			canMulti: true
		});
		Ext.apply(appParams,{
			constParam: {
				parent: parent.get('id')
			},
			callParam: function(params){
				var model = this.navModel;
				if (model){
					Ext.apply(params,{
						clazzname: model.get('clazzname')
					});
				}
			},
			selMode: {
				selKey: 'dataIndex',
				addKey: 'dataIndex',
				callScope: this,
				callDefaultValueFun: function(model,record){
					var nav = this.getNavModel();
					model.set('id',null);
					model.set('clazzname',nav.get('id'));
					model.set('editor',null);						
				}				
			}
		});	
	},
	doSave: function(){
		var callController = this.get('callController');
		if (callController){
			callController.doSave();
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
	doCancel: function(){
		var callController = this.get('callController');
		if (callController){
			callController.doCancel();
		}
		this.doRefresh();
		this.setEditing(false);
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
		this.doNavRefresh();
		this.setEditing(false);
	},
	onGridItemSelection: function(selModel,selected){
		if (selected && selected.length > 0){
			this.setGridModel(selected[0]);
		}
		else {
			this.setGridModel(null);
		}
		var record = this.getGridModel();
		if (record){
			this.doHiddenForm();
  			var editor = record.get('editor');
  			if (editor){
  				if (editor.name == '枚举下拉框' && !editor.enumType){
  					var type = record.get('fieldType');
  					editor.enumType = Ext.String.uncapitalize(type);
  				}
  				this.doShowForm(editor);
  			}
  			else {
  				this.doHiddenForm();
  			}
		}
		else {
			this.doHiddenForm();
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
	},
	onViewInitComponent: function(viewConfig){
		var navPanel = {
			xtype: 'widget-view-dataview',
			itemId: 'navPanel',
			displayField: 'name',
			store:  this.navStore
		}
		var leftPanel = {
			title: '配置类型',
			xtype: 'panel',
			itemId: 'leftPanel',
			childEdit:'!editing',
			minWidth : 0,
			width : 200,
			margin : '-1 0 -1 -1',
			region : 'west',
			layout: 'fit',
			tools :[{itemId: 'tool_refresh',type: 'refresh',tooltip:'刷新'}],
			collapsible : true,
			collapsed : false,
			hideCollapseTool : true,
			maintainFlex : true,
			split : true,
			deferRowRender:true,
			autoScroll : false,
			items:[navPanel]
		};

		var mainPanel = this.down(viewConfig,'mainPanel');
		
		Ext.apply(mainPanel,{
			border: 1,
			margin : '-1 -1 -1 -1'
		});
			
		Ext.apply(viewConfig,{
			layout: 'border'
		});
			
		this.addViewComponent(viewConfig,leftPanel);
		
		var winform = {
			xtype: 'widget-action-form',
			title: '编辑器配置',
			minWidth : 0,
			width : 240,
			border: 1,
			itemId: 'winform',
			bodyPadding: '5 5 5 5',
			margin: '-1 -1 -1 1',
			region : 'east',
			collapseMode: 'mini',
			collapsible : true,
			collapsed : false,
			hideCollapseTool : true,
			maintainFlex : true,
			split : true,
			autoScroll : false,
			defaultType:'textfield',
			fieldDefaults : {
				labelWidth:80,
				width : 200,
				lableAlign : 'right'
			},
			items:[
				{fieldLabel:'readOnly',itemId: 'readOnly',name:'readOnly',xtype:'checkbox',hidden:true},
				{fieldLabel:'fullLine',itemId: 'fullLine',name:'fullLine',xtype:'checkbox',hidden:true},
				{fieldLabel:'nonEmpty',itemId: 'nonEmpty',name:'nonEmpty',xtype:'checkbox',hidden:true},
				{fieldLabel:'forcedWrap',itemId: 'forcedWrap',name:'forcedWrap',xtype:'checkbox',hidden:true},
				{fieldLabel:'colspan',itemId: 'colspan',name:'colspan',xtype:'numberfield',hidden:true},
				{fieldLabel:'emptyText',itemId: 'emptyText',name:'emptyText',xtype:'textfield',hidden:true},
				{fieldLabel:'displayField',itemId: 'displayField',name:'displayField',xtype:'textfield',hidden:true},
				{fieldLabel:'enumType',itemId: 'enumType',name:'enumType',xtype:'textfield',hidden:true},
				{fieldLabel:'parentProp',itemId: 'parentProp',name:'parentProp',xtype:'textfield',hidden:true},
				{fieldLabel:'growMin',itemId: 'growMin',name:'growMin',xtype:'numberfield',hidden:true},
				{fieldLabel:'height',itemId: 'height',name:'height',xtype:'numberfield',hidden:true},
				{fieldLabel:'Store',itemId: 'store',name:'store',xtype:'widget-field-objectcombo',store: 'comm-storestore',hidden:true},
				{fieldLabel:'childStore',itemId: 'childStore',name:'childStore',xtype:'widget-field-objectcombo',store: 'comm-storestore',hidden:true},
				{fieldLabel:'Container',itemId: 'xcontainer',name:'xcontainer',xtype:'widget-field-objectcombo',store: 'comm-containerstore',hidden:true},
				{fieldLabel:'Window',itemId: 'xwindow',name:'xwindow',xtype:'widget-field-objectcombo',store: 'comm-windowstore',hidden:true}
			]
		};	
		
		this.addViewComponent(viewConfig,winform);
	}
});