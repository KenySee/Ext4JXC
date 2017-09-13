Ext.define('Keer.widget.field.ObjectTrigger',{
	extend: 'Ext.form.field.Trigger',
	alias: 'widget.widget-field-objecttrigger',
	displayField: 'name',
	record: null,
	config: {
		controller: null,
		outValue: null
	},
	isEqual: function(value1, value2) {
		return false;
    },
    getValue: function(){
		var value = this.callParent();
		if (!Ext.isObject(value)){
			value = this.getOutValue();
		}
		return value;
	},
	setValue: function(value){
		this.setOutValue(value);
		this.callParent(arguments);
		if (value){
			if (Ext.isArray(value)){
				var text = '';
				var name = this.displayField;
				if (value.length == 1){
					if (Ext.isObject(value[0])){
						this.setOutValue(value[0].data);
						if (Ext.isObject(value[0].data)){
							text = value[0].data[name];
						}
					}
				}
				else {
					this.setOutValue(value);
					Ext.each(value,function(v){
						if (v.data && Ext.isObject(v.data)){
							text += '['+v.data[name]+']';
						}
					});
				}
				this.setRawValue(text);
			}
			else {
				this.setRawValue(value[this.displayField]);
			}
		}
	},    
    editable: false,
	triggerCls: 'x-form-search-trigger',
	getParentController: function(){
		var view = this;
	  	while (view && !view.controller){
	  		view = view.up('box');
	  	}
	  	if (view){
	  		var controller = view.getController();
	  		this.setController(controller);
	  	}
	  	return view ? view.getController() : null;
	},	
	onTriggerClick: function() {
		var me = this;
		if (this.column){
			this.column.editor = this;
		}
		this.appParams = this.appParams || {};
  		this.viewParams = this.viewParams || {};
  		Ext.apply(this.appParams,{
  			selMode: {
  				callFunc: function(records){
  					if (records){
  						me.setValue(records[0].data);
						if (me.record){
							me.record.set(me.name,records[0].data);
						}
  					}
  				}
  			}
  		});
  		var controller = this.getParentController();
  		if (controller){
  			Ext.apply(this.appParams,{
  				menudata: controller.get('menudata'),
  				component: this,
  				callController: controller
  			});
  			controller.onFindWindowCreateBefore(this,this.appParams,this.viewParams);
  			this.appParams.initParam = this.appParams.initParam || {};
  			Ext.apply(this.appParams.initParam,{
				actionUrl: controller.getActionUrl(),
				callController: controller
			});
  		}
  		Ext.apply(this.viewParams,{
  			appParams:this.appParams,
  			canMulti: false
  		});
  		var win = Ext.widget(this.xwindow,this.viewParams);
		if (win.componentCls != 'x-window'){
			Ext.Error.raise({
            	msg: Ext.String.format('错误>>  {0}: 当前视图不是一个窗口对象.',Ext.getClassName(win))
          	});
		}
		else {
			win.show();
		}
    }
});