Ext.define('Keer.ui.selwin.MenuActionDesc.FindWindow',{
	extend: 'Keer.widget.core.FindWindow',
	alias: 'widget.ui-selwin-MenuActionDesc-findwindow',
	controller: 'Keer.ui.selwin.MenuActionDesc.FindController',
	requires:[
		'Keer.store.MenuActionDesc.Store',
		'Keer.store.MenuResource.StoreTree',
		'Keer.store.MenuResource.StoreTreeCheck',
		'Keer.ui.selwin.MenuActionDesc.FindController'
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
		navTitle: '菜单资源',		
		
		//【navPanel别名 】
		navAlias: 'widget-view-tree',			
		
		//【gridPanel别名 】
		gridAlias: 'widget-view-gridview',			
		
		//【树型Store 子类必须指定 】
		navStore: 'MenuResource-storetree',	
		
		//【列表Store子类必须指定 】
		gridStore: 'MenuActionDesc-store',		
		
		//【Grid列定义 子类必须指定 】
		gridColumns:[],							
		
		//【窗口标题 】
		winTitle: '选择菜单动作',	        		
		
		//【窗口宽度增量 】
		addWidth: 0,							
		
		//【窗口高度增量  】
		addHeight: 0							
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:[
				{itemId:'actionType',name:'actionType',fieldLabel:'动作类型',labelWidth:60,dataIndex:'actionType',xtype:'textfield'}
			],
			gridColumns:[								
				{text:'图标',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'},
				{text:'动作类型',dataIndex:'actionType',width:140,editor:{xtype:'textfield'}},
				{text:'动作描述',dataIndex:'actionDesc',width:200,editor:{xtype:'textfield'}}
			]}
		);
		this.callParent(arguments);
	}
});