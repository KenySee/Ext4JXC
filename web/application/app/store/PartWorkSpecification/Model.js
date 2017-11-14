Ext.define('Keer.store.PartWorkSpecification.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'PartWorkSpecification',
		actionBean: 'PartWorkSpecification',
		actionMethod: 'findAll',
		parentProp: 'work',
		categoryProp: 'work'
	},	
	inheritableStatics: {
		clazzname: 'com.keertech.demo.bean.PartWorkSpecification'
	},
	fields : [
		{name:'indexCls',type:'string'},
		{name:'createDate',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'valueName',type:'string'},
		{name:'id',type:'auto'},
		{name:'work',configMap:{privilegeMap:null,coverImg:null,hotCount:null,orderCount:null,description:null,modifyFlag:null,workName:null,indexCls:null,version:null,clazzname:null,id:null,createDate:null},defaultValue:null},
		{name:'modifyFlag',type:'string'},
		{name:'privilegeMap'},
		{name:'version',type:'int'},
		{name:'labelName',type:'string'},
		{name:'clazzname',type:'string'}
	],
	//◎【是否可以增加明细】
	canAddDetail: function(field){
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
	//◎【数据加载完成后执行】
	onLoadComplete: function(operations){
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