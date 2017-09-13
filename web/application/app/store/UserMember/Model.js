Ext.define('Keer.store.UserMember.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'UserMember',
		actionBean: 'UserMember',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.organization.UserMember'
	},
	fields : [
		{name:'corporation',configMap:{orgType:null,createdTime:null,remark:null,status:null,parent:{orgType:null,remark:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null},code:null,version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,role:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},clazzname:null},defaultValue:null},
		{name:'roles',configMap:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},defaultValue:[]},
		{name:'privilegeMap'},
		{name:'orgRoles',configMap:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},defaultValue:[]},
		{name:'childs',configMap:{orgType:null,remark:null,department:{orgType:null,createdTime:null,remark:null,status:null,code:null,version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},corporation:{orgType:null,createdTime:null,remark:null,status:null,code:null,version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},version:null,id:null,sortno:null,name:null,role:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},clazzname:null,post:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},status:null,createdTime:null,parent:{orgType:null,remark:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null},code:null,indexCls:null,privilegeMap:null,modifyFlag:null,user:{createdTime:null,remark:null,status:null,code:null,password:null,version:null,indexCls:null,id:null,sortno:null,loginname:null,privilegeMap:null,name:null,modifyFlag:null,isAdmin:null,clazzname:null}},defaultValue:[]},
		{name:'modifyFlag',type:'string'},
		{name:'id',type:'auto'},
		{name:'sortno',type:'string'},
		{name:'orgType',type:'auto'},
		{name:'indexCls',type:'string'},
		{name:'name',type:'string'},
		{name:'version'},
		{name:'post',configMap:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},defaultValue:null},
		{name:'clazzname',type:'string'},
		{name:'status',type:'auto'},
		{name:'parent',configMap:{orgType:null,remark:null,department:{orgType:null,createdTime:null,remark:null,status:null,code:null,version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},corporation:{orgType:null,createdTime:null,remark:null,status:null,code:null,version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},version:null,id:null,sortno:null,name:null,role:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},clazzname:null,post:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},status:null,createdTime:null,parent:{orgType:null,remark:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null},code:null,indexCls:null,privilegeMap:null,modifyFlag:null,user:{createdTime:null,remark:null,status:null,code:null,password:null,version:null,indexCls:null,id:null,sortno:null,loginname:null,privilegeMap:null,name:null,modifyFlag:null,isAdmin:null,clazzname:null}},defaultValue:null},
		{name:'createdTime',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'department',configMap:{orgType:null,createdTime:null,remark:null,status:null,parent:{orgType:null,remark:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null},code:null,corporation:{orgType:null,createdTime:null,remark:null,status:null,code:null,version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,role:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},clazzname:null},defaultValue:null},
		{name:'code',type:'string'},
		{name:'role',configMap:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},defaultValue:null},
		{name:'remark',type:'string'},
		{name:'user',configMap:{mainMember:{orgType:null,createdTime:null,remark:null,status:null,code:null,version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},createdTime:null,remark:null,status:null,code:null,password:null,version:null,indexCls:null,id:null,sortno:null,loginname:null,privilegeMap:null,name:null,modifyFlag:null,isAdmin:null,clazzname:null},defaultValue:null},
		{name:'parentOrgRoles',configMap:{orgType:null,remark:null,department:{orgType:null,createdTime:null,remark:null,status:null,code:null,version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},corporation:{orgType:null,createdTime:null,remark:null,status:null,code:null,version:null,id:null,indexCls:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},version:null,id:null,sortno:null,name:null,role:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},clazzname:null,post:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},status:null,createdTime:null,parent:{orgType:null,remark:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null},code:null,indexCls:null,privilegeMap:null,modifyFlag:null,user:{createdTime:null,remark:null,status:null,code:null,password:null,version:null,indexCls:null,id:null,sortno:null,loginname:null,privilegeMap:null,name:null,modifyFlag:null,isAdmin:null,clazzname:null}},defaultValue:[]}
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