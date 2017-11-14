Ext.define('Keer.store.PartArticleContent.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'PartArticleContent',
		actionBean: 'PartArticleContent',
		actionMethod: 'findAll',
		parentProp: 'article',
		categoryProp: 'article'
	},	
	inheritableStatics: {
		clazzname: 'com.keertech.demo.bean.PartArticleContent'
	},
	fields : [
		{name:'clazzname',type:'string'},
		{name:'modifyFlag',type:'string'},
		{name:'contentIndex',type:'int'},
		{name:'contentType',type:'auto'},
		{name:'createDate',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'id',type:'auto'},
		{name:'article',configMap:{privilegeMap:null,description:null,modifyFlag:null,title:null,readCount:null,indexCls:null,version:null,clazzname:null,articleType:null,coverImage:null,id:null,createDate:null},defaultValue:null},
		{name:'version',type:'int'},
		{name:'contentValue',type:'auto'},
		{name:'privilegeMap'},
		{name:'indexCls',type:'string'}
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