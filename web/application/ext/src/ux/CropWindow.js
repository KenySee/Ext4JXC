/**
 * Licence:
 * You can use the Code as you like, only the URL http//www.thomas-lauria.de/ has to be in the used Files / Code
 * @author Thomas Lauria
 * http://www.thomas-lauria.de
 */
Ext.define('Ext.ux.CropWindow', {
    requires: ['Ext.Window', 'Ext.ux.ImageCrop'],
    extend: 'Ext.Window',
    cropData: null,
    imageUrl: '',
    title: '裁剪图片',
    width: 660,
    height: 510,
    modal: true,
    initComponent: function () {
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: '取消',
                    itemId: 'cancelButton'
                },
                {
                    xtype: 'button',
                    text: '保存',
                    itemId: 'saveButton'
                }
            ]
        };
        // I am using an image preloader here, for getting the initial height and width
        this.callParent(arguments);
        var imgLoad = new Image();
        imgLoad.onload = (function () {
            if (imgLoad.width > 1000) {
                this.close();
                Ext.Msg.alert('失败', '图片宽度不能超过1000');
            } else if (imgLoad.height > 800) {
                this.close();
                Ext.Msg.alert('失败', '图片高度不能超过800');
            } else {
                this.setSize(imgLoad.width + 20, imgLoad.height + 70);
                var crop = new Ext.ux.ImageCrop({
                    src: this.imageUrl,
                    width: imgLoad.width,
                    height: imgLoad.height,
                    minWidth: 110,
                    minHeight: 110,
                    quadratic: true
                });
                crop.on('changeCrop', function (foo, x) {
                    this.cropData = x;
                }, this);
                this.add(crop);
            }
        }).bind(this);
        imgLoad.src = this.imageUrl;
        // handler for the buttons
        this.down('#cancelButton').on('click', this.close, this);
        this.down('#saveButton').on('click', this.saveCrop, this);

    },
    saveCrop: function () {
        // Ext.get('output-2').update('X Offset: '+this.cropData.x+' Y Offset: '+this.cropData.y+' Width: '+this.cropData.width+' Height: '+this.cropData.height);
        if (this.fireEvent('save', this) === false) {
            return this;
        }
        this.close();

        /*
         *  or you can use a ajax call!
         Ext.Ajax.request({
         url: this.imageUrl,
         method: 'post',
         params: this.cropData,
         success: function(){
         if(this.fireEvent('save', this) === false){
         return this;
         }
         this.close();
         },
         scope: this
         });
         */
    }
});
