Ext.define('Keer.store.Menu.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'Menu',
		actionBean: 'Menu',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.menu.Menu'
	},
	fields : [
		{name:'childs',configMap:{remark:null,iconUrl:null,clazzAction:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,parent:{remark:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},code:null,url:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},defaultValue:[]},
		{name:'code',type:'string'},
		{name:'actions',configMap:{menu:{remark:null,iconUrl:null,clazzAction:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,url:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},actionType:null,version:null,indexCls:null,id:null,privilegeMap:null,modifyFlag:null,actionDesc:null,clazzname:null},defaultValue:[]},
		{name:'menuType',type:'auto'},
		{name:'canAuthorize',type:'boolean'},
		{name:'clazzname',type:'string'},
		{name:'sortno',type:'string'},
		{name:'parent',configMap:{remark:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,parent:{remark:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},code:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},defaultValue:null},
		{name:'indexCls',type:'string'},
		{name:'status',type:'auto'},
		{name:'createdTime',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'iconUrl',type:'string'},
		{name:'url',type:'string'},
		{name:'remark',type:'string'},
		{name:'id',type:'auto'},
		{name:'version'},
		{name:'privilegeMap'},
		{name:'modifyFlag',type:'string'},
		{name:'clazzAction',type:'string'},
		{name:'name',type:'string'},
		{name:'permissions',configMap:{resource:{javafolder:null,remark:null,iconUrl:null,clazzAction:null,categoryField:null,canAuthorize:null,version:null,id:null,sortno:null,layout:null,name:null,grid:null,clazzname:null,fullname:null,signature:null,status:null,createdTime:null,code:null,url:null,indexCls:null,upfolder:null,privilegeMap:null,modifyFlag:null,menuType:null,appfolder:null},clazzScope:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,modifyFlag:null,role:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},clazzname:null},defaultValue:[]}
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