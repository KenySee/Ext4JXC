Ext.Loader.setConfig( {
	enabled : true,
	paths : {
		"Keer" : "application/app",
		"Deft":  "application/packages/deft/src/js",
		"Ext.ux": "application/ext/src/ux/"
	}
});
Ext.tip.QuickTipManager.init();
Ext.define('Ext.overrides.form.field.Base', {
    override: 'Ext.form.field.Base',
    setReadOnly: function(value){
    	if (this.readOnlyCls == 'x-item-readonly'){
    		if (!value) return;
    	}
    	this.callParent(arguments);
    },
    constructor: function (config) {
    	if (config.readOnly){
    		config.readOnlyCls = 'x-item-readonly';
    	}
    	this.callParent(arguments);
    },
    initComponent: function () {
        this.callParent();
        this.msgTarget = 'side';
        this.enableBubble('change');
	    if(this.allowBlank === false && this.fieldLabel){ 
	    	this.fieldLabel += '<font color=red>*</font>';
	    }
    }
});
Ext.syncRequire([
	'Deft.promise.Deferred',    
	'Deft.mixin.Injectable',
    'Deft.mixin.Controllable',
    'Keer.ui.core.Frame.Application'
]);
Ext.create("Keer.ui.core.Frame.Application");