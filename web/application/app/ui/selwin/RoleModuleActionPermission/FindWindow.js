Ext.define('Keer.ui.selwin.RoleModuleActionPermission.FindWindow',{
	extend: 'Keer.widget.core.FindWindow',
	alias: 'widget.ui-selwin-RoleModuleActionPermission-findwindow',
	controller: 'Keer.ui.selwin.RoleModuleActionPermission.FindController',
	requires:[
		'Keer.widget.field.EnumCombo',
		'Keer.store.comm.clazzScopeStore',
		'Keer.store.RoleModuleActionPermission.Store',
		'Keer.store.MenuResource.StoreTree',
		'Keer.store.MenuResource.StoreTreeCheck',
		'Keer.ui.selwin.RoleModuleActionPermission.FindController'
	],	
	config: {
		//【查询toolbar 】
		queryToolbar: [],						
		
		//【命令toolbar 】
		comandToolbar: [],						
		
		//【窗口显示方式('nav','treenav','grid','gridnav','listnav') 】
		showType: 'treenav',					
		
		//【是否允许多选 】
		canMulti: false,						
		
		//【navPanel标题 】
		navTitle: '菜单',		
		
		//【navPanel别名 】
		navAlias: 'widget-view-tree',			
		
		//【gridPanel别名 】
		gridAlias: 'widget-view-gridview',			
		
		//【树型Store 子类必须指定 】
		navStore: 'MenuResource-storetree',	
		
		//【列表Store子类必须指定 】
		gridStore: 'RoleModuleActionPermission-store',		
		
		//【Grid列定义 子类必须指定 】
		gridColumns:[],							
		
		//【窗口标题 】
		winTitle: '选择角色动作',	        		
		
		//【窗口宽度增量 】
		addWidth: 0,							
		
		//【窗口高度增量  】
		addHeight: 0							
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:[
			],
			gridColumns:[								
				{text:'图标',idataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'},
				{text:'菜单动作',dataIndex:'action',width:160,renderer:this.enumRender(null,'name')},
				{text:'访问范围',dataIndex:'clazzScope',width:180,editor:{xtype:'widget-field-enumcombo',store:'comm-clazzScopestore',displayField:'name',dataIndex:'clazzScope'},renderer:this.enumRender('comm-clazzScopestore')}
			]}
		);
		this.callParent(arguments);
	}
});