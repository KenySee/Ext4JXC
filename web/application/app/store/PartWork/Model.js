Ext.define('Keer.store.PartWork.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'PartWork',
		actionBean: '',
		actionMethod: 'findAll',
		parentProp: 'artist',
		categoryProp: 'artist'
	},	
	inheritableStatics: {
		clazzname: 'com.keertech.demo.bean.PartWork'
	},
	fields : [
		{name:'createDate',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'privilegeMap'},
		{name:'artist',configMap:{privilegeMap:null,signature:null,headUrl:null,description:null,modifyFlag:null,indexCls:null,version:null,clazzname:null,nickname:null,id:null,createDate:null},defaultValue:null},
		{name:'indexCls',type:'string'},
		{name:'description',type:'string'},
		{name:'coverImg',type:'string'},
		{name:'modifyFlag',type:'string'},
		{name:'hotCount',type:'int'},
		{name:'id',type:'auto'},
		{name:'version',type:'int'},
		{name:'specifications',configMap:{privilegeMap:null,valueName:null,work:{privilegeMap:null,coverImg:null,hotCount:null,description:null,modifyFlag:null,workName:null,indexCls:null,version:null,clazzname:null,id:null,createDate:null},modifyFlag:null,indexCls:null,version:null,clazzname:null,id:null,labelName:null,createDate:null},defaultValue:[]},
		{name:'clazzname',type:'string'},
		{name:'workName',type:'string'}
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