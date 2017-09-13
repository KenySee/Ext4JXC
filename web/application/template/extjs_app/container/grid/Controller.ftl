Ext.define('Keer.ui.${upfolder}.${appfolder}.container.grid.Controller',{
	extend: 'Keer.app.controller.edit.EditGrid',
	requires: [
		'Keer.ui.${upfolder}.${appfolder}.window.edit.Application'
	],
	mixins: {
	},
	inject: {
		context: '${appfolder?cap_first}Context'
	},
	config: {
		editWinApp: '${aliasPrefix}-${appfolder}-window-edit-application',
		addWinApp: '${aliasPrefix}-${appfolder}-window-edit-application',
		gridTitle: '${name}',
		saveRefresh:false,	//保存成功后是否刷新父控制器
		parentModelPropName: 'name',		    	//【上级Model中文名称,子类可以覆盖】
		parentModelProp: '${categoryField}',	//【上级Model属性名,子类可以覆盖】
		navModleTitle: 'name',	    //【导航Model中文标题,子类可以覆盖】
		navModelProp: '${categoryField}',
		navModelPropName: 'name',	//【导航Model中文名称,子类可以覆盖】
		popupNew: true,			//【是否允许弹出新增,子类可以覆盖】
		inlineEdit: false,		//【是否允许行内编辑,子类可以覆盖】
		allowNavList: true,		//【是否允许导航,子类可以覆盖】
		allowDbClick: true,		//【是否允许双击,子类可以覆盖】
		colEdit: 1,		   		//【新增记录时默认第几列获得焦点,子类可以覆盖】
		repeatLoad: true 		//【是否允许重复加载】
	},
	control: {
	},
	observe: {
	},
	//◎【下拉框Store加载时执行,子类可以覆盖】
  	onComboBeforeLoad: function(component,store,params){
		
	},
	//◎【获取当前选择的模型,子类可以实现】
	doSelectModel: function(model){
  		return model;
  	},
    //◎【能否新增记录 ,子类可以实现】
  	canAddDetail: function(parent){
		return this.callParent(arguments);
	},
	//◎【能否编辑记录 ,子类可以实现】
	canEdit: function(model,field){
		return this.callParent(arguments);
	},	
  	onBeforeSyncStore: function(){
  		return true;
  	},
	//◎【再添加组件之前执行 ,子类可以实现】
  	onBeforeAddViewComponent: function(container/*在哪个容器上添加*/,config/*配置对象*/){
  		this.callParent(arguments);
  	},
  	//◎【执行记录添加动作 ,子类可以覆盖】
  	doAddRecord: function(){
  		this.callParent(arguments);
  	},
  	//◎【能否新增记录 ,子类可以实现】
  	canAddDetail: function(parent){
		return this.callParent(arguments);
	},
	//※【获取模型对应的后台Action名 ,子类可以覆盖】
	doActionURL: function(model){
  		return model.getActionUrl();
  	},
  	
	//※【返回编辑窗体应用别名 ,子类可以覆盖】
	getEditWinApplication: function(record){
		return this.getEditWinApp();
	},
	
	//※【返回新增窗体应用类名 ,子类可以覆盖】
	getAddWinApplication: function(record){
		return this.getAddWinApp();
	},
	
	//◎【应用实例注入时执行 ,子类可以实现】
  	onApplicationInject: function(){
  		this.callParent(arguments);
  	},
  	
  	//◎【上下文注入时执行 ,子类可以实现】
  	onContextInject: function(context){
  		this.callParent(arguments);
  	},
  	
	//◎【树Store加载前执行 ,子类可以实现】
	onNavBeforeLoad: function(store,params) {
		this.callParent(arguments);
	},
	
	//◎【编辑窗体创建之前执行,子类可以覆盖】
	onEditWinAppCreateBefore: function(appParams,viewParams,component){
		this.callParent(arguments);
	},
	
	//◎【新增窗体创建之前执行,子类可以覆盖】
	onAddWinAppCreateBefore: function(appParams,viewParams,component){
		this.callParent(arguments);
	},
	
	//◎【查找再回窗体创建之前执行,子类可以覆盖】
	onSelWinAppCreateBefore: function(component,appParams,viewParams){
		this.callParent(arguments);
	},

	//◎【打开应用窗体,子类可以覆盖】
	doRenderApplication: function(application){
		this.callParent(arguments);
	},
	
	//◎【控制器创建时执行,此方法可以完成动态视图创建以及 选择器的定位】
	onCreateWidget: function(){
  		this.callParent(arguments);
  	},
  	
  	//◎【所有动态视图创建完成后执行,此方法可以进行视图初始化工作,例如根据权限来隐藏或显示指定控件】
  	onCreateComplete: function(){
  		this.callParent(arguments);
  	},

  	//◎【Model选中时执行 ,子类可以实现】
  	onItemSelection: function(component/*在哪个控件上选中*/,record/*选中Model*/){
  		this.callParent(arguments);
  	},
  	
  	//◎【Model创建时执行 ,子类可以实现】
  	onCreateRecord: function(component/*在哪个控件上创建*/,record/*创建Model*/){
  		this.callParent(arguments);
  	},
  	
  	//◎【列表Store加载前执行 ,子类可以实现此方法实现自定义参数添加】
  	onBeforeLoad: function(store,params){
  		this.callParent(arguments);
  	},
  	
  	//◎【视图boxready事件监听方法】
	onViewBoxReady: function(){
		this.callParent(arguments);
	},
	
	//◎【初始化命令工具栏视图 ,子类可以实现】
	onInitToolBar: function(toolbar){
		this.callParent(arguments);
	},
	
	//◎【重置命令工具栏视图 ,子类可以实现】
  	onResetToolBar: function(toolbar){
  		this.callParent(arguments);
  	}		
});