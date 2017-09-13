Ext.define('Keer.ui.selwin.Organization.FindController',{
	extend: 'Keer.widget.core.FindController',
	//【监听View事件】
	control: {
	},
	//【监听Store事件】
	observe: {
	},
	//【成员变量】
	config: {
		//【Grid标题】
		gridTitle: '组织机构'		
	},
	
	//◎【Store加载前执行 】
  	onBeforeLoad: function(store,params){
  		this.callParent(arguments);
  		
  		//点击树形菜单,右侧grid刷新
  		var model = this.getNavModel();
  		if(model){
  			Ext.apply(params,{
				parent: model.get('id')
			});
  		}
  	},
  	
  	//◎【导航部件选择事件】
  	onNavItemSelection: function(component/*在哪个控件上选中*/,record/*选中Model*/){
  		this.callParent(arguments);
  	},
  	
  	//◎【编辑部件选择事件】
  	onGridItemSelection: function(component/*在哪个控件上选中*/,record/*选中Model*/){
  		this.callParent(arguments);
  	},
  	
  	//◎【控制器部件创建事件】
  	onCreateWidget: function(){
  		this.callParent(arguments);
  	},
  	
  	//◎【初始化命令工具栏】
	onInitToolBar: function(toolbar){
		this.callParent(arguments);
	},
	
	//◎【重置命令工具栏 】
  	onResetToolBar: function(toolbar){
  		this.callParent(arguments);
  	},
  	
  	//◎【视图boxready事件监听】
	onViewBoxReady: function(){
		this.callParent(arguments);
	}
});