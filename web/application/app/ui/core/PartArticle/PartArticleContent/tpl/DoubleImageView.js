Ext.define('Keer.ui.core.PartArticle.PartArticleContent.tpl.DoubleImageView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ui-core-PartArticle-tpl-DoubleImageView',
    requires: [
        'Keer.widget.field.FileTrigger'
    ],
    frame: false,
    border: 0,
    bodyPadding: 0,
    loadData: function (data) {
        var imgurl1 = data.doubleImage1;
        var imgurl2 = data.doubleImage2;
        if (imgurl1 && imgurl2) {
            Ext.getCmp('browseImage').getEl().dom.src = imgurl1 + '?imageView/2/w/460';
            Ext.getCmp('browseImage1').getEl().dom.src = imgurl2 + '?imageView/2/w/460';
        }
    },
    fetchData: function (callBack) {
        var panel = this.up('window').down('form');
        var form = panel.getForm()
        form.submit({
            waitMsg: '正在上传...',
            url: 'PartArtistAction!addBatch.action',
            method: "POST",
            params: {
                uploadFileName: form.getFields().get(0).getValue()+","+form.getFields().get(1).getValue()
            },
            success: function (form, action) {
                if (action.result.success === true) {
                    callBack({doubleImage1: action.result.url[0],doubleImage2: action.result.url[1]});
                }
            },
            failure: function (form, action) {

            }
        });
        return this.getForm().getValues();
    },
    layout: 'border',
    items: [{
        xtype: 'panel',
        region: 'center',
        layout: 'border',
        width: '100%',
        defaults: {
            collapsible: false,
            split: true
        },
        height: 700,
        border: 0,
        bodyPadding: 0,
        items: [
            {
                id: 'browseImage',
                xtype: 'image',
                region: 'west',
                src: 'http://www.sencha.com/img/20110215-feat-html5.png',
                width: '50%',
                height: 700
            },
            {
                id: 'browseImage1',
                xtype: 'image',
                region: 'center',
                src: 'http://www.sencha.com/img/20110215-feat-html5.png',
                width: '50%',
                height: 700
            }
        ]
    }, {
        xtype: 'panel',
        region: 'south',
        layout: 'column',
        frame: false,
        border: 0,
        bodyPadding: 5,
        items: [
            {
                xtype: 'filefield',
                name: 'uploads',
                fieldLabel: '上传左图',
                labelWidth: 80,
                id: 'id_uploadfield1',
                allowBlank: false,
                width: '90%',
                anchor: '100%',
                listeners: {
                    'change': function (field, newValue, oldValue) {
                        if (!Ext.isIE) {
                            var field = document.getElementById('id_uploadfield1');
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
            },
            {
                xtype: 'filefield',
                name: 'uploads',
                fieldLabel: '上传右图',
                labelWidth: 80,
                id: 'id_uploadfield2',
                allowBlank: false,
                width: '90%',
                anchor: '100%',
                listeners: {
                    'change': function (field, newValue, oldValue) {
                        if (!Ext.isIE) {
                            var field = document.getElementById('id_uploadfield2');
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
                                Ext.getCmp('browseImage1').getEl().dom.src = imgurl;
                            }
                        }
                    }
                }
            }
        ]
    }]
});