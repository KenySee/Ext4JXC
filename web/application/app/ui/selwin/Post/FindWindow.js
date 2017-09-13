Ext.define('Keer.ui.selwin.Post.FindWindow',{
	extend: 'Keer.widget.core.FindWindow',
	alias: 'widget.ui-selwin-Post-findwindow',
	controller: 'Keer.ui.selwin.Post.FindController',
	requires:[
		'Keer.store.Post.Store',
		'Keer.store.Post.StoreTree',
		'Keer.store.Post.StoreTreeCheck',
		'Keer.ui.selwin.Post.FindController'
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
		navTitle: '岗位',		
		
		//【navPanel别名 】
		navAlias: 'widget-view-tree',			
		
		//【gridPanel别名 】
		gridAlias: 'widget-view-gridview',			
		
		//【树型Store 子类必须指定 】
		navStore: 'Post-storetree',	
		
		//【列表Store子类必须指定 】
		gridStore: 'Post-store',		
		
		//【Grid列定义 子类必须指定 】
		gridColumns:[],							
		
		//【窗口标题 】
		winTitle: '选择岗位',	        		
		
		//【窗口宽度增量 】
		addWidth: 0,							
		
		//【窗口高度增量  】
		addHeight: 0							
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:[
				{itemId:'name',name:'name',fieldLabel:'岗位名称',labelWidth:60,dataIndex:'name',xtype:'textfield'}
			],
			gridColumns:[								
				{text:'图标',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'},
				{text:'岗位编号',dataIndex:'code',width:120,editor:{xtype:'textfield'}},
				{text:'岗位名称',dataIndex:'name',width:180,editor:{xtype:'textfield'}},
				{text:'岗位备注',dataIndex:'remark',width:240,editor:{xtype:'textfield'}}
			]}
		);
		this.callParent(arguments);
	}
});