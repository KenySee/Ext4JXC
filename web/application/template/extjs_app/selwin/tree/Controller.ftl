Ext.define('Keer.ui.${upfolder}.${appfolder}.selwin.tree.Controller',{
	extend: 'Keer.app.selwin.tree.Controller',
  	onBeforeLoad: function(store,params){
  		this.callParent(arguments);
  	},
	onViewBoxReady: function(){
		this.callParent(arguments);
	}
});