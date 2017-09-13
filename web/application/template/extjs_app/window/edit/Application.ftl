Ext.define('Keer.ui.${upfolder}.${appfolder}.window.edit.Application',{
	extend: 'Keer.app.Application',
	requires:[
		'Keer.ui.${upfolder}.${appfolder}.context.EditContext',
		'Keer.ui.${upfolder}.${appfolder}.window.edit.Controller',
		'Keer.ui.${upfolder}.${appfolder}.window.edit.Window'
	],
	alias: 'widget.${aliasPrefix}-${appfolder}-window-edit-application',
	config: {
		appParams: {},		//应用初始化参数
		viewParams: {},		//视图初始化参数
		injectorConfig: 	//注入器配置参数
		{  
			${appfolder}EditContext: 'Keer.ui.${upfolder}.${appfolder}.context.EditContext'
		},
		viewContainer: 'Keer.ui.${upfolder}.${appfolder}.window.edit.Window'
	},
	onViewContainerCreateBefore: function(appParams,viewParams){
		this.callParent(arguments);
	}
});