Ext.define('Keer.store.User.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'User',
		actionBean: 'User',
		actionMethod: 'findAll',
		parentProp: 'mainMember',
		categoryProp: 'mainMember'
	},
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.base.User'
	},
	fields : [
		{name:'loginname',type:'string'},
		{name:'modifyFlag',type:'string'},
		{name:'code',type:'string'},
		{name:'privilegeMap'},
		{name:'remark',type:'string'},
		{name:'id',type:'auto'},
		{name:'mainMember',configMap:{orgType:null,createdTime:null,remark:null,status:null,parent:{orgType:null,remark:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null},code:null,corporation:{orgType:null,createdTime:null,remark:null,status:null,code:null,version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,role:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},clazzname:null},defaultValue:null},
		{name:'password',type:'string',defaultValue:'123'},
		{name:'clazzname',type:'string'},
		{name:'version'},
		{name:'status',type:'auto'},
		{name:'userMembers',configMap:{orgType:null,remark:null,department:{orgType:null,createdTime:null,remark:null,status:null,code:null,version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},corporation:{orgType:null,createdTime:null,remark:null,status:null,code:null,version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},version:null,id:null,sortno:null,name:null,role:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},clazzname:null,post:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},status:null,createdTime:null,parent:{orgType:null,remark:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null},code:null,indexCls:null,privilegeMap:null,modifyFlag:null,user:{createdTime:null,remark:null,status:null,code:null,password:null,version:null,indexCls:null,id:null,sortno:null,loginname:null,privilegeMap:null,name:null,modifyFlag:null,isAdmin:null,clazzname:null}},defaultValue:[]},
		{name:'createdTime',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'name',type:'string'},
		{name:'indexCls',type:'string'},
		{name:'isAdmin',type:'boolean'},
		{name:'sortno',type:'string'}
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