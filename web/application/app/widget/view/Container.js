Ext.define('Keer.widget.view.Container',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.widget-view-container',
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
	borde : 0,
	margin : '-1 -1 -1 -1',
	config:{
		canMulti: false,
		mainWidth: 220,
		mainHeight: 300,
		tabLayout: false,
		childAlign: null,
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
			if (store && store.isStore){
				if (!store.controller){
					store.controller = control;
				}
				params[k] = store;
			}
		}
		Ext.apply(control,params);
		this.callParent(arguments);
	},
	doViewInitComponent: function(viewConfig){
		var control = this.getController();
		if (Ext.isString(this.childAlign)){
			var grid = control.down(viewConfig,'gridView');
			if (grid){
				var colList = [];
				Ext.each(grid.columns,function(column){
					if (column.xcontainer){
						colList.push(column);
					}
				});
				var mainPanel = control.down(viewConfig,'mainPanel');
				if (mainPanel && colList.length > 0){
					if (this.childAlign == 'bottom'){
						Ext.apply(mainPanel,{
							minHeight : 0,
							height : this.mainHeight,
							margin : '-1 -1 0 -1',
							region : 'north',
							collapsible : false,
							collapsed : false,
							hideCollapseTool : true,
							maintainFlex : true,
							split : true,
							deferRowRender:true,
							autoScroll : false
						});
					}
					else {
						Ext.apply(mainPanel,{
							minWidth : 0,
							width : this.mainWidth,
							margin : '-1 0 2 -1',
							region : 'west',
							collapseMode: 'mini',
							collapsible : true,
							collapsed : false,
							hideCollapseTool : true,
							maintainFlex : true,
							split : true,
							deferRowRender:true,
							autoScroll : false
						});
					}
					var childPanel = {
						xtype: 'widget-form-panel',
						layout: 'fit',
						itemId: 'childPanel',
						region: 'center',
						border: 0,
						tabLayout: this.tabLayout,
						margin : '-1 -1 -1 -1',
						addWidth: this.addWidth,
						addHeight: this.addHeight,
						tabList: colList
					};
					Ext.apply(viewConfig,{layout:'border'});
					control.addViewComponent(viewConfig,childPanel);
				}
			}
		}
		if (control){
			control.doViewInitComponent(viewConfig);
		}
		Ext.apply(this,viewConfig);
	}
});