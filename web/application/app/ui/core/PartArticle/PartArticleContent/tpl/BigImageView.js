Ext.define('Keer.ui.core.PartArticle.PartArticleContent.tpl.BigImageView',{
    extend: 'Ext.form.Panel',
    alias: 'widget.ui-core-PartArticle-tpl-BigImageView',
    requires: [
        'Keer.widget.field.FileTrigger'
    ],
    frame:false,
    border:0,
    bodyPadding: 5,
    loadData:function (data) {
        var imgurl = data.imgSrc;
        if(imgurl && imgurl!='') {
            Ext.getCmp('browseImage').getEl().dom.src = imgurl+'?imageView/2/w/460';
        }
    },
    fetchData:function (callBack) {
        var panel = this.up('window').down('form');
        var form = panel.getForm();
        var photoName = form.findField('upload').getValue();
        form.submit({
            waitMsg: '正在上传...',
            url:'PartArtistAction!uploadArit.action',
            method: "POST",
            params:{
                uploadFileName:photoName
            },
            success: function(form, action) {
                if(action.result.success===true){
                    callBack({imgSrc:action.result.url});
                }
            },
            failure: function(form, action) {

            }
        });
        return this.getForm().getValues();
    },
    layout: 'border',
    items: [{
        xtype: 'image',
        id:'browseImage',
        region: 'center',
        src: 'http://www.sencha.com/img/20110215-feat-html5.png',
        width: '100%',
        height: 700
    },{
        xtype:'panel',
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
    }]
});