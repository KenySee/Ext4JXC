Ext.define('Keer.widget.view.Grid',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.widget-view-grid',
	columnOverWriter: false,
	columnLines: true,
	config:{
		finalConfig:{}
	},
	mixins : {
		EnumRender: 'Keer.widget.mixin.EnumRender',
		TriggerValue: 'Keer.widget.mixin.TriggerValue'
	},
	initComponent: function(){
		Ext.apply(this,this.getFinalConfig());
		this.callParent(arguments);
	}
});