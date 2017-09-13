Ext.define('Keer.ui.selwin.EntityModel.FindWindow',{
	extend: 'Keer.widget.core.FindWindow',
	alias: 'widget.ui-selwin-EntityModel-findwindow',
	controller: 'Keer.ui.selwin.EntityModel.FindController',
	requires:[
		'Keer.store.EntityModel.Store',
		'Keer.store.EntityModel.StoreTree',
		'Keer.store.EntityModel.StoreTreeCheck',
		'Keer.ui.selwin.EntityModel.FindController'
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
		navTitle: '实体模型',		
		
		//【navPanel别名 】
		navAlias: 'widget-view-tree',			
		
		//【gridPanel别名 】
		gridAlias: 'widget-view-gridview',			
		
		//【树型Store 子类必须指定 】
		navStore: 'EntityModel-storetree',	
		
		//【列表Store子类必须指定 】
		gridStore: 'EntityModel-store',		
		
		//【Grid列定义 子类必须指定 】
		gridColumns:[],							
		
		//【窗口标题 】
		winTitle: '选择实体模型',	        		
		
		//【窗口宽度增量 】
		addWidth: 0,							
		
		//【窗口高度增量  】
		addHeight: 0							
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:[
				{fieldLabel:'模型简写',name:'appfolder',itemId:'appfolder',dataIndex:'appfolder',labelWidth:60,xtype:'textfield'},
				{fieldLabel:'所在目录',name:'upfolder',itemId:'upfolder',dataIndex:'upfolder',labelWidth:60,xtype:'textfield'}
			],
			gridColumns:[								
				{text:'图标',itemId:'indexCls',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'}
				,{text:'模型简写',dataIndex:'appfolder',width:100}
				,{text:'模型名称',dataIndex:'name',width:100}
			]}
		);
		this.callParent(arguments);
	}
});