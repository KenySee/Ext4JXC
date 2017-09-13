Ext.define('Keer.widget.form.Panel',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.widget-form-panel',
	mixins: {
		FormLayout: 'Keer.widget.form.Layout'
	},
	requires: [
		'Ext.layout.*',
		'Keer.widget.action.Form'
	],	
	config:{
		column: 2,
		addWidth: 0,
		addHeight: 0,
		labelWidth: 60,
		tabList: null,
		labelAlign: 'left',
		autoLayout: true,
		tabLayout: true,
		cmdToolbar: [],
		formFields: null,
		formConfig: {}
	},
	initComponent: function(){
		var viewConfig = this.doFormLayout();
		viewConfig.listeners = viewConfig.listeners || {};
		Ext.apply(viewConfig.listeners,{
			boxready: this.onViewBoxReady
		});
		if (this.cmdToolbar.length > 0){
			Ext.apply(viewConfig,{
				tbar:{
					xtype: 'toolbar',
					itemId: 'cmdToolBar',
					items: this.cmdToolbar
				}			
			});
		}
		Ext.apply(this,viewConfig);
		this.callParent(arguments);
	}
});