// var formpanel= Ext.create("Ext.form.FormPanel", {
//     width: '95%',
//     height: '95%',
//     layout: "form",
//     bodyPadding: "5",
//     defaultType: "textfield",
//     fieldDefaults: { labelAlign: "left", labelWidth: 80 },
//     items: [
//         {
//             xtype: 'box',
//             width: '100%',
//             height: 640,
//             id: 'browseImage',
//             autoEl: {
//                 tag: 'img',
//                 src: Ext.BLANK_IMAGE_URL,
//                 id: 'imageBrowse'
//             }
//         },
//         {
//             id: 'File',
//             name: 'File',
//             inputType: "file",
//             fieldLabel: '上传图片',
//             labelWidth:80,
//             xtype: 'textfield',
//             allowBlank: false,
//             listeners: {//监听事件
//                 'render': function () {//读取
//                     var path = Ext.getCmp('File').getValue()
//                     var url = 'file:///' + path;
//                     console.log(url);//浏览器安全保护下的虚拟路径
//                     Ext.getCmp('File').on('change', function (field, newValue, oldValue) {//上传图片的控件对象,刚刚选择的图片仿真路径，上次选择的图片仿真路径
//                         // console.log(newValue);
//                         // var show = Ext.getCmp('browseImage');
//                         if (Ext.isIE) {
//
//                         } else {//获取选择文件的路径信息？ 将路径绑定到显示图片的box内加载
//                             var obj = Ext.getCmp('File').inputEl.dom.files;
//                             var len = obj.length;//选文件的数量
//                             if (len < 1) {
//                                 console.log('没有选择图片');
//                                 return;
//                             }
//                             var imgurl = window.URL.createObjectURL(obj[0]);
//                             console.log(imgurl)
//                             Ext.getCmp('browseImage').getEl().dom.src = imgurl;
//
//                         }
//                     }, this);
//                 }
//             }
//         }
//     ],
//     buttons: [
//         {
//             text: "上传",
//             handler: function () {
//                 var formCmp = this.up("form");
//                 if (!formCmp.isValid()) return;    //验证未通过，返回
//                 var photoName = Ext.getCmp('File').getValue();
//                 console.log(photoName);
//                 formCmp.submit({
//                     url: "/User/Upload",
//                     method: "POST",
//                     waitMsg: '正在上传...',
//                     params: {
//                         photoName: photoName
//                     },
//                     success: function (form, action,ret) {
//                         console.log(form);
//                         console.log(action);
//                         console.log(ret);
//                         Ext.MessageBox.alert("提示", action.result.message);
//                     },
//                     failure: function (form, action, ret) {
//                         console.log('Form fields may not be submitted with invalid values');
//                     }
//                 });
//             }
//         }, {
//             text: '关闭',
//             handler: function () {
//                 win.close();
//             }
//         }
//     ]
// });
// var win = new Ext.Window({
//     title: '上传文件窗口',
//     width: 1000,
//     height: 760,
//     resizable: false,
//     modal: false,
//     closable: false,
//     closeAction: 'hide',
//     custormServiceAimObjectId: '',//这是给哪个对象进行文件上传操作（如哪家酒店ID）
//     custormFileType: ''//自定义属性，指向文件的类型
// });
Ext.define('Keer.widget.field.FileTrigger', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.widget-field-filetrigger',
    config: {
        controller: null,
        outValue: null
    },
    editable: false,
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
                                me.setValue(action.result.url);
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