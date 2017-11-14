Ext.create('Ext.data.Store', {
    storeId:'centerTextStore',
    fields:['text','id','bFont'],
    data:{
        items:[]
    },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }
});
Ext.define('Keer.ui.core.PartArticle.PartArticleContent.tpl.CenterTextView',{
    extend: 'Ext.form.Panel',
    alias: 'widget.ui-core-PartArticle-tpl-CenterTextView',
    requires: [
    ],
    frame:false,
    border:0,
    bodyPadding: 5,
    loadData:function (data) {
        this.getForm().setValues(data);
        var grid = this.down('grid');
        var store = grid.getStore();
        store.loadData(data.sectionContent||[]);
    },
    fetchData:function () {
        var data = this.getForm().getValues();
        var grid = this.down('grid');
        var store = grid.getStore();
        var sectionContent = [];
        store.each(function (model) {
            sectionContent.push(model.getData());
        });
        data['sectionContent'] = sectionContent;
        return data;
    },
    items:{
        layout: 'column',
        border:0,
        items: [{
            columnWidth: 1/3,
            layout: 'form',
            border:0,
            margin: '2 10 2 10',
            items: [
                {
                    fieldLabel: '段落序号',
                    name: 'sectionIndex',
                    itemId: 'sectionIndex',
                    dataIndex: 'sectionIndex',
                    xtype:'numberfield'
                }
            ]
        },{
            columnWidth: 1,
            layout: 'fit',
            xtype:'grid',
            border:0,
            margin: '2 10 2 10',
            plugins:[
                Ext.create('Ext.grid.plugin.CellEditing', {
                    pluginId: 'cellplugin',
                    clicksToEdit: 1
                })
            ],
            listeners:{
                'selectionchange':function ( opt, selected) {
                    var button = opt.view.up('window').down('[iconCls=remove]')
                    button.setDisabled(false);
                    button.record = selected;
                }
            },
            dockedItems:{
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {text:'新增',iconCls:'add',iconAlign: 'left',handler:function(){
                        var grid = this.up('grid');
                        var store = grid.getStore();
                        var model = store.createModel({id:store.getCount()+1});
                        store.add(model);
                        var editor = grid.getPlugin('cellplugin');
                        editor.startEditByPosition({row: store.getCount()-1, column: 1});
                    }},
                    {text:'删除',iconCls:'remove',iconAlign: 'left',disabled:true,handler:function(){
                        var grid = this.up('grid');
                        var store = grid.getStore();
                        store.remove(this.record);
                    }}
                ]
            },
            store: Ext.data.StoreManager.lookup('centerTextStore'),
            columns: [
                { text: '序号',  dataIndex: 'id', width:80 },
                { text: '粗体',  dataIndex: 'bFont',xtype : 'checkcolumn', width:80 },
                { text: '文本',  dataIndex: 'text', flex: 1,editor:{xtype:'textfield'} }
            ]
        }]
    }
});