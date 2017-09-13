Ext.define('Keer.store.MenuResource.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'MenuResource',
		actionBean: 'MenuResource',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.menu.MenuResource'
	},
	fields : [
		{name:'modifyFlag',type:'string'},
		{name:'url',type:'string'},
		{name:'status',type:'auto'},
		{name:'privilegeMap'},
		{name:'clazzAction',type:'string'},
		{name:'clazzname',type:'string'},
		{name:'permissions',configMap:{resource:{javafolder:null,remark:null,iconUrl:null,clazzAction:null,categoryField:null,canAuthorize:null,version:null,id:null,sortno:null,displayField:null,layout:null,name:null,grid:null,clazzname:null,fullname:null,signature:null,status:null,createdTime:null,code:null,url:null,indexCls:null,upfolder:null,privilegeMap:null,parentField:null,modifyFlag:null,menuType:null,appfolder:null},clazzScope:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,modifyFlag:null,role:{createdTime:null,remark:null,status:null,code:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null},clazzname:null},defaultValue:[]},
		{name:'remark',type:'string'},
		{name:'parent',configMap:{remark:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,parent:{remark:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},code:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},defaultValue:null},
		{name:'actions',configMap:{menu:{remark:null,iconUrl:null,clazzAction:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,url:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},actionType:null,version:null,indexCls:null,id:null,privilegeMap:null,modifyFlag:null,actionDesc:null,clazzname:null},defaultValue:[]},
		{name:'actionTypes',configMap:{menu:{remark:null,iconUrl:null,clazzAction:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,url:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},actionType:null,version:null,indexCls:null,id:null,privilegeMap:null,modifyFlag:null,actionDesc:null,clazzname:null},defaultValue:[]},
		{name:'childs',configMap:{remark:null,iconUrl:null,clazzAction:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,parent:{remark:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},code:null,url:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},defaultValue:[]},
		{name:'sortno',type:'string'},
		{name:'code',type:'string'},
		{name:'id',type:'auto'},
		{name:'iconUrl',type:'string'},
		{name:'name',type:'string'},
		{name:'canAuthorize',type:'boolean'},
		{name:'indexCls',type:'string'},
		{name:'menuType',type:'auto'},
		{name:'createdTime',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'version'}
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
		var menuType = this.get('menuType');
		if (menuType == 'MenuGroup'){
			return field == 'name' || field == 'parent' || field == 'iconUrl';
		}
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
		var count = store.getCount()+1;
		this.set('sortno',Ext.String.leftPad(count, 5, '0'));
	}
});