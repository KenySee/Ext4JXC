Ext.define('Keer.ui.core.Organization.ChildContainer',{
	extend: 'Keer.widget.view.Container',
	alias: 'widget.ui-core-Organization-childcontainer',
	controller: 'Keer.ui.core.Organization.ChildController',
	requires:[
		'Keer.ui.core.Organization.ChildController'
	],
	//【混入功能】
	mixins: {
	},
	config:{
		canMulti: false,
		innerEdit: false,
		dragDrop: false,
		appParams:{}
	},
	initConfig: function (config) {
		Ext.apply(config,{
			gridStore: config.store
		});
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			gridColumns:[
				{text:'No.',xtype: 'rownumberer',width:32},
				{text:'机构名称',dataIndex:'name',width:160,editor:{xtype:'textfield'}},
				{text:'机构角色',dataIndex:'role',width:120,renderer:this.enumRender(null,'name')}	
			],
			pagingtoolbar : null
		});
		var gridView = {
			xtype: 'widget-view-gridview',
			itemId: 'gridView',
			region: 'center',
			innerEdit: this.innerEdit,
			dragDrop: this.dragDrop,
			canMulti: this.canMulti,
			tbar: this.queryToolbar,
			bbar: this.pagingtoolbar,
			store: this.gridStore,
			columns: this.gridColumns
		};
		var mainPanel = {
			layout: 'fit',
			region: 'center',
			itemId: 'mainPanel',
			region: 'center',
			border: 1,
			margin : '-1 -1 -1 -1',
			items:[gridView]
		};
		var viewConfig = {
			layout: 'fit',
			items:[mainPanel]
		};
		this.doViewInitComponent(viewConfig);
		this.callParent(arguments);
	}
});