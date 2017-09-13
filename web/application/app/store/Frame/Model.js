Ext.define('Keer.store.Frame.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'MenuResource',
		actionBean: 'MenuResource',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},
	inheritableStatics: {
		clazzname: 'com.keer.core.bean.permission.MenuResource'
	},
	fields : [
		{name:'id'}, 
		{name:'version',type: 'int'}, 
		{name:'modifyFlag',type: 'string'},
		{name:'clazzAction',type:'string'},
		{name:'systemUrl',type: 'string'},
		{name:'departmentUrl',type: 'string'},
		{name:'subDepartmentUrl',type: 'string'},
		{name:'userUrl',type: 'string'},
		{name:'systemFile',type: 'string'},
		{name:'departmentFile',type: 'string'},
		{name:'subDepartmentFile',type: 'string'},
		{name:'userFile',type: 'string'},
		{name: 'code',type: 'string'},
		{name: 'name',type: 'string'},
		{name: 'url', type: 'string'},
		{name: 'iconCls',type:'string'},
		{name: 'icon',type: 'string'},
		{name: 'sortno', type: 'string'},
		{name: 'leaf',type: 'boolean'},
		{name: 'clazzname',type: 'string'},
		{name:'parent',configMap:{id:null,version:null,clazzname:null,name:null}}
	],
	//◎【设置最终默认值】	
	onCreateBefore: function(store,scope){
		this.callParent(arguments);
	}
});