Ext.define('Keer.ui.core.PartArticle.PartArticleContent.tpl.JustifyTextView',{
    extend: 'Ext.form.Panel',
    alias: 'widget.ui-core-PartArticle-tpl-JustifyTextView',
    requires: [
        'Keer.widget.field.FileTrigger'
    ],
    frame:false,
    border:0,
    bodyPadding: 5,
    loadData:function (data) {
        this.getForm().setValues(data);
    },
    fetchData:function (callBack) {
        callBack(this.getForm().getValues());
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
                    fieldLabel: '居中文本',
                    name: 'textContent',
                    itemId: 'textContent',
                    dataIndex: 'textContent',
                    xtype:'textarea',
                    rows:10
                }
            ]
        }]
    }
});