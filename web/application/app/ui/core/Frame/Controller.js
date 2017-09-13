Ext.define('Keer.ui.core.Frame.Controller',{
	extend: 'Keer.widget.mvc.Controller',
	config: {
		urlStore: Ext.widget('Frame-storeurl',{actionMethod:'findMenuByUrl'}),
		renderStore: Ext.widget('Frame-storetree')
	},
	requires:[
		'Keer.store.comm.buildEnumStore'
	],
	control: {
		renderView: {
			listeners: {
				itemclick: 'renderView_itemclick'
			}
		},
		tabPanel: {
			listeners: {
				tabchange: 'tabPanel_tabchange'
			}
		},
		reloadTool: {
			listeners: {
				click: "reloadTool_click"
			}
		}
	},
	tabPanel_tabchange: function(tabPanel, newCard, oldCard, eOpts){
	},
	doOpenMenu: function(record,closeif,initParam){
		var tabControl = this.getTabPanel();
		var leaf = record.get('leaf');
		if (leaf){
			var itemid = 'tab-'+record.get('id');
			var tab = tabControl.child('#'+itemid);
			if (!tab){
				var viewAlias = record.get('url');
				var application = Ext.create(viewAlias,{
						appParams: {menudata: {menu:record},frameController:this, constParam: initParam || {}}
				});
				var viewContainer = application.init ? application.init() : application;	
				Ext.apply(viewContainer,{title: record.get('name'),itemId: itemid, closable: closeif,scale:'large',iconCls: 'application_view_columns'});
				tab = tabControl.add(viewContainer);
			}
			tabControl.setActiveTab(tab);
		}	
	},
	onViewBoxReady: function(){
		this.callParent(arguments);
		this.doLoadTreePanel();
		this.requestMenu('Keer.ui.core.Report.MainContainer');
		var store = Ext.widget('comm-buildEnum-store');
		store.load({
			callback: function(records, operation, success){
				Keer.enumstore = Keer.enumstore || {};
				Ext.each(records,function(record){
					var num = record.get('id');
					if (num){
						var id = Ext.String.uncapitalize(num);
						var data = record.get('data');
						var clazz = record.get('clazz');
						Keer.enumstore[id] = Ext.create('Ext.data.Store',{
							storeId: 'comm-'+id,
							idProperty:'id',
							fields:[{name:'id', type: 'string'}, {name:'name', type: 'string'}, {name:'type', type: 'string'}],
							data:data,
							proxy : {
								type : 'ajax',
								reader : {
									type : 'json',
									root : 'data',
									successProperty : 'success'
								},
								extraParams: {clazzname:clazz},
								url : 'EntityEnumAction!findAll.action'
							}
						});
					}
				});
			}
		});
	},
	doLoadTreePanel: function(){
		var container = this.getRenderView();
		var store = this.getRenderStore();
		var me = this;
		var params = {};
		Ext.apply(params,{navLoad:true});
		store.load({
			params: params,
			callback: function(records, operation, success){
				if (success){
					 Ext.each(records,function(record){
						 var id = record.get('id');
						 var itemid = 'tab-' + record.get('id');
						 var name = record.get('name');
						 var iconUrl = record.get('iconUrl');
						 var childPanel = container.child('#'+itemid);
						 if (childPanel){
							 childPanel.getStore().load({params:{navLoad:true}});
						 }
						 else {
						 	container.add(me.createTreePanel(id,itemid,name,iconUrl,container));
						 }
					 });
				}
			}
		});
	},
	createTreePanel: function(id,itemid,name,iconUrl,container){
		var store = this.getRenderStore();
		var me = this;
		var treeStore = Ext.create('Ext.data.TreeStore',{
			model: store.model,
			sorters: [{property : 'sortno',direction : 'ASC'}],
			defaultRootId: id,
			proxy: store.getProxy()
		});
		
		var treePanel = Ext.create('Ext.tree.Panel', {
			itemId: itemid,
			title: name,
			iconCls: iconUrl,
			useArrows: true,
			rootVisible : false,
			margin : '0 0 0 0',
			folderSort : true,
			displayField : 'name',
			store : treeStore			
		});
		
		treePanel.on('itemcontextmenu',function(view, record, item, index, e){
			e.preventDefault();
		});
		
		container.relayEvents(treePanel,['itemdblclick','itemclick','itemcontextmenu']);
		
		return treePanel;
	},	
	onCreateWidget: function(){
		this.callParent(arguments);
		var view = this.getView();
		var nav = this.queryViewComponent(view,'panel[region=west]');
		var tab = this.queryViewComponent(view,'panel[region=center]');
		var tool = nav.down('#refresh');
		this.control.renderView.selector = Ext.String.format('#{0}',nav.getItemId());
		this.control.tabPanel.selector = Ext.String.format('#{0}',tab.getItemId());
		this.control.reloadTool.selector = Ext.String.format('#{0}',tool.getItemId());
	},
	renderView_itemclick: function(navpanel, record, item, index, e, eOpts){
		this.doOpenMenu(record,true);
	},
	reloadTool_click: function(){
		var nav = this.getRenderView();
  		this.doLoadTreePanel(nav);
	},
	requestMenu: function(menuUrl){
		var me = this;
		var store = this.getUrlStore();
		store.load({
			params:{url:menuUrl},
			callback: function(records, operation, success){
				if (success && records.length > 0){
					me.doOpenMenu(records[0],false);
				}
			}
		});
	}	
});