Ext.define('Keer.store.ModelConfig.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'ModelConfig',
		actionBean: 'ModelConfig',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.model.ModelConfig'
	},
	fields : [
		{name:'editor',configMap:{emptyText:null,growMin:null,enumstore:null,store:null,xwindow:null,xcontainer:null,navTitle:null,navPropName:null,navcontainer:null,childTitle:null,childPropName:null,childcontainer:null,version:null,id:null,colField:null,displayField:null,name:null,clazzname:null,nonEmpty:null,indexCls:null,fullLine:null,privilegeMap:null,readOnly:null,modifyFlag:null},defaultValue:null},
		{name:'parent',configMap:{javafolder:null,remark:null,categoryField:null,canAuthorize:null,version:null,id:null,sortno:null,displayField:null,categoryNav:{javafolder:null,remark:null,categoryField:null,canAuthorize:null,version:null,id:null,sortno:null,displayField:null,layout:null,name:null,grid:null,clazzname:null,fullname:null,status:null,createdTime:null,code:null,indexCls:null,upfolder:null,privilegeMap:null,modifyFlag:null,parentField:null,appfolder:null},layout:null,name:null,grid:null,clazzname:null,fullname:null,status:null,createdTime:null,code:null,indexCls:null,upfolder:null,privilegeMap:null,parentModel:{javafolder:null,remark:null,categoryField:null,canAuthorize:null,version:null,id:null,sortno:null,displayField:null,layout:null,name:null,grid:null,clazzname:null,fullname:null,status:null,createdTime:null,code:null,indexCls:null,upfolder:null,privilegeMap:null,modifyFlag:null,parentField:null,appfolder:null},modifyFlag:null,parentField:null,appfolder:null},defaultValue:null},
		{name:'clazzname',type:'string'},
		{name:'sortno'},
		{name:'name',type:'string'},
		{name:'dataIndex',type:'string'},
		{name:'indexCls',type:'string'},
		{name:'columnWidth'},
		{name:'modifyFlag',type:'string'},
		{name:'text',type:'string'},
		{name:'fieldType',type:'string'},
		{name:'version'},
		{name:'id',type:'auto'},
		{name:'privilegeMap'},
		{name:'dataType',type:'auto'}
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
	//记录添加之前
	onAddBefore: function(store,scope){
		this.set('sortno',store.getCount()+1);
	},
	//◎【设置最终默认值】	
	onCreateBefore: function(store,scope){
		this.callParent(arguments);
	}
});