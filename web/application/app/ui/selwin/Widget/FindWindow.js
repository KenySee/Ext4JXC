Ext.define('Keer.ui.selwin.Widget.FindWindow',{
	extend: 'Keer.widget.core.FindWindow',
	alias: 'widget.ui-selwin-Widget-findwindow',
	controller: 'Keer.ui.selwin.Widget.FindController',
	requires:[
		'Keer.store.Widget.Store',
		'Keer.store.Widget.StoreTree',
		'Keer.store.Widget.StoreTreeCheck',
		'Keer.ui.selwin.Widget.FindController'
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
		navTitle: '部件',		
		
		//【navPanel别名 】
		navAlias: 'widget-view-tree',			
		
		//【gridPanel别名 】
		gridAlias: 'widget-view-gridview',			
		
		//【树型Store 子类必须指定 】
		navStore: 'Widget-storetree',	
		
		//【列表Store子类必须指定 】
		gridStore: 'Widget-store',		
		
		//【Grid列定义 子类必须指定 】
		gridColumns:[],							
		
		//【窗口标题 】
		winTitle: '选择部件',	        		
		
		//【窗口宽度增量 】
		addWidth: 0,							
		
		//【窗口高度增量  】
		addHeight: 0							
	},
	initComponent: function(){
		Ext.apply(this,{
			queryToolbar:[
				{fieldLabel:'部件别名',name:'aliasname',itemId:'aliasname',dataIndex:'aliasname',labelWidth:60,xtype:'textfield'},
				{fieldLabel:'部件类名',name:'classname',itemId:'classname',dataIndex:'classname',labelWidth:60,xtype:'textfield'}
			],
			gridColumns:[								
				{text:'图标',itemId:'indexCls',dataIndex:'indexCls',width:40,xtype:'templatecolumn',align:'center',tpl:'<img alt="" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-0  {indexCls}">'}
				,{text:'别名',dataIndex:'aliasname',width:120}
				,{text:'类名',dataIndex:'classname',width:220}
			]}
		);
		this.callParent(arguments);
	}
});