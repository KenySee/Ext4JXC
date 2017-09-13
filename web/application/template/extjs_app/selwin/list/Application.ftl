Ext.define('Keer.ui.${upfolder}.${appfolder}.selwin.list.Application',{
	extend: 'Keer.app.Application',
	requires:[
		'Keer.ui.${upfolder}.${appfolder}.selwin.list.Controller',
		'Keer.ui.${upfolder}.${appfolder}.selwin.list.Window'
	],
	alias: 'widget.${aliasPrefix}-${appfolder}-selwin-list-application',
	config: {
		appParams: {},		//应用初始化参数
		viewParams: {},		//视图初始化参数
		viewContainer: 'Keer.ui.${upfolder}.${appfolder}.selwin.list.Window'
	},
	onViewContainerCreateBefore: function(appParams,viewParams){
		this.callParent(arguments);
	}
});