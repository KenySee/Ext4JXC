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
		{name:'articles',configMap:{privilegeMap:null,artist:{privilegeMap:null,signature:null,headUrl:null,description:null,modifyFlag:null,indexCls:null,version:null,clazzname:null,coverImage:null,nickname:null,id:null,createDate:null},description:null,modifyFlag:null,title:null,readCount:null,indexCls:null,version:null,clazzname:null,articleType:null,coverImage:null,id:null,createDate:null},defaultValue:[]},
		{name:'createDate',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'modifyFlag',type:'string'},
		{name:'nickname',type:'string'},
		{name:'artistType',configMap:{privilegeMap:null,code:null,remark:null,modifyFlag:null,type:null,indexCls:null,version:null,clazzname:null,sortno:null,name:null,createdTime:null,id:null,status:null,createDate:null},defaultValue:null},
		{name:'clazzname',type:'string'},
		{name:'signature',type:'string'},
		{name:'privilegeMap'},
		{name:'storys',configMap:{privilegeMap:null,artist:{privilegeMap:null,signature:null,headUrl:null,description:null,modifyFlag:null,indexCls:null,version:null,clazzname:null,coverImage:null,nickname:null,id:null,createDate:null},description:null,modifyFlag:null,title:null,readCount:null,indexCls:null,version:null,clazzname:null,articleType:null,coverImage:null,id:null,createDate:null},defaultValue:[]},
		{name:'works',configMap:{privilegeMap:null,coverImg:null,artist:{privilegeMap:null,signature:null,headUrl:null,description:null,modifyFlag:null,indexCls:null,version:null,clazzname:null,coverImage:null,nickname:null,id:null,createDate:null},hotCount:null,orderCount:null,description:null,modifyFlag:null,workName:null,indexCls:null,version:null,clazzname:null,id:null,createDate:null},defaultValue:[]},
		{name:'description',type:'string'},
		{name:'version',type:'int'},
		{name:'headUrl',type:'string'},
		{name:'id',type:'auto'},
		{name:'indexCls',type:'string'},
		{name:'coverImage',type:'string'}
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