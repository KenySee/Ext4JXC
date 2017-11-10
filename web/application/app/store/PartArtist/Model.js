Ext.define('Keer.store.PartArtist.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'PartArtist',
		actionBean: '',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},	
	inheritableStatics: {
		clazzname: 'com.keertech.demo.bean.PartArtist'
	},
	fields : [
		{name:'privilegeMap'},
		{name:'nickname',type:'string'},
		{name:'articles',configMap:{privilegeMap:null,artist:{privilegeMap:null,signature:null,headUrl:null,description:null,modifyFlag:null,indexCls:null,version:null,clazzname:null,nickname:null,id:null,createDate:null},description:null,modifyFlag:null,title:null,indexCls:null,version:null,clazzname:null,coverImage:null,id:null,createDate:null},defaultValue:[]},
		{name:'headUrl',type:'string'},
		{name:'createDate',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'clazzname',type:'string'},
		{name:'indexCls',type:'string'},
		{name:'works',configMap:{privilegeMap:null,coverImg:null,artist:{privilegeMap:null,signature:null,headUrl:null,description:null,modifyFlag:null,indexCls:null,version:null,clazzname:null,nickname:null,id:null,createDate:null},hotCount:null,modifyFlag:null,workName:null,indexCls:null,version:null,clazzname:null,id:null,createDate:null},defaultValue:[]},
		{name:'description',type:'string'},
		{name:'id',type:'auto'},
		{name:'signature',type:'string'},
		{name:'modifyFlag',type:'string'},
		{name:'version',type:'int'}
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