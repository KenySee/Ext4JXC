Ext.define('Keer.store.ModelDetail.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'ModelDetail',
		actionBean: 'ModelDetail',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.model.ModelDetail'
	},
	fields : [
		{name:'version', type: 'int'},
		{name:'clazzname', type: 'string'},
		{name:'modifyFlag',type: 'string'},
		{name:'sortno'},
		{name:'columnWidth'},
		{name:'dataType',type:'auto'},
		{name:'text',type:'string'},
		{name:'fieldType',type:'string'},
		{name:'parent',configMap:{id:null,version:null,code:null,name:null,clazzname:null},defaultValue:null},
		{name:'dataIndex',type:'string'},
		{name:'privilegeMap'}
	],
	//◎【数据加载完成后执行】
	onLoadComplete: function(operations){
		this.callParent(arguments);
	},
	//◎【是否可以增加明细】
	canAddDetail: function(){
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
	//◎【给父对象赋值】
	setParent: function(parent,parentName,parentText){
		this.callParent(arguments);
	},
	//◎【设置最终默认值】	
	onCreateBefore: function(store,scope){
		this.callParent(arguments);
	}
});