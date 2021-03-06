Ext.define('Keer.ui.core.PartArticle.PartArticleContent.ContentChildView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ui-core-PartArticle-PartArticleContent-ContentChildView',
    requires: [
        'Keer.widget.field.FileTrigger',
        'Keer.ui.core.PartArticle.PartArticleContent.tpl.JustifyTextView',
        'Keer.ui.core.PartArticle.PartArticleContent.tpl.BigImageView',
        'Keer.ui.core.PartArticle.PartArticleContent.tpl.ImageProductView',
        'Keer.ui.core.PartArticle.PartArticleContent.tpl.CenterTextView'
    ],
    frame: false,
    border: 0,
    layout: 'border',
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: true
    },
    bodyPadding: 5,
    contentType:"",
    loadData: function (contentType, data) {
        //根据类型加载数据
        var dataIndex = 0;
        var grid = this.queryById('westItem');
        dataIndex=grid.getStore().find('type',contentType)
        if(dataIndex!=-1){
            grid.getSelectionModel().select(dataIndex, true, false);
            var formItem = this.queryById('formItem');
            formItem.loadData(data);
            grid.setDisabled(true);
        }
        // this.getForm().setValues(data);
    },
    fetchData: function (callBack) {
        var contentType = this.contentType;
        function tempCallBack(data){
            var tempData = {contentType:contentType,data:data};
            callBack(tempData);
        }
        var formItem = this.queryById('formItem');
        if(formItem){
            formItem.fetchData(tempCallBack);
        }else{
            Ext.Msg.alert('提示','请选择类型');
            callBack();
        }
        // return this.getForm().getValues();
    },
    clearData: function () {
        var cmp = this.queryById('centerItem');
        cmp.removeAll(true);
        cmp.add(Ext.create("Keer.ui.core.PartArticle.PartArticleContent.tpl." + this.contentType+"View", {itemId:'formItem'}));
    },
    items: [
        {
            width: 250,
            listeners: {
                selectionchange: function (me, selected, eOpts) {
                    var cmp = this.up('panel').queryById('centerItem');
                    cmp.removeAll(true);
                    this.up('panel').contentType = selected[0].get("type");
                    cmp.add(Ext.create("Keer.ui.core.PartArticle.PartArticleContent.tpl." + selected[0].get("type")+"View", {itemId:'formItem'}));
                }
            },
            itemId: 'westItem',
            frame: false,
            region: 'west',
            xtype: 'grid',
            columnLines: true,
            hideHeaders: true,
            viewConfig: {
                forceFit: true,
                stripeRows: true//在表格中显示斑马线
            },
            store: {
                fields: [
                    {name: 'name', type: 'string'},
                    {name: 'type', type: 'string'},
                    {name: 'image', type: 'string'}
                ],
                xtype: 'store.array',
                data: [{name: '段落大图', type: 'BigImage', image: './images/EFDFEEE9-6ABA-450E-A3DD-66492D648466.png'},
                    {name: '段落文本', type: 'JustifyText', image: './images/01511AA0-3AD4-455D-B7FF-22A2DAFDDF79.png'},
                    {name: '居中文本', type: 'CenterText', image: './images/291A9F24-87E5-45AD-B2DA-B3017F39F28F.png'},
                    {name: '作品预订', type: 'ImageProduct', image: './images/846642E5-BA36-42B0-BD4E-124F4DD43885.png'},
                    {name: '段落双图', type: 'DoubleImage', image: './images/IMG_2016.JPG'}
                ],//读取内嵌数据
                autoLoad: true//自动加载
            },
            columns: [
                {
                    text: '添加类型',
                    dataIndex: 'image',
                    width: '100%',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value)
                            return  record.get('name')+"<br/><a href='javascript:void(0);' target='_blank' title='" + record.get('name') + "'><img width='100%' height='100' src='" + value + "'/></a>";
                        else
                            return value;
                    }

                }
            ]
        }, {
            region: 'center',
            xtype: 'panel',
            frame: false,
            layout: 'fit',
            itemId: 'centerItem',
            html: '点击左侧图片选择添加的类型'
        }
    ]
});