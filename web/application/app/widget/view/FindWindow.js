Ext.define('Keer.widget.view.FindWindow',{
	extend: 'Ext.window.Window',
	alias: 'widget.widget-view-findwindow',
	requires:[
		'Keer.widget.view.GridView',
		'Keer.widget.view.DataView',
		'Keer.widget.action.Form',
		'Keer.widget.form.Panel',
		'Keer.widget.button.ClassButton',
		'Keer.widget.toolbar.QueryToolbar'	
	],
	//【混入功能】
	mixins: {
		EnumRender: 'Keer.widget.mixin.EnumRender'
	},
	config:{
		canMulti: false,
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
	}	
});