Ext.define('Keer.store.${appfolder}.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: '${appfolder}',
		actionBean: '${actionBean}',
		actionMethod: 'findAll',
		parentProp: '${parentField}',
		categoryProp: '${categoryField}'
	},	
	inheritableStatics: {
		clazzname: '${fullname}'
	},
	fields : [
		<#list toModelConfig() as item>
		${item}<#if item_has_next>,</#if>
		</#list>
	],
	//◎【是否可以增加明细】
	canAddDetail: function(field){
		return true;
	},
	//◎【是否可以编辑】
	canEdit: function(field){
		return true;
	},
	//◎【是否可以删除】
	canRemove: function(){
		return true;
	},
	//◎【是否向后台请求默认值】
	canDefaults: function(){
		return false;
	},
	//◎【数据加载完成后执行】
	onLoadComplete: function(operations){
	},
	//◎【Model保存之前执行】
	onSyncBefore: function(store,scope){
	},
	//◎【Model添加之前执行】
	onAddBefore: function(store,scope){
	},
	//◎【Model创建之前执行】	
	onCreateBefore: function(store,scope){
		this.callParent(arguments);
	}
});