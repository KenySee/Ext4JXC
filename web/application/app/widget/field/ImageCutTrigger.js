Ext.define('Keer.widget.field.ImageCutTrigger', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.widget-field-imagecuttrigger',
    requires: ['Keer.widget.field.ImageCutWindow'],
    config: {
        controller: null,
        outValue: null
    },
    editable: false,
    urlIndex: 'urlPath',
    triggerCls: 'x-form-search-trigger',
    onTriggerClick: function() {
        var me = this;
        var dlg = Ext.create('Keer.widget.field.ImageCutWindow',{onUploaded:function(path){
            me.setValue(path);
        },path:me.getValue()});
        dlg.show();
    },
    onTrigger2Click: function () {

    }
});