Ext.define('Keer.store.Widget.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'Widget',
		actionBean: 'Widget',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.model.Widget'
	},
	fields : [
		{name:'clazzname',type:'string'},
		{name:'aliasname',type:'string'},
		{name:'id',type:'auto'},
		{name:'sortno',type:'string'},
		{name:'status',type:'auto'},
		{name:'version'},
		{name:'privilegeMap'},
		{name:'code',type:'string'},
		{name:'classname',type:'string'},
		{name:'remark',type:'string'},
		{name:'modifyFlag',type:'string'},
		{name:'createdTime',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'indexCls',type:'string'},
		{name:'name',type:'string'}
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