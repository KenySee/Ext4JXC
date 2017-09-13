Ext.define('Keer.ui.${upfolder}.${appfolder}.selwin.list.Controller',{
	extend: 'Keer.app.selwin.list.Controller',
  	onBeforeLoad: function(store,params){
  		this.callParent(arguments);
  	},
	onViewBoxReady: function(){
		this.callParent(arguments);
	}
});