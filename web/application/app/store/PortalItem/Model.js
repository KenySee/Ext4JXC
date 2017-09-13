Ext.define('Keer.store.PortalItem.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'PortalItem',
		actionBean: 'PortalItem',
		actionMethod: 'findAll',
		parentProp: 'group',
		categoryProp: 'parent'
	},	
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.portal.PortalItem'
	},
	fields : [
		{name:'modifyFlag',type:'string'},
		{name:'privilegeMap'},
		{name:'indexCls',type:'string'},
		{name:'widgetUrl',type:'string'},
		{name:'id',type:'auto'},
		{name:'name',type:'string'},
		{name:'parent',configMap:{portalType:null,layoutColumn:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null,createDate:null},defaultValue:null},
		{name:'portalType',type:'auto'},
		{name:'clazzname',type:'string'},
		{name:'version'},
		{name:'sortno',type:'string'},
		{name:'createDate',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'resource',configMap:{layoutColumn:null,createdTime:null,remark:null,status:null,code:null,canAuthorize:null,version:null,indexCls:null,id:null,sortno:null,privilegeMap:null,name:null,modifyFlag:null,clazzname:null,createDate:null},defaultValue:null}
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