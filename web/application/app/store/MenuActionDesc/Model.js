Ext.define('Keer.store.MenuActionDesc.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'MenuActionDesc',
		actionBean: 'MenuActionDesc',
		actionMethod: 'findAll',
		parentProp: 'menu',
		categoryProp: 'menu'
	},
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.menu.MenuActionDesc'
	},
	fields : [
		{name:'version'},
		{name:'actionType',type:'string'},
		{name:'privilegeMap'},
		{name:'id',type:'auto'},
		{name:'menu',configMap:{remark:null,iconUrl:null,clazzAction:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,parent:{remark:null,canAuthorize:null,version:null,id:null,sortno:null,name:null,clazzname:null,status:null,createdTime:null,code:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},code:null,url:null,indexCls:null,privilegeMap:null,modifyFlag:null,menuType:null},defaultValue:null},
		{name:'modifyFlag',type:'string'},
		{name:'actionDesc',type:'string'},
		{name:'indexCls',type:'string'},
		{name:'clazzname',type:'string'}
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