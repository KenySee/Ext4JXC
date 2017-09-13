Ext.define('Keer.ui.selwin.Role.FindWindow',{
	extend: 'Keer.widget.core.FindWindow',
	alias: 'widget.ui-selwin-Role-findwindow',
	controller: 'Keer.ui.selwin.Role.FindController',
	requires:[
		'Keer.store.Role.Store',
		'Keer.store.Role.StoreTree',
		'Keer.store.Role.StoreTreeCheck',
		'Keer.ui.selwin.Role.FindController'
	],	
	config: {
		//【查询toolbar 】
		queryToolbar: [],						
		
		//【命令toolbar 】
		comandToolbar: [],						
		
		//【窗口显示方式('nav','treenav','grid','gridnav','listnav') 】
		showType: 'grid',					
		
		//【是否允许多选 】
		canMulti: false,						
		
		//【navPanel标题 】
		navTitle: '角色',		
		
		//【navPanel别名 】
		navAlias: 'widget-view-tree',			
		
		//【gridPanel别名 】
		gridAlias: 'widget-view-gridview',			
		
		//【树型Store 子类必须指定 】
		navStore: 'Role-storetree',	
		
		//【列表Store子类必须指定 】
		gridStore: 'Role-store',		
		
		//【Grid列定义 子类必须指定 】
		gridColumns:[],							
		
		//【窗口标题 】
		winTitle: '选择角色',	        		
		
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
				{text:'图标',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'},
				{text:'角色名称',dataIndex:'name',width:120,editor:{xtype:'textfield'}},
				{text:'角色描述',dataIndex:'remark',width:160,editor:{xtype:'textfield'}}				
			]}
		);
		this.callParent(arguments);
	}
});