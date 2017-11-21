Ext.define('Keer.widget.field.FileTrigger', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.widget-field-filetrigger',
    config: {
        controller: null,
        outValue: null
    },
    editable: false,
    urlIndex: 'urlPath',
    triggerCls: 'x-form-search-trigger',
    onTriggerClick: function() {
        var me = this;
        var win = Ext.create('Ext.window.Window', {
            title: '文件上传',
            height: 500,
            width: 600,
            layout: 'border',
            items: [{
                xtype: 'image',
                id:'browseImage',
                region: 'center',
                src: 'http://www.sencha.com/img/20110215-feat-html5.png',
                width: '100%',
                height: 700
            },{
                xtype:'form',
                region:'south',
                layout:'fit',
                frame:false,
                border:0,
                bodyPadding: 5,
                items:[
                    {   xtype: 'filefield',
                        name: 'upload',
                        fieldLabel: '上传文件',
                        labelWidth: 80,
                        id: 'id_uploadfield',
                        allowBlank: false,
                        anchor: '100%',
                        listeners: {
                            'render':function(){
                                var imgurl = me.getValue();
                                if(imgurl && imgurl!='') {
                                    Ext.getCmp('browseImage').getEl().dom.src = imgurl+'?imageView/2/w/460';
                                }
                            },
                            'change':function (field, newValue, oldValue) {
                                if (!Ext.isIE) {
                                    var field = document.getElementById('id_uploadfield');
                                    var inputs = field.getElementsByTagName('input');
                                    var fileInput = null;
                                    for (var i = 0; i < inputs.length; i++) {
                                        if (inputs[i].type == 'file') {
                                            fileInput = inputs[i];
                                            break;
                                        }
                                    }
                                    if (fileInput != null) {
                                        var imgurl = window.URL.createObjectURL(fileInput.files[0]);
                                        Ext.getCmp('browseImage').getEl().dom.src = imgurl;
                                    }
                                }
                            }
                        }
                    }
                ]
            }],
            buttons:[{
                text: "上传",
                handler: function () {
                    var panel = this.up('window').down('form');
                    var form = panel.getForm();
                    var photoName = form.findField('upload').getValue();
                    form.submit({
                        url:'PartArtistAction!uploadArit.action',
                        method: "POST",
                        params:{
                            uploadFileName:photoName
                        },
                        success: function(form, action) {
                            if(action.result.success===true){
                                if(me.record){
                                    me.record.set(me.urlIndex,action.result.url);
                                }
                                else {
                                    me.setValue(action.result.url);
                                }
                                win.close();
                            }
                        },
                        failure: function(form, action) {

                        }
                    });
                }
            },{
                text: '关闭',
                handler: function () {
                    win.close();
                }
            }]
        });
        win.show();
    },
    onTrigger2Click: function () {

    }
});