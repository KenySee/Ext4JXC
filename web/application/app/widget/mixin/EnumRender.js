Ext.define('Keer.widget.mixin.EnumRender',{
	enumRender: function(storeid,name,title){
		if (!title){
			title = 'name';
		}
		if (!name){
			name = 'name';
		}
		if (storeid){
			var store;
			if (storeid != null){
				if (Ext.isString(storeid)){
					store = Ext.getStore(storeid);
					if (!store){
						store = Ext.widget(storeid);
					}
				}
				else{
					store = storeid;
				}
			}
			var count = store.getCount();
			if (count == 0){
				store.load({params:{allLoad:true}});
			}
			return function(value) {
				var propWidget = name.split('.');
				for (i = 0,ln = propWidget.length; i < ln; i++) {
					var prop = propWidget[i];
					if (Ext.isObject(value)){
						value = value[prop];
					}
				}
				var record = store.getById(value);
				if (record) {
					return record.get(title);
				} else {
					return value;
				}
			};
		}
		else {
			return function(value){
				var propWidget = name.split('.');
				for (i = 0,ln = propWidget.length; i < ln; i++) {
					var prop = propWidget[i];
					if (Ext.isObject(value)){
						value = value[prop];
					}
				}
				return value;
			};
		}
	}
});