Ext.define('Keer.widget.view.Tab',{
	extend: 'Ext.tab.Panel',
	alias: 'widget.widget-view-tab',
	requires: [
		'Ext.ux.TabReorderer',
		'Ext.ux.TabScrollerMenu',
		'Keer.widget.ux.TabCloseMenu'
	],
	actions:[],
	initComponent: function(){
		Ext.apply(this,{
			margins: '0 0 0 0',
			activeTab : 0,
			defaults : {
				closable : true
			},
			plugins: [
				Ext.create('Keer.widget.ux.TabCloseMenu'),
				Ext.create('Ext.ux.TabReorderer'),			
				Ext.create('Ext.ux.TabScrollerMenu',{
				       maxText: 15,
				       pageSize: 5
		        })
    		],
			region: 'center',
			minTabWidth: 90			
		});
		this.callParent(arguments);
	}
});