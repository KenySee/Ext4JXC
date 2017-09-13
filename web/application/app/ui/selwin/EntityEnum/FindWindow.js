Ext.define('Keer.ui.selwin.EntityEnum.FindWindow',{
	extend: 'Keer.widget.core.FindWindow',
	alias: 'widget.ui-selwin-EntityEnum-findwindow',
	controller: 'Keer.ui.selwin.EntityEnum.FindController',
	requires:[
		'Keer.store.EntityEnum.Store',
		'Keer.store.EntityEnum.StoreTree',
		'Keer.store.EntityEnum.StoreTreeCheck',
		'Keer.ui.selwin.EntityEnum.FindController'
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
		navTitle: '枚举类型',		
		
		//【navPanel别名 】
		navAlias: 'widget-view-tree',			
		
		//【gridPanel别名 】
		gridAlias: 'widget-view-gridview',			
		
		//【树型Store 子类必须指定 】
		navStore: 'EntityEnum-storetree',	
		
		//【列表Store子类必须指定 】
		gridStore: 'EntityEnum-store',		
		
		//【Grid列定义 子类必须指定 】
		gridColumns:[],							
		
		//【窗口标题 】
		winTitle: '选择枚举类型',	        		
		
		//【窗口宽度增量 】
		addWidth: 0,							
		
		//【窗口高度增量  】
		addHeight: 0							
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:[
				{fieldLabel:'编号',name:'code',itemId:'code',dataIndex:'code',labelWidth:60,xtype:'textfield'},
				{fieldLabel:'名称',name:'name',itemId:'name',dataIndex:'name',labelWidth:60,xtype:'textfield'}
			],
			gridColumns:[								
				{text:'图标',itemId:'indexCls',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'}
				,{text:'编号',dataIndex:'code',width:120}
				,{text:'名称',dataIndex:'name',width:220}
			]}
		);
		this.callParent(arguments);
	}
});