Ext.define('Keer.ui.core.Frame.Viewport',{
	extend: 'Ext.container.Viewport',
	requires:['Keer.ui.core.Frame.Container'],
	initComponent: function(){
		var headContent = {
			xtype:'panel', 
            region:'north',
            border: false,
            header:false,
            collapsed : true,
            collapsible : true,
            placeholder : {
				xtype : 'box'
			},
//			split : true,
            layout:'anchor',
            items: [{
			    xtype:'container',
			    border:false,
			    height:80,
			    contentEl:'top-minimenu',
			    region:'center',
			    anchor: 'none-25'
	        }]
		};
		Ext.apply(this, {
        	layout: 'border',
            items:[headContent,{xtype:'ui-core-frame-container',title:'导航菜单'}]
        });
		this.callParent(arguments);
	}
});