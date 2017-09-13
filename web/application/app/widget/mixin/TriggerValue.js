Ext.define('Keer.widget.mixin.TriggerValue',{
	triggerValue: function(field,data){
		if (this.getSelectionModel){
			var selModel = this.getSelectionModel();
			if (selModel){
				var selected = selModel.getSelection();
				if (selected && selected.length > 0){
					var record = selected[0];
					record.set(field,data);
				}
			}
		}
	}
});