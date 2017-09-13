Ext.define('Keer.widget.ux.TabCloseMenu', {
	extend : 'Ext.ux.TabCloseMenu',
	closeTabText : '关闭当前',
	closeOthersTabsText : '关闭其他',
	closeAllTabsText : '关闭所有',
	extraItemsTail : [ '-', {
		text : '可关闭',
		checked : true,
		hideOnClick : true,
		handler : function(item) {
//			currentItem.tab.setClosable(item.checked);
		}
	} ],
	listeners : {
		aftermenu : function() {
			currentItem = null;
		},
		beforemenu : function(menu, item) {
			var menuitem = menu.child('*[text="可关闭"]');
			currentItem = item;
			menuitem.setChecked(item.closable);
		}
	},
	doClose : function(excludeActive){
        var items = [];

        this.tabPanel.items.each(function(item){
            if(item.closable){
                if(!excludeActive || item != this.item){
                    items.push(item);
                }
            }
        }, this);

        Ext.suspendLayouts();
        Ext.Array.forEach(items, function(item){
        	item.tab.onCloseClick();
        }, this);
        Ext.resumeLayouts(true);
    }
});