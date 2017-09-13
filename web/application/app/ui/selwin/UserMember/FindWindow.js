Ext.define('Keer.ui.selwin.UserMember.FindWindow',{
	extend: 'Keer.widget.core.FindWindow',
	alias: 'widget.ui-selwin-UserMember-findwindow',
	controller: 'Keer.ui.selwin.UserMember.FindController',
	requires:[
		'Keer.store.Organization.Store',
		'Keer.store.Organization.StoreTree',
		'Keer.store.Organization.StoreTreeCheck',
		'Keer.ui.selwin.UserMember.FindController'
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
		navTitle: '组织机构',		
		
		//【navPanel别名 】
		navAlias: 'widget-view-tree',			
		
		//【gridPanel别名 】
		gridAlias: 'widget-view-gridview',			
		
		//【树型Store 子类必须指定 】
		navStore: 'Organization-storetree',	
		
		//【列表Store子类必须指定 】
		gridStore: 'Organization-store',		
		
		//【Grid列定义 子类必须指定 】
		gridColumns:[],							
		
		//【窗口标题 】
		winTitle: '选择组织机构',	        		
		
		//【窗口宽度增量 】
		addWidth: 0,							
		
		//【窗口高度增量  】
		addHeight: 0							
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:[
				{itemId:'code',name:'code',fieldLabel:'机构编号',labelWidth:60,dataIndex:'code',xtype:'textfield'},
				{itemId:'name',name:'name',fieldLabel:'机构名称',labelWidth:60,dataIndex:'name',xtype:'textfield'}
			],
			gridColumns:[								
				{text:'图标',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'},
				{text:'机构编号',dataIndex:'code',width:120},
				{text:'机构名称',dataIndex:'name',width:160},
				{text:'所属公司',dataIndex:'corporation',width:120,renderer:this.enumRender(null,'name')},
				{text:'所属部门',dataIndex:'department',width:120,renderer:this.enumRender(null,'name')}
			]}
		);
		this.callParent(arguments);
	}
});