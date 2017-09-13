Ext.define('Keer.widget.view.EditWindow',{
	extend: 'Ext.window.Window',
	alias: 'widget.widget-view-editwindow',
	mixins: {
		FormLayout: 'Keer.widget.form.Layout',
		EnumRender: 'Keer.widget.mixin.EnumRender'
	},
	requires: [
		'Ext.layout.*',
		'Keer.widget.view.GridView',
		'Keer.widget.view.DataView',
		'Keer.widget.action.Form',
		'Keer.widget.form.Panel',
		'Keer.widget.button.ClassButton',
		'Keer.widget.toolbar.QueryToolbar'
	],
	config:{
		column: 2,
		addWidth: 0,
		addHeight: 0,
		labelWidth: 60,
		labelAlign: 'left',
		autoLayout: true,
		tabLayout: true,
		cmdToolbar: [],
		formFields: [],
		formConfig: {},
		appParams:{}
	},
	constructor: function (config) {
		config = config || {};
		var control = this.getController();
		Ext.apply(control,config.appParams.initParam);
		this.initConfig(config);
		var params = {};
		for(k in config){
			var store = config[k];
			if (store.isStore){
				params[k] = store;
			}
		}
		Ext.apply(control,params);
		this.callParent(arguments);
	},
	doViewInitComponent: function(viewConfig){
		var control = this.getController();
		if (control){
			control.doViewInitComponent(viewConfig);
		}
		Ext.apply(this,viewConfig);
	},
	initComponent: function(){
		var win = this;
		if (this.items && this.items.length > 0){
			var nLen = this.items.length;
			for(var i = 0; i < nLen; i++){
				var component = this.items[i];
				if (component.xtype == 'widget-action-form'){
					Ext.apply(component,{itemId:'winform'});
					break;
				}
			}
		}
		var viewConfig = this.items ? {items:this.items} : this.doFormLayout();
		Ext.apply(viewConfig,{
			iconCls: 'menu_item',
			buttonAlign: 'center',
			modal: true,
			closable: false,
			maximizable:false,
			tools :[{
				type : 'close',
				handler: function(){
					if (win.control){
						win.control.doClose();
					}
					else {
						win.close();
					}
				}
			}]		
		});
		if (this.cmdToolbar.length > 0){
			Ext.apply(viewConfig,{
				buttons:{
					xtype: 'toolbar',
					itemId: 'cmdToolBar',
					items: this.cmdToolbar
				}			
			});
		}
		viewConfig.listeners = viewConfig.listeners || {};
		Ext.apply(viewConfig.listeners,{
			show: this.onViewBoxReady
		});
		this.getControl().doViewInitComponent(viewConfig);
		Ext.apply(this,viewConfig);
		Ext.applyIf(this,{layout:'fit'});
		this.callParent(arguments);
	}
});