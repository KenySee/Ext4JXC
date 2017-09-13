Ext.define('Keer.store.EntityModel.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'EntityModel',
		actionBean: 'EntityModel',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},	
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.model.EntityModel'
	},
	fields : [
		{name:'displayField',type:'string'},
		{name:'appfolder',type:'string'},
		{name:'permissions',configMap:{resource:{javafolder:null,remark:null,iconUrl:null,clazzAction:null,categoryField:null,canAuthorize:null,version:null,id:null,sortno:null,displayField:null,layout:null,name:null,grid:null,clazzname:null,fullname:null,signature:null,status:null,createdTime:null,code:null,url:null,indexCls:null,upfolder:null,privilegeMap:null,parentField:null,modifyFlag:null,menuType:null,appfolder:null},clazzScope:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,modifyFlag:null,role:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},clazzname:null},defaultValue:[]},
		{name:'fullname',type:'string'},
		{name:'categoryField',type:'string'},
		{name:'parentModel',configMap:{javafolder:null,remark:null,categoryField:null,canAuthorize:null,version:null,id:null,sortno:null,displayField:null,layout:null,name:null,grid:null,clazzname:null,fullname:null,status:null,createdTime:null,code:null,indexCls:null,upfolder:null,privilegeMap:null,modifyFlag:null,parentField:null,appfolder:null},defaultValue:null},
		{name:'status',type:'auto'},
		{name:'parentField',type:'string'},
		{name:'layout',type:'auto'},
		{name:'categoryNav',configMap:{javafolder:null,remark:null,categoryField:null,canAuthorize:null,version:null,id:null,sortno:null,displayField:null,layout:null,name:null,grid:null,clazzname:null,fullname:null,status:null,createdTime:null,code:null,indexCls:null,upfolder:null,privilegeMap:null,modifyFlag:null,parentField:null,appfolder:null},defaultValue:null},
		{name:'canAuthorize',type:'boolean'},
		{name:'createdTime',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'code',type:'string'},
		{name:'upfolder',type:'string'},
		{name:'sortno',type:'string'},
		{name:'privilegeMap'},
		{name:'clazzname',type:'string'},
		{name:'javafolder',type:'string'},
		{name:'details',configMap:{text:null,parent:{javafolder:null,remark:null,categoryField:null,canAuthorize:null,version:null,id:null,sortno:null,displayField:null,layout:null,name:null,grid:null,clazzname:null,fullname:null,status:null,createdTime:null,code:null,indexCls:null,upfolder:null,privilegeMap:null,modifyFlag:null,parentField:null,appfolder:null},dataIndex:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,dataType:null,modifyFlag:null,columnWidth:null,clazzname:null},defaultValue:[]},
		{name:'id',type:'auto'},
		{name:'version'},
		{name:'remark',type:'string'},
		{name:'indexCls',type:'string'},
		{name:'columns',configMap:{text:null,parent:{javafolder:null,remark:null,categoryField:null,canAuthorize:null,version:null,id:null,sortno:null,displayField:null,layout:null,name:null,grid:null,clazzname:null,fullname:null,status:null,createdTime:null,code:null,indexCls:null,upfolder:null,privilegeMap:null,modifyFlag:null,parentField:null,appfolder:null},dataIndex:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,dataType:null,editor:{version:null,id:null,displayField:null,name:null,clazzname:null,nonEmpty:null,indexCls:null,fullLine:null,privilegeMap:null,readOnly:null,modifyFlag:null},modifyFlag:null,columnWidth:null,clazzname:null},defaultValue:[]},
		{name:'modifyFlag',type:'string'},
		{name:'grid',type:'auto'},
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
	//◎【Model保存之前执行】
	onSyncBefore: function(scope){
		this.set('details',[]);
		this.callParent(arguments);
	},
	//◎【设置最终默认值】	
	onCreateBefore: function(store,scope){
		this.callParent(arguments);
	}
});