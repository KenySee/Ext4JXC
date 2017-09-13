Ext.define('Keer.ui.${upfolder}.${appfolder}.selwin.Controller',{
	extend: 'Keer.app.selwin.Controller',
  	onBeforeLoad: function(store,params){
  		this.callParent(arguments);
  	},
	onViewBoxReady: function(){
		this.callParent(arguments);
	}
});