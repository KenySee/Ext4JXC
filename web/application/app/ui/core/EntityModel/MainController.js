Ext.define('Keer.ui.core.EntityModel.MainController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
		'Keer.ui.core.EntityModel.EditWindow'
	],
	//【混入功能】
	mixins: {
	},
	//【成员变量】
	config: {
		actionUrl: 'EntityModel',
		controllerType: 'main',
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
		toolbar_add: 	{	listeners: { click: 'doCreate'	} },
		toolbar_remove: {	listeners: { click: 'doRemove'	} },
		toolbar_edit: 	{	listeners: { click: 'doEdit'	} },
		toolbar_register: {	listeners: { click: 'doRegister'} },
		toolbar_extjs:	{	listeners: { click: 'doExtjs'	} },
		toolbar_java:	{	listeners: { click: 'doJava'	} },
		toolbar_refresh:{	listeners: { click: 'doRefresh'	} }		
	},
	//【监听Store事件】
	observe: {
		gridStore:{
			beforeload: 'onGridStoreBeforeLoad'
		}
	},
	onViewBoxReady: function(){
		this.doRefresh();
		this.setEditing(false);
	},
	doEdit: function(){
		var grid = this.getGridView();
		var store = this.getGridStore();
		var model = this.getGridModel();
		if (model){
			this.doOpenEditWindow('ui-core-EntityModel-editwindow',grid,store,model,false);
		}
		else {
			Ext.Msg.alert('提示','请选择记录');
		}
	},
	doRegister: function(button){
		var model = this.getGridModel();
		if (model){
			var view = this.getView();
			view.setLoading(true);
			if (button) button.disable();
			Ext.Ajax.request({
			    url: 'EntityModelAction!register.action',
			    params: {
			        fullname: model.get('fullname')
			    },
			    success: function(response){
			    	view.setLoading(false);
			    	if (button) button.enable();
			        Ext.Msg.alert('提示','注册成功');
			    }
			});		
		}		
	},
	doExtjs: function(){
		var model = this.getGridModel();
		var win = Ext.widget('window',{
			title: '生成ExtJs代码',
			width: 200,
			height: 380,
			layout: 'fit',
			modal: true,
			items: [{
				xtype: 'form',
				url: 'EntityModelAction!BuildExtjs.action',
				buttonAlign: 'center',
				layout: 'anchor',
				border: 0,
				margin: '-1 -1 -1 -1',
			    defaults: {
			        anchor: '100%'
			    },
			    bodyPadding: 20,
				fieldDefaults : {
					inputValue: 'true',
					uncheckedValue: 'false',
					labelWidth:120,
					lableAlign : 'right'
				},
				items : [
					{
						fieldLabel : 'MainContainer',
						xtype: 'checkbox',
						name:'mainContainer',
						itemId:'mainContainer',
						listeners:{
							change: function(editor, newValue, oldValue){
								var chkEdit = this.up('form').down('#editWindow');
								if (newValue) {
									chkEdit.setValue(true);
									chkEdit.disable();
								}
								else {
									chkEdit.setValue(false);
									chkEdit.enable();
								}
							}						
						}
					},
					{
						fieldLabel : 'MainController',
						xtype: 'checkbox',
						itemId:'mainController',
						name:'mainController',
						listeners:{
							change: function(editor, newValue, oldValue){
								var chkEdit = this.up('form').down('#editController');
								if (newValue) {
									chkEdit.setValue(true);
									chkEdit.disable();
								}
								else {
									chkEdit.setValue(false);
									chkEdit.enable();
								}
							}						
						}
					},
					{
						fieldLabel : 'EditWindow',
						xtype: 'checkbox',
						itemId:'editWindow',
						name:'editWindow'
					},			
					{
						fieldLabel : 'EditController',
						xtype: 'checkbox',
						itemId:'editController',
						name:'editController'
					},
					{
						fieldLabel : 'ChildContainer',
						xtype: 'checkbox',
						itemId:'childContainer',
						name:'childContainer',
						listeners:{
							change: function(editor, newValue, oldValue){
								var chkEdit = this.up('form').down('#editWindow');
								if (newValue) {
									chkEdit.setValue(true);
									chkEdit.disable();
								}
								else {
									chkEdit.setValue(false);
									chkEdit.enable();
								}
							}						
						}
					},
					{
						fieldLabel : 'ChildController',
						xtype: 'checkbox',
						itemId:'childController',
						name:'childController',
						listeners:{
							change: function(editor, newValue, oldValue){
								var chkEdit = this.up('form').down('#editController');
								if (newValue) {
									chkEdit.setValue(true);
									chkEdit.disable();
								}
								else {
									chkEdit.setValue(false);
									chkEdit.enable();
								}
							}						
						}
					},					
					{
						fieldLabel : 'FindWindow',
						xtype: 'checkbox',
						itemId:'findWindow',
						name:'findWindow'
					},
					{
						fieldLabel : 'FindController',
						xtype: 'checkbox',
						itemId:'findController',
						name:'findController'
					},
					{
						fieldLabel : 'Store',
						xtype: 'checkbox',
						itemId:'store',
						name:'store'
					},
					{
						fieldLabel : 'Model',
						xtype: 'checkbox',
						itemId:'model',
						name:'model'
					},
					{
						fieldLabel : '覆盖文件',
						xtype: 'checkbox',
						name:'allWrite'
					},					
					{
						xtype: 'hiddenfield',
						name:'id',
						value: model.getId()
					}
				],
				buttons:[
					{
						text: '确 定',
			        	handler: function() {
							var form = this.up('form').getForm();
				            if (form.isValid()) {
				            	form.submit({
				                	waitMsg : '正在生成ExtJs请稍后',
				                	waitTitle : '提示',
				                	success: function(form, action){
				            			win.close();
				            			Ext.Msg.alert('提示','生成成功');				            			
				                	},
				                    failure: function(form, action) {
				                        Ext.Msg.alert('生成失败', action.result.message);
				                    }
			                	});
					        }
				        }
			        },{
						text: '取 消',
						handler: function(){
							win.close();
						}
					}
				]
			}]
		});
		win.show();		
	},
	doJava: function(){
		var model = this.getGridModel();
		var win = Ext.widget('window',{
			title: '生成Java代码',
			width: 200,
			height: 220,
			layout: 'fit',
			modal: true,
			items: [{
				xtype: 'form',
				url: 'EntityModelAction!BuildJava.action',
				buttonAlign: 'center',
				layout: 'anchor',
				border: 0,
				margin: '-1 -1 -1 -1',
			    defaults: {
			        anchor: '100%'
			    },
			    bodyPadding: 20,
				fieldDefaults : {
					inputValue: 'true',
					uncheckedValue: 'false',
					labelWidth:120,
					lableAlign : 'right'
				},
				items : [
					{
						fieldLabel : '覆盖Action',
						xtype: 'checkbox',
						name:'coverAction'
					},
					{
						fieldLabel : '覆盖Service',
						xtype: 'checkbox',
						name:'coverService'
					},
					{
						fieldLabel : '全部覆盖',
						xtype: 'checkbox',
						name:'coverAll',
						listeners: {
							change: function(editor, newValue, oldValue){
								var form = editor.up('form');
								var fields = form.query('checkbox');
								Ext.each(fields,function(field){
									if (field != editor){
										field.setValue(newValue);
									}
								},this);
							}
						}
					},					
					{
						xtype: 'hiddenfield',
						name:'id',
						value: model.getId()
					}
				],
				buttons:[
					{
						text: '确 定',
			        	handler: function() {
							var form = this.up('form').getForm();
				            if (form.isValid()) {
				            	form.submit({
				                	waitMsg : '正在生成Java请稍后',
				                	waitTitle : '提示',
				                	success: function(form, action){
				            			win.close();
				            			Ext.Msg.alert('提示','生成成功');				            			
				                	},
				                    failure: function(form, action) {
				                        Ext.Msg.alert('生成失败', action.result.message);
				                    }
			                	});
					        }
				        }
			        },{
						text: '取 消',
						handler: function(){
							win.close();
						}
					}
				]
			}]
		});
		win.show();			
	},
	doCreate: function(){
		var _this = this;
		var win = Ext.widget('window',{
			title: '注册',
			width: 560,
			height: 160,
			layout: 'fit',
			modal: true,
			items: [{
				xtype: 'form',
				url: 'EntityModelAction!register.action',
				buttonAlign: 'center',
				layout: 'anchor',
			    defaults: {
			        anchor: '100%'
			    },
			    bodyPadding: 20,
			    defaultType:'textfield',
				fieldDefaults : {
					allowBlank : false,
					blankText: '不允许为空',
					labelWidth:70,
					lableAlign : 'right',
					msgTarget : 'side'
				},
				items : [
					{
						fieldLabel : '注册类名',
						name:'fullname'
					}
				],
				buttons:[
					{
						text: '注 册',
						formBind: true,
			        	disabled: true,
			        	handler: function() {
							var form = this.up('form').getForm();
				            if (form.isValid()) {
				            	form.submit({
				                	clientValidation: true,		                	
				                	waitMsg : '正在注册请稍后',
				                	waitTitle : '提示',
				                	success: function(form, action){
				            			_this.getGridStore().load();
				            			win.close();
				            			Ext.Msg.alert('提示','注册成功');				            			
				                	},
				                    failure: function(form, action) {
				                        Ext.Msg.alert('注册失败', action.result.message);
				                    }
			                	});
					        }
				        }
			        },{
						text: '取 消',
						handler: function(){
							win.close();
						}
					}
				]
			}]
		});
		win.show();		
	},
	onStoreSyncComplete: function(model){
		this.setEditing(false);
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
			this.doSwitchComponent(canRemove,'mainRemove','canRemove','enable','disable');
			this.doSwitchComponent(true,'mainView','canView','enable','disable');
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
	applyEditing: function(editing){
		this.doSwitchComponent(editing,'mainEdit','editing','enable','disable');
		return editing;
	},
	applyReady: function(ready){
		this.doSwitchComponent(ready,'mainReady','ready','enable','disable');
		return ready;
	}
});