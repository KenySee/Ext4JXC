Ext.define('Keer.ui.${upfolder}.${appfolder}.Application',{
	extend: 'Keer.app.Application',
	requires:[
		'Keer.ui.${upfolder}.${appfolder}.context.Context',
		'Keer.ui.${upfolder}.${appfolder}.container.<#if layout?lower_case != 'panel'>${layout?lower_case}.</#if>Controller',
		'Keer.ui.${upfolder}.${appfolder}.container.<#if layout?lower_case != 'panel'>${layout?lower_case}.</#if>Container'
	],
	alias: 'widget.${aliasPrefix}-${appfolder}-application',
	config: {
		appParams: {},		//应用初始化参数
		viewParams: {},		//视图初始化参数
		injectorConfig: 	//注入器配置参数
		{  
			${appfolder}Context: 'Keer.ui.${upfolder}.${appfolder}.context.Context'
		},
		viewContainer: 'Keer.ui.${upfolder}.${appfolder}.container.<#if layout?lower_case != 'panel'>${layout?lower_case}.</#if>Container'
	},
	onViewContainerCreateAfter: function(container){
		
	},
	onViewContainerCreateBefore: function(appParams,viewParams){
		this.callParent(arguments);
		<#if grid?lower_case != 'popup'>
		Ext.apply(appParams,{
			initParam:{
				popupNew: false,		//【是否允许弹出新增,子类可以覆盖】
				inlineEdit: true,		//【是否允许行内编辑,子类可以覆盖】
				allowDbClick: false		//【是否允许双击,子类可以覆盖】		
			}
		});
		</#if>
	}
});