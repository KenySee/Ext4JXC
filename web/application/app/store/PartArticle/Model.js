Ext.define('Keer.store.PartArticle.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'PartArticle',
		actionBean: '',
		actionMethod: 'findAll',
		parentProp: 'artist',
		categoryProp: 'artist'
	},	
	inheritableStatics: {
		clazzname: 'com.keertech.demo.bean.PartArticle'
	},
	fields : [
		{name:'coverImage',type:'string'},
		{name:'modifyFlag',type:'string'},
		{name:'id',type:'auto'},
		{name:'privilegeMap'},
		{name:'artist',configMap:{privilegeMap:null,signature:null,headUrl:null,description:null,modifyFlag:null,indexCls:null,version:null,clazzname:null,coverImage:null,nickname:null,id:null,createDate:null},defaultValue:null},
		{name:'clazzname',type:'string'},
		{name:'readCount',type:'int'},
		{name:'description',type:'string'},
		{name:'indexCls',type:'string'},
		{name:'articleType',type:'auto'},
		{name:'title',type:'string'},
		{name:'version',type:'int'},
		{name:'createDate',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'contents',configMap:{privilegeMap:null,contentIndex:null,modifyFlag:null,indexCls:null,version:null,article:{privilegeMap:null,description:null,modifyFlag:null,title:null,readCount:null,indexCls:null,version:null,clazzname:null,articleType:null,coverImage:null,id:null,createDate:null},clazzname:null,contentValue:null,id:null,contentType:null,createDate:null},defaultValue:[]}
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