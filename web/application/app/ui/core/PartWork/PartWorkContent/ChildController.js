Ext.define('Keer.ui.core.PartWork.PartWorkContent.ChildController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
        'Keer.ui.core.PartArticle.PartArticleContent.tpl.JustifyTextView',
        'Keer.ui.core.PartArticle.PartArticleContent.ContentChildView'
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
		mainPanel:{},
		gridView:		{	
			listeners: {
				itemdblclick: 'onGridItemDbClick',
				selectionchange: 'onGridItemSelection'
			}
		},
		// toolbar_add: 	{	listeners: { click: 'doCreate'	} },
		toolbar_remove: {	listeners: { click: 'doRemove'	} },
		toolbar_edit: 	{	listeners: { click: 'doEdit'	} }
	},
	//【监听Store事件】
	observe: {
		gridStore:{
			beforeload: 'onGridStoreBeforeLoad'
		},
		callController: {
			onLoadDataComplete: 'onLoadDataComplete'
		}
	},
    doOpenTemplate: function (contentType, record) {
        var me = this;
        var win = Ext.create('Ext.window.Window', {
            title: '添加模板',
            height: 600,
            width: 900,
            layout: 'fit',
            items: {
                xtype: 'ui-core-PartArticle-PartArticleContent-ContentChildView',
                listeners: {
                    'boxready': function () {
                        var data = {};
                        if (record) {
                            data = record.get('contentValue');
                        }
                        this.loadData(contentType, data);
                    }
                }
            },
            buttons: [
                {
                    text: "保存", handler: function () {
                    var form = this.up('window').down('panel');
                    function callBack(data){
                        if (data) {
                            if (record) {
                                record.set('contentValue', JSON.stringify(data.data));
                            }
                            else {
                                var grid = me.getGridView();
                                var store = me.getGridStore();
                                var model = store.createModel({
                                    contentIndex: store.getCount() + 1,
                                    contentType: data.contentType,
                                    contentValue: data.data
                                });
                                me.doCreateRecord(grid, model);
                                store.add(model);
                            }
                            win.close();
                        }
                    }
                    form.fetchData(callBack);
                }
                },
                {
                    text: "保存并继续添加", handler: function () {
                    var form = this.up('window').down('panel');
                    var data = form.fetchData();
                    if (data) {
                        if (record) {
                            record.set('contentValue', JSON.stringify(data.data));
                        }
                        else {
                            var grid = me.getGridView();
                            var store = me.getGridStore();
                            var model = store.createModel({
                                contentIndex: store.getCount() + 1,
                                contentType: data.contentType,
                                contentValue: JSON.stringify(data.data)
                            });
                            me.doCreateRecord(grid, model);
                            store.add(model);
                            Ext.Msg.alert('提示', '添加成功！');
                            form.clearData();
                        }
                    }
                }
                },
                {
                    text: "取消", handler: function () {
                    win.close();
                }
                }
            ]
        });
        win.show();
    },
	//【调用者控制器加载数据完成时执行 】
	onLoadDataComplete: function(parent){
		this.set('parent',parent);
		var loadSync = this.get('loadSync');
		if (!loadSync){
			var store = this.getGridStore();
			store.load();
		}
		this.callParent(arguments);
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
  		var parent = this.get('parent');
	  	if (parent){
	  		Ext.apply(params,{
	  			work: parent.get('id')
	  		});
	  	}
  	},
  	onCreateRecord: function(component,record){
     	this.callParent(arguments);
     	var parent = this.get('parent');
		if (parent){
			record.set('work',this.getJSONBean(parent,'workName'));
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
			this.doOpenEditWindow('ui-core-PartWork-PartWorkContent-editwindow',grid,store,model,false);
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
		this.doOpenEditWindow('ui-core-PartWork-PartWorkContent-editwindow',grid,store,model,true);
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
        var contentType = record.get('contentType');
        this.setGridModel(record);
        this.doOpenTemplate(contentType,record);
        // this.setGridModel(record);
        // this.doEdit();
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
	applyAdding: function(adding){
		this.doSwitchComponent(adding,'childAdd','adding','enable','disable');
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