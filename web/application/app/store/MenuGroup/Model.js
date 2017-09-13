Ext.define('Keer.store.MenuGroup.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'MenuGroup',
		actionBean: 'MenuGroup',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.menu.MenuGroup'
	},
	fields : [
		{name:'permissions',configMap:{resource:{javafolder:null,remark:null,iconUrl:null,clazzAction:null,categoryField:null,canAuthorize:null,version:null,id:null,sortno:null,layout:null,name:null,grid:null,clazzname:null,fullname:null,signature:null,status:null,createdTime:null,code:null,url:null,indexCls:null,upfolder:null,privilegeMap:null,modifyFlag:null,menuType:null,appfolder:null},clazzScope:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,modifyFlag:null,role:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},clazzname:null},defaultValue:[]},
		{name:'parent',configMap:{remark:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,parent:{remark:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},code:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},defaultValue:null},
		{name:'childs',configMap:{remark:null,iconUrl:null,clazzAction:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,parent:{remark:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},code:null,url:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},defaultValue:[]},
		{name:'name',type:'string'},
		{name:'sortno',type:'string'},
		{name:'clazzname',type:'string'},
		{name:'menuType',type:'auto'},
		{name:'code',type:'string'},
		{name:'indexCls',type:'string'},
		{name:'status',type:'auto'},
		{name:'remark',type:'string'},
		{name:'canAuthorize',type:'boolean'},
		{name:'privilegeMap'},
		{name:'modifyFlag',type:'string'},
		{name:'version'},
		{name:'createdTime',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'id',type:'auto'}
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