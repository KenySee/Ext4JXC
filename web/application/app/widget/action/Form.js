Ext.define('Keer.widget.action.Form',{
	extend: 'Ext.form.Panel',
	requires: ['Keer.widget.action.Submit'],
	alias: 'widget.widget-action-form',
	config:{
		suppress: false
	},
	getControl: function(){
		if (!this.control){
			var view = this;
		  	while (view && !view.getController){
		  		view = view.up('box');
		  	}
		  	if (view){
		  		this.control = view.getController();
		  	}
		}
		return this.control;
	},
	submit: function(options) {
		if (this.form.hasUpload()){
			this.form.doAction('filesubmit',options);
		}
		else {
			this.form.submit(options);
		}
    },
    reset: function(resetRecord){
    	var form = this.getForm();
    	this.suppress = true;
    	if (resetRecord){
    		form.reset(resetRecord);
    	}
    	else {
    		form.reset();
    	}
    	this.suppress = false;
    },
    loadRecord: function(record){
    	this.suppress = true;
    	this.callParent(arguments);
    	this.suppress = false;
    },
    updateRecord: function(record){
    	this.callParent(arguments);
    	if (record){
    		record.setDirty();
    	}
    },
    isDirty: function(){
    	var fields = this.query('[name]');
    	var isDirty = false;
    	Ext.each(fields,function(field){
    		isDirty = field.isVisible() && field.isDirty();
    		if (isDirty){
    			return false;
    		}
    	});
    	return isDirty;
    },
    onValueChange: function(field, newVal, oldVal){
    	if (!this.suppress){
    		var control = this.getControl();
			var dirty = field.isDirty() || control.getAdding();
			control.setEditing(dirty);
		}
    },
	initComponent: function(){
		Ext.apply(this,{
			listeners:{
				change: this.onValueChange
			}
		});
		this.callParent(arguments);
	}
});