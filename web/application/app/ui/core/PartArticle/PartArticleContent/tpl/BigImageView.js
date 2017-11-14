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
                    fieldLabel: '图片地址',
                    name: 'imgSrc',
                    itemId: 'imgSrc',
                    dataIndex: 'imgSrc',
                    xtype:'widget-field-filetrigger'
                }
            ]
        }]
    }
});