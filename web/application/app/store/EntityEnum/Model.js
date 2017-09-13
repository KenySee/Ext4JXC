Ext.define('Keer.store.EntityEnum.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'EntityEnum',
		actionBean: 'EntityEnum',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.enums.entity.EntityEnum'
	},
	fields : [
		{name:'modifyFlag',type:'string'},
		{name:'remark',type:'string'},
		{name:'version'},
		{name:'clazzname',type:'string'},
		{name:'status',type:'auto'},
		{name:'name',type:'string'},
		{name:'code',type:'string'},
		{name:'createdTime',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'privilegeMap'},
		{name:'id',type:'auto'},
		{name:'sortno',type:'string'},
		{name:'indexCls',type:'string'}
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