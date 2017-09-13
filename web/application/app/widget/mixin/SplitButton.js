Ext.define('Keer.widget.mixin.SplitButton',{
	extend: 'Keer.widget.AbstractController',
	config: {
		splitMenu: null	    //中间变量,存储当前点击的菜单项
	},
	onBeforeAddRecord: function() { return false; },
	onBeforeAddViewComponent: function(container,config){
		if (config.itemId == 'toolbar_add'){
			Ext.apply(config,{
				menu: []
			});
		}
	},
	onViewBoxReady: function(){
		var me = this;
		var store = this.getGridStore();
		if (store){
			var model = new store.model();
			Ext.Ajax.request({
			   	url: 'SplitButtonAction!find.action',
			   	params: {
			       	suppername: model.self.clazzname
			   	},
			   	success: function(response){
			       	var obj = Ext.decode(response.responseText);
			       	me.doRenderSplitButton(obj.data);
			   	}
			});
		}
	},
	onNavItemSelection: function(component/*在哪个控件上选中*/,record/*选中Model*/){
		if (record){
			var store = this.getGridStore();
			if (store){
				var model = new store.model();
				var me = this;
				Ext.Ajax.request({
			    	url: 'SplitButtonAction!findAll.action',
			    	params: {
			        	clazzname: record.get('clazzname'),
			        	suppername: model.self.clazzname
			    	},
			    	success: function(response){
			        	var obj = Ext.decode(response.responseText);
			        	me.doRenderSplitButton(obj.data);
			    	}
				});
			}
		}
	},
	doRenderSplitButton: function(menus){
		var toolbar = this.getCmdToolBar();
		if (toolbar){
			var button = toolbar.down('[iconCls=add]');
			var me = this;
			Ext.each(menus,function(item1){
				if (item1.menu){
					Ext.each(item1.menu,function(item2){
						Ext.apply(item2,{handler: function(menu){
							me.setSplitMenu(menu);
							var store = me.getGridStore();
							var model = new store.model();
							model.set('clazzname',menu.clazz);
					  		model.set('iconCls',menu.prop);
							model.set('indexCls',menu.iconCls);			
							me.doAddRecord(store,model);
						}});
					});
				}
				else {
					Ext.apply(item1,{handler: function(menu){
						me.setSplitMenu(menu);
						var store = me.getGridStore();
						var model = new store.model();
						model.set('clazzname',menu.clazz);
					  	model.set('iconCls',menu.prop);
						model.set('indexCls',menu.iconCls);			
						me.doAddRecord(store,model);
					}});
				}
			});
			button.menu = Ext.create('Ext.menu.Menu',{items: menus});
		}
	}
});