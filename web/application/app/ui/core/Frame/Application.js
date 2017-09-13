Ext.define('Keer.ui.core.Frame.Application',{
	extend: 'Deft.mvc.Application',
	requires:[
		'Keer.store.Frame.StoreUrl',
		'Keer.store.Frame.StoreTree',
		'Keer.ui.core.Frame.Controller',
		'Keer.ui.core.Frame.Viewport'
	],
	config: {
		viewContainer: 'Keer.ui.core.Frame.Viewport'
	},
	init : function() {
		this.beforeInit();
		var config = {};
		Deft.Injector.configure(this.onInjectorConfiguration(config));
		Deft.promise.Deferred.enableLogging = true;
		return this.afterInit();
	},
	onInjectorConfiguration : function(config) {
		return config;
	},
	beforeInit : function() {
		
	},
	afterInit : function() {
		Ext.tip.QuickTipManager.init();
		return Ext.create(this.getViewContainer());
	}
});