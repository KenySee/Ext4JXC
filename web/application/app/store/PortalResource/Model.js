Ext.define('Keer.store.PortalResource.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'PortalResource',
		actionBean: 'PortalResource',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},	
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.portal.PortalResource'
	},
	fields : [
		{name:'createDate',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'id',type:'auto'},
		{name:'status',type:'auto'},
		{name:'privilegeMap'},
		{name:'code',type:'string'},
		{name:'createdTime',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'canAuthorize',type:'boolean',defaultValue:false},
		{name:'version'},
		{name:'childs',configMap:{portalType:null,layoutColumn:null,resource:{layoutColumn:null,createdTime:null,remark:null,status:null,code:null,canAuthorize:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null,createDate:null},version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,widgetUrl:null,name:null,modifyFlag:null,group:{portalType:null,layoutColumn:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null,createDate:null},clazzname:null,createDate:null},defaultValue:[]},
		{name:'permissions',configMap:{resource:{remark:null,javafolder:null,iconUrl:null,clazzAction:null,categoryField:null,canAuthorize:null,version:null,id:null,sortno:null,displayField:null,name:null,layout:null,grid:null,createDate:null,clazzname:null,signature:null,fullname:null,layoutColumn:null,status:null,createdTime:null,code:null,url:null,indexCls:null,upfolder:null,privilegeMap:null,modifyFlag:null,parentField:null,menuType:null,appfolder:null},clazzScope:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,modifyFlag:null,role:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null,createDate:null},clazzname:null,createDate:null},defaultValue:[]},
		{name:'name',type:'string'},
		{name:'remark',type:'string'},
		{name:'modifyFlag',type:'string'},
		{name:'layoutColumn'},
		{name:'indexCls',type:'string'},
		{name:'sortno',type:'string'},
		{name:'clazzname',type:'string'}
	],
	//◎【数据加载完成后执行】
	onLoadComplete: function(operations){
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