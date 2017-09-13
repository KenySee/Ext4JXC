Ext.define('Keer.store.PortalWidget.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'PortalWidget',
		actionBean: 'PortalWidget',
		actionMethod: 'findAll',
		parentProp: 'resource',
		categoryProp: 'parent'
	},	
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.portal.PortalWidget'
	},
	fields : [
		{name:'createDate',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'name',type:'string'},
		{name:'resource',configMap:{layoutColumn:null,createdTime:null,remark:null,status:null,code:null,canAuthorize:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null,createDate:null},defaultValue:null},
		{name:'items',configMap:{portalType:null,resource:{layoutColumn:null,createdTime:null,remark:null,status:null,code:null,canAuthorize:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null,createDate:null},version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,widgetUrl:null,name:null,modifyFlag:null,clazzname:null,createDate:null,parent:{portalType:null,layoutColumn:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null,createDate:null}},defaultValue:[]},
		{name:'version'},
		{name:'id',type:'auto'},
		{name:'widgetUrl',type:'string'},
		{name:'portalType',type:'auto'},
		{name:'indexCls',type:'string'},
		{name:'modifyFlag',type:'string'},
		{name:'clazzname',type:'string'},
		{name:'parent',configMap:{portalType:null,layoutColumn:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null,createDate:null},defaultValue:null},
		{name:'sortno',type:'string'},
		{name:'layoutColumn'},
		{name:'privilegeMap'}
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
		if (store){
			var count = store.getCount();
			this.set('sortno',count+1);
		}
	},
	//◎【Model创建之前执行】	
	onCreateBefore: function(store,scope){
		this.callParent(arguments);
	}
});