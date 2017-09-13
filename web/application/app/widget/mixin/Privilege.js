Ext.define('Keer.widget.mixin.Privilege',{
	requires:[
		'Keer.store.comm.menuActionStore'
	],
	onViewBoxReady: function(){
		var menudata = this.get('menudata');
		var model = menudata.menu;
		var actions = menudata.actions;
		if (!actions){
			var store = Ext.widget('comm-menuActionstore');
			actions = {};
			store.load({
				scope: this,
				params: {menu: model.get('id'),clazzAction: model.get('clazzAction')},
				callback: function(records, operation, success){
					if (success && records.length > 0){
						Ext.each(records,function(record){
							actions[record.get('actionType')] = record.get('id');
						});
						menudata.actions = actions;
						this.doRestButton(actions);
					}
				}
			});
		}
		else {
			var view = this.getView();
			var me = this;
			this.doAddListener(view,'boxready',function(){
				me.doRestButton(actions);
			});	
		}
	},
	doRestButton: function(actions){
		var view = this.getView();
		var buttons = view.query('button');
		if (actions){
			Ext.each(buttons,function(button){
				if (button.privilege){
					if (actions.hasOwnProperty(button.privilege)){
						button.setVisible(true);
					}
					else {
						button.setVisible(false);
					}
				}
			});
		};
	}
});