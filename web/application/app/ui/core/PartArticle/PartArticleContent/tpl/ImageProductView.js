Ext.create('Ext.data.Store', {
    storeId:'imageProductStore',
    fields:['id','productId','productImage','productText','productAuthor'],
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
Ext.define('Keer.ui.core.PartArticle.PartArticleContent.tpl.ImageProductView',{
    extend: 'Ext.form.Panel',
    alias: 'widget.ui-core-PartArticle-tpl-ImageProductView',
    requires: [
        'Keer.widget.field.FileTrigger'
    ],
    frame:false,
    border:0,
    bodyPadding: 5,
    loadData:function (data) {
        var grid = this.down('grid');
        var store = grid.getStore();
        store.loadData(data.prolist||[]);
    },
    fetchData:function (callBack) {
        var data = {};
        var grid = this.down('grid');
        var store = grid.getStore();
        var prolist = [];
        store.each(function (model) {
            prolist.push(model.getData());
        });
        data['prolist'] = prolist;
        callBack(data);
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
                    button.record = selected[0];
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
            store: Ext.data.StoreManager.lookup('imageProductStore'),
            columns: [
                { text: '序号',  dataIndex: 'id', width:50 },
                { text: '产品ID',  dataIndex: 'productId', width:60,editor:{xtype:'textfield'} },
                { text: '产品图片',  dataIndex: 'productImage', flex: 1,editor:{
                    listeners:{
                        'focus':function () {
                            var button = this.up('window').down('[iconCls=remove]');
                            this.record = button.record;
                        }
                    },urlIndex:'productImage',
                    xtype:'widget-field-filetrigger'} },
                { text: '产品名称',  dataIndex: 'productText', flex:1,editor:{xtype : 'textfield'}},
                { text: '作者',  dataIndex: 'productAuthor', width:60,editor:{xtype:'textfield'} }
            ]
        }]
    }
});