Ext.define('Keer.widget.button.ClassButton',{
	extend: 'Ext.button.Split',
	alias: 'widget.widget-button-classbutton',
	config:{
		control: null,
		store: null
	},
	getControl: function(){
		if (!this.control){
			var view = this;
		  	while (view && !view.getController){
		  		view = view.up('box');
		  	}
		  	if (view){
		  		this.control = view.getController();
		  	}
		}
		return this.control;
	},
	fireEvent: function(eventName,arg){
		if (eventName == 'click'){
			if (!arg.isModel){
				return false;
			}
		}
		return this.callParent(arguments);
	},
	doAddFunc: function(menu){
		var store = this.getStore();
		var model = store.createModel({createDate:Ext.Date.format(new Date(),'Y-m-d H:i:s')});
		model.set('clazzname',menu.clazz);
		model.set('iconCls',menu.prop);
		model.set('indexCls',menu.iconCls);
		this.fireEvent('click',model);
	},
	loadMenu: function(model){
		Ext.Ajax.request({
			url: 'SplitButtonAction!findAll.action',
			params: {
			    clazzname: model.get('clazzname'),
			    suppername: model.self.clazzname
			},
			success: function(response){
			    var obj = Ext.decode(response.responseText);
			    this.getControl().doCreateSplitButton(this,obj.data,Ext.bind(this.doAddFunc,this));
			},
			scope: this
		});	
	},
	findMenu: function(model){
		if (!model){
			var store = this.getStore();
			if (store){
				model = store.createModel();
			}
		}
		if (model){
			Ext.Ajax.request({
				url: 'SplitButtonAction!find.action',
				params: {
				    suppername: model.self.clazzname
				},
				success: function(response){
					var obj = Ext.decode(response.responseText);
					this.getControl().doCreateSplitButton(this,obj.data,Ext.bind(this.doAddFunc,this));
				},
				scope: this
			});
		}
	},
	onViewBoxReady: function(){
		this.findMenu();
	},
	initComponent: function(){
		Ext.apply(this,{
			clickEvent: 'click',
			listeners:{
				boxready: this.onViewBoxReady
			}
		});
		this.callParent(arguments);
	}
});