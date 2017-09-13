Ext.define('Keer.ui.selwin.ModelDetail.FindWindow',{
	extend: 'Keer.widget.core.FindWindow',
	alias: 'widget.ui-selwin-ModelDetail-findwindow',
	controller: 'Keer.ui.selwin.ModelDetail.FindController',
	requires:[
		'Keer.store.ModelDetail.Store',
		'Keer.store.ModelDetail.StoreTree',
		'Keer.store.ModelDetail.StoreTreeCheck',
		'Keer.ui.selwin.ModelDetail.FindController'
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
		navTitle: '界面模型明细',		
		
		//【navPanel别名 】
		navAlias: 'widget-view-tree',			
		
		//【gridPanel别名 】
		gridAlias: 'widget-view-gridview',			
		
		//【树型Store 子类必须指定 】
		navStore: 'ModelDetail-storetree',	
		
		//【列表Store子类必须指定 】
		gridStore: 'ModelDetail-store',		
		
		//【Grid列定义 子类必须指定 】
		gridColumns:[],							
		
		//【窗口标题 】
		winTitle: '选择界面模型明细',	        		
		
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
				{text:'图标',itemId:'indexCls',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'}
				,{text:'中文标题',dataIndex:'text',width:140}
				,{text:'映射名称',dataIndex:'dataIndex',width:120}
			]}
		);
		this.callParent(arguments);
	}
});