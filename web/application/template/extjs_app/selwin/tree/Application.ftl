Ext.define('Keer.ui.${upfolder}.${appfolder}.selwin.tree.Application',{
	extend: 'Keer.app.Application',
	requires:[
		'Keer.ui.${upfolder}.${appfolder}.selwin.tree.Controller',
		'Keer.ui.${upfolder}.${appfolder}.selwin.tree.Window'
	],
	alias: 'widget.${aliasPrefix}-${appfolder}-selwin-tree-application',
	config: {
		appParams: {},		//应用初始化参数
		viewParams: {},		//视图初始化参数
		viewContainer: 'Keer.ui.${upfolder}.${appfolder}.selwin.tree.Window'
	},
	onViewContainerCreateBefore: function(appParams,viewParams){
		this.callParent(arguments);
	}
});