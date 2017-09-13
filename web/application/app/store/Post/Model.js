Ext.define('Keer.store.Post.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'Post',
		actionBean: 'Post',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.base.Post'
	},
	fields : [
		{name:'remark',type:'string'},
		{name:'sortno',type:'string'},
		{name:'createDate',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'id',type:'auto'},
		{name:'clazzname',type:'string'},
		{name:'roles',configMap:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},defaultValue:[]},
		{name:'privilegeMap'},
		{name:'version'},
		{name:'indexCls',type:'string'},
		{name:'name',type:'string'},
		{name:'code',type:'string'},
		{name:'status',type:'auto'},
		{name:'modifyFlag',type:'string'}
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