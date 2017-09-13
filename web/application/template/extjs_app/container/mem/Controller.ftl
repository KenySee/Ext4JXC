Ext.define('Keer.ui.${upfolder}.${appfolder}.container.mem.Controller',{
	extend: 'Keer.app.controller.edit.EditGridMemory',
	requires: [
		'Keer.ui.${upfolder}.${appfolder}.selwin.Application',
		'Keer.ui.${upfolder}.${appfolder}.window.edit.Application'
	],
	mixins: {
	},
	config: {
		addWinApp: '${aliasPrefix}-${appfolder}-selwin-grid-application',
		editWinApp: '${aliasPrefix}-${appfolder}-window-edit-application',
		gridTitle: '${name}',
		parentModelProp: '${categoryField}'	////※【上级Model属性名,子类可以覆盖】
	},
	inject: {
		context: '${appfolder?cap_first}Context'
	},
	control: {
	},
	observe: {
	},
	//◎【应用实例注入时执行 ,子类可以实现】
  	onApplicationInject: function(){
  		this.callParent(arguments);
  	},
  	
  	//◎【上下文注入时执行 ,子类可以实现】
  	onContextInject: function(context){
  		this.callParent(arguments);
  	},
	
	//◎【新增窗体创建之前执行,子类可以覆盖】
	onAddWinAppCreateBefore: function(appParams,viewParams,component){
		this.callParent(arguments);
		Ext.apply(viewParams,{
			gridType: 'check'
		});
		Ext.apply(appParams,{
			selMode:{
				selKey: 'id',
				addKey: 'id'
			}
		});			
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