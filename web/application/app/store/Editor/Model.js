Ext.define('Keer.store.Editor.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'Editor',
		actionBean: 'Editor',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.model.Editor'
	},
	fields : [
		{name:'id'}, 
		{name: 'clazzname',type: 'string'},
		{name: 'version',type: 'int'}, 
		{name: 'colspan',type: 'int'},
		{name: 'growMin',type: 'int', defaultValue:null},
		{name: 'height',type: 'int', defaultValue:null},
		{name: 'name',type: 'string'},
		{name: 'displayField',type: 'string'},
		{name: 'enumType',type: 'string'},
		{name: 'parentProp',type: 'string'},
		{name: 'readOnly',type: 'boolean'},
		{name: 'fullLine',type: 'boolean'},
		{name: 'nonEmpty',type: 'boolean'},
		{name: 'forcedWrap',type: 'boolean'},
		{name: 'store'},
		{name: 'childStore'},
		{name: 'emptyText'},
		{name: 'xcontainer'},
		{name: 'xwindow'},
		{name: 'colField',type: 'string'}
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