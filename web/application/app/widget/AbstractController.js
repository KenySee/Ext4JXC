Ext.define('Keer.widget.AbstractController',{
	extend: 'Deft.mvc.ViewController',
	/**
		appParams: 应用初始化参数结构如下
		{
			xwindow: 窗口视图别名,
			xcontainer: 窗口视图别名, 
			store:     当前编辑的Store, 	
			record:    当前编辑的Model,
			addStore:  查找载回使用Store,
			addRecord:  查找载回使用Model,
			autosync:   编辑窗口是否自动保存同步
			autoclose:  编辑窗口保存后是否自动关闭
			component: 调用者组件,
			parent: 目前仅用在EditController在构造子ChildContainer时转入的Model,用于实现一对多关系,
			childs：目前仅用在EditWindow在构造子ChildContainer时转入的集合属性名,用于实现一对多关系,
			editor: 目前仅用在EditController在构造子ChildContainer时转入的集合隐藏域控件实例,
			menudata: 权限数据(包含权限信息),
			{
				menu: 当前菜单Model
				actions: 当前菜单的动作
			},
			initParam: 控制器初始化参数
			callController: 调用者控制器
			frameController: 框架控制器
			callFunc: 被调用的控制器在onViewBoxReady事件中会执行此回调函数 形式如下: function(controller) { 业务实现代码 };  
			selMode:{
				selKey: 查找的Model搜索字段名
				addKey: 添加的Model搜索字段名
				addRef: 是否按外键引用的方式添加
				addName: 外键引用添加的实体中文标题属性名
				callFunc: 查找再回窗口将执行的回调函数,无返回值，形式如下: function(records) { 业务实现代码 }
				callDefaultValueFun: 设置默认值回调函数,形如如下: function(model,record){ 业务实现代码 }
				callScope: 回调函数作用域
			},
			constParam: 调用者转入的常量参数,形式如下：{id: 20,name: 'xxx'},
			callParam: 调用者转入的回调函数,形式如下: 
						function(params) { 
							var model = this.getNavModel();
							if (model){ 
								Ext.apply(params,{
									node: model.get('id')
								});
							}  
						}
		},
		viewParams: 视图初始化参数结构如下
		{
			canMulti: false,	【是否允许多选】									
			dragDrop: false, 	【是否拖动排序】
			navStoreConfig: {},【treeStore配置参数】
			gridStoreConfig: {},【gridStore配置参数】
			formFields: [],		【表单初始字段数组】
			addFields: [],		【表单附加字段数组】
			gridColumns:[],		【Grid列定数组】
			addColumns:[]		【Grid附加列数组】
		}
	**/	 	
 	deepApplyIf: function(target,original){
  		Ext.applyIf(target,original);
  		for(var key in original){
			if(Ext.isObject(original[key])){
	  			this.deepApplyIf(target[key],original[key]);
	  		}
  		}
  	},
  	/**
  	@private 合并控制器配置
  	*/
  	inMergerControl: function(target){
  		if (target && this.control){
			if (target.control){
				this.deepApplyIf(target.control,this.control);
			}
			else {
				target.control = this.control;
			}
		}
  	},
  	/**
  	@private 合并监听器配置
  	*/
  	inMergerObserve: function(target){
  		if (target && this.observe){
			if (target.observe){
				this.deepApplyIf(target.observe,this.observe);
			}
			else {
				target.observe = this.observe;
			}
		}
  	}	
});