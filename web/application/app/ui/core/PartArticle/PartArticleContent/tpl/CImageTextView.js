Ext.define('Keer.ui.core.PartArticle.PartArticleContent.tpl.CImageTextView',{
    extend: 'Ext.form.Panel',
    alias: 'widget.ui-core-PartArticle-tpl-CImageTextView',
    requires: [
        'Keer.widget.field.FileTrigger'
    ],
    frame:false,
    border:0,
    bodyPadding: 5,
    loadData:function (data) {
        this.getForm().setValues(data);
    },
    fetchData:function () {
        return this.getForm().getValues();
    },
    items:{
        layout: 'column',
        border:0,
        items: [{
            columnWidth: 1,
            layout: 'form',
            border:0,
            margin: '2 10 2 10',
            items: [
                {
                    fieldLabel: '产品图片',
                    name: 'productImage',
                    itemId: 'productImage',
                    dataIndex: 'productImage',
                    xtype:'widget-field-filetrigger'
                }
            ]
        },{
            columnWidth: 1,
            layout: 'form',
            border:0,
            margin: '2 10 2 10',
            items: [
                {
                    fieldLabel: '产品名称',
                    name: 'productText',
                    itemId: 'productText',
                    dataIndex: 'productText',
                    xtype:'textfield'
                }
            ]
        },{
            columnWidth: 1,
            layout: 'form',
            border:0,
            margin: '2 10 2 10',
            items: [
                {
                    fieldLabel: '匠人',
                    name: 'productAuthor',
                    itemId: 'productAuthor',
                    dataIndex: 'productAuthor',
                    xtype:'textfield'
                }
            ]
        }]
    }
});