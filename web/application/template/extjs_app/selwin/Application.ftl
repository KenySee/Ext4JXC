Ext.define('Keer.ui.${upfolder}.${appfolder}.selwin.Application',{
	extend: 'Keer.app.Application',
	requires:[
		'Keer.ui.${upfolder}.${appfolder}.selwin.Controller',
		'Keer.ui.${upfolder}.${appfolder}.selwin.Window'
	],
	alias: 'widget.${aliasPrefix}-${appfolder}-selwin-application',
	config: {
		appParams: {},		//应用初始化参数
		viewParams: {},		//视图初始化参数
		viewContainer: 'Keer.ui.${upfolder}.${appfolder}.selwin.Window'
	},
	onViewContainerCreateBefore: function(appParams,viewParams){
		this.callParent(arguments);
	}
});