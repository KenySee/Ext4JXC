Ext.define('Keer.ui.selwin.Widget.FindController',{
	extend: 'Keer.widget.core.FindController',
	//【监听View事件】
	control: {
	},
	//【监听Store事件】
	observe: {
	},
	//【成员变量】
	config: {
		//【NavModel属性标题】
		navModleTitle: 'name',		
		
		//【Grid标题】
		gridTitle: '部件'		
	},
	
	//◎【执行创建记录动作】
  	doAddRecord: function(store,model){
		this.callParent(arguments);
	},
  		
	//◎【Store加载前执行 】
  	onBeforeLoad: function(store,params){
  		this.callParent(arguments);
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