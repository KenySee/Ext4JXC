Ext.define('Keer.store.PartReserve.Model',{
	extend: 'Keer.widget.model.Model',
	config: {
		actionUrl: 'PartReserve',
		actionBean: '',
		actionMethod: 'findAll',
		parentProp: 'parent',
		categoryProp: 'parent'
	},	
	inheritableStatics: {
		clazzname: 'com.keertech.demo.bean.PartReserve'
	},
	fields : [
		{name:'privilegeMap'},
		{name:'remark',type:'string'},
		{name:'createdTime',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'version',type:'int'},
		{name:'userMobile',type:'string'},
		{name:'name',type:'string'},
		{name:'createDate',type:'date',dateFormat:'Y-m-d H:i:s'},
		{name:'id',type:'auto'},
		{name:'modifyFlag',type:'string'},
		{name:'code',type:'string'},
		{name:'userName',type:'string'},
		{name:'clazzname',type:'string'},
		{name:'status',type:'auto'},
		{name:'sortno',type:'string'},
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