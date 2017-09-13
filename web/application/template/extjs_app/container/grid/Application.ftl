Ext.define('Keer.ui.${upfolder}.${appfolder}.container.grid.Application',{
	extend: 'Keer.app.Application',
	requires:[
		'Keer.ui.${upfolder}.${appfolder}.context.Context',
		'Keer.ui.${upfolder}.${appfolder}.container.grid.Controller',
		'Keer.ui.${upfolder}.${appfolder}.container.grid.Container'
	],
	alias: 'widget.${aliasPrefix}-${appfolder}-container-grid-application',
	config: {
		appParams: {},		//应用初始化参数
		viewParams: {},		//视图初始化参数
		injectorConfig: 	//注入器配置参数
		{  
			${appfolder}Context: 'Keer.ui.${upfolder}.${appfolder}.context.Context'
		},
		viewContainer: 'Keer.ui.${upfolder}.${appfolder}.container.grid.Container'
	},
	onViewContainerCreateBefore: function(appParams,viewParams){
		this.callParent(arguments);
	}
});