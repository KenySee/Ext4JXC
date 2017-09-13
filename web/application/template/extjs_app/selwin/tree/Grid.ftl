Ext.define('Keer.ui.${upfolder}.${appfolder}.selwin.tree.Grid',{
	extend: 'Keer.app.view.widget.Grid',
	config: {
		controller: null
	},
	alias: 'widget.${aliasPrefix}-${appfolder}-selwin-tree-grid',
	<#assign itemlist = toCommonRequires()>
	<#if (itemlist?size > 0)>
	requires:[
		<#list itemlist as item>
		'${item}'<#if item_has_next>,</#if>
		</#list>
	],
	</#if>
	initComponent: function(){
		this.columns = this.columns || [];
		if (this.columns.length == 0){
			this.columns.unshift({text:'No.',xtype: 'rownumberer',width:32});
			Ext.Array.push(this.columns,[
				<#list toCommonConfig() as item>
				${item}<#if item_has_next>,</#if>
				</#list>
			]);
		}
		this.callParent(arguments);
	}
});