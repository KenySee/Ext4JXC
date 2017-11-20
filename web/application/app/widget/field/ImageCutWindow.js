Ext.define('Keer.widget.field.ImageCutWindow', {
    requires: ['Ext.ux.CropWindow'],
    extend: 'Ext.window.Window',
    alias: 'widget.widget-field-imagecutwindow',
    title: '图片',
    resizable:false,
    modal: true,
    width: 500,
    height: 500,
    frame:false,
    config: {
        onUploaded: undefined,
        path:''
    },
    layout: {
        type: 'vbox',
        align: 'center'
    },
    listeners: {
        afterrender: function (me) {
            if(me.path!=''){
                me.setPath(me.path)
            }
        }
    },
    setPath: function (path) {
        console.log(path);
        var imgSrc = this.queryById('imageInformationSrc');
        imgSrc.getEl().dom.src = path;
        this.path = path;
    },
    onDeletePath: function () {
        this.setPath('');
    },
    onOK: function () {
        this.onUploaded(this.path);
        this.close();
    },

    onCancel: function () {
        this.close();
    },

    onCut:function(){
        if(this.path!=''){
            var cw = new Ext.ux.CropWindow({
                imageUrl: this.path,
                listeners:{
                    save: function(data){
                        var url = this.path+"?imageMogr2/crop/!"+data.cropData.width+"x"+data.cropData.height+"a"+data.cropData.x+"a"+data.cropData.y;
                        var me = this;
                        Ext.Ajax.request({
                            url: 'PartArtistAction!cut.action',
                            params: {
                                url: url
                            },
                            success: function(response){
                                var res = Ext.JSON.decode(response.responseText);
                                if(res.success){
                                    me.setPath(res.url);
                                }
                            }
                        });

                    },
                    scope: this
                }
            });
            cw.show();
        }else{
            Ext.MessageBox.alert("提示", "请先上传图片！");
        }
    },

    items:[{
        itemId: 'imageInformationSrc',
        height: 400,
        width:480,
        frame:false,
        xtype: 'box',
        autoScroll:true,
        style: 'background-color: #fff;',
        autoEl: {
            tag: 'img'
        }
    },{
        flex:1,
        width:'100%',
        xtype: 'form',
        bodyPadding: "5",
        buttons: [{
            text: '剪切',
            handler:function(button,e){
                this.up('window').onCut();
            }
        },{
            text: '清除',
            handler:function(button,e){
                this.up('window').onDeletePath();
            }
        }, {
            xtype: 'component',
            flex: 1
        }, {
            text: '确定',
            handler:function(button,e){
                this.up('window').onOK();
            }
        }, {
            text: '取消',
            handler:function(button,e){
                this.up('window').onCancel();
            }
        }],
        items: [{
            xtype: "filefield",
            name: "upload",
            buttonOnly: true,
            // fieldLabel : "选择文件",
            buttonText: "选择文件上传...",
            allowBlank: false,
            listeners: {
                'change': function (fb, v) {
                    // 浏览器限制，不能显示本地文件。
                    // Ext.getCmp('imageInformationSrc').html = v;
                    var formCmp = this.up("form");
                    var me = formCmp.up('window')
                    if (!formCmp.isValid()) {
                        return;
                    }
                    var photoName = formCmp.getForm().findField('upload').getValue();
                    formCmp.submit({
                        url: 'PartArtistAction!uploadArit.action',
                        method: "POST",
                        params: {
                            uploadFileName: photoName
                        },
                        waitMsg: '正在上传...',
                        success: function (form, action) {
                            var ret = action.result;
                            if (ret.success) {
                                // Ext.MessageBox.alert("提示", ret.url);
                                me.setPath(ret.url);
                            } else {
                                Ext.MessageBox.alert("失败", "上传失败");
                            }
                        },
                        failure: function (form, action) {
                            switch (action.failureType) {
                                case Ext.form.action.Action.CLIENT_INVALID :
                                    Ext.Msg
                                        .alert('失败',
                                            'Form fields may not be submitted with invalid values');
                                    break;
                                case Ext.form.action.Action.CONNECT_FAILURE :
                                    Ext.Msg.alert('失败',
                                        'Ajax communication failed');
                                    break;
                                case Ext.form.action.Action.SERVER_INVALID :
                                    Ext.Msg.alert('失败',
                                        action.result.message);
                            }
                        }
                    });
                }
            }
        }]
    }]
});