Ext.define('Keer.widget.form.Layout',{
	getControl: function(){
		if (!this.control){
			var view = this;
		  	while (view && !view.getController){
		  		view = view.up('box');
		  	}
		  	if (view){
		  		this.control = view.getController();
		  	}
		}
		return this.control;
	},
	onViewBoxReady: function(){
		this.getControl().doCreateChildContainer(this);
	},
	doFormLayout: function(){
		var rowlayout = {},childs = [],i = 0,col = this.column;
		if (this.autoLayout){
			if (!this.formFields || this.formFields.length == 0){
				this.autoLayout = false;		
			}
			else {
				Ext.each(this.formFields,function(item){
					if (!item.fieldLabel){
						this.autoLayout = false;
						return false;
					}
				},this);
			}
		}
		if (this.autoLayout && this.formFields){
			Ext.each(this.formFields,function(item){
				item.colspan = (item.colspan || 1)
				item.colspan = (item.colspan > col ? col : item.colspan);
				if (i%col == 0){
					rowlayout = {layout:'column',border: 0,anchor:'97%',items:[]};
					childs.push(rowlayout);
				}
				if (item.fullLine){
					var fulllayout = {layout:'column',border: 0,anchor:'97%',items:[]};
					childs.push(fulllayout);
					fulllayout.items.push({columnWidth:1,layout:'form',defaults:{labelWidth:this.labelWidth,labelAlign: this.labelAlign},border: 0,margin:'2 10 2 10',items:[item]});
				}
				else {
					if (item.xcontainer){
						childs.push(item);
					}
					else {
						i += item.colspan;
						if (item.forcedWrap){
							i += (col-i%col);
						}
						rowlayout.items.push({columnWidth:item.colspan/col,layout:'form',defaults:{labelWidth:this.labelWidth,labelAlign: this.labelAlign},border: 0,margin:'2 10 2 10',items:[item]});
					}
				}
			},this);
		}
		else {
			childs = this.formFields;
		}
		var viewConfig = {items:[]};
		var tabpanel = null;
		if (this.tabLayout){
			tabpanel = Ext.widget('tabpanel',{
				itemId: 'tabPanel',
				region: 'center',
				deferredRender: false,
				plain: true,
				border: 0,
				items:[]
			});
		}
		else {
			tabpanel = Ext.widget('panel',{
				header: false,
				layout: {
					type : 'hbox',
					align: 'stretch'
				},
				itemId: 'tabPanel',
				region: 'center',
				deferredRender: false,
				plain: true,
				margin : '-1 -1 1 -1',
				border: 0,
				items:[]
			});
		}		
		if (childs && childs.length >= 0){
			var row = childs.length;
			Ext.apply(this.formConfig,{
				trackResetOnLoad: true,
				border: 0,
				items: childs
			});
			Ext.applyIf(this.formConfig,{itemId: 'winform'});
			var form = Ext.widget('widget-action-form',this.formConfig);
			Ext.apply(viewConfig,{
				layout: 'fit',
				width: col*280 + this.addWidth,
				height: row*40 + 60 + this.addHeight
	    	});
	    	viewConfig.items.push(form);
	    	var tabList = form.query('[xcontainer]');
	    	if (tabList && tabList.length > 0){
				viewConfig.height = viewConfig.height + 220;
				viewConfig.width = viewConfig.width > 400 ? viewConfig.width : 400;
				viewConfig.layout = 'border';
				viewConfig.items.push(tabpanel);
				form.region = 'north';
			}
			else {
			   	viewConfig.height = viewConfig.height > 120 ? viewConfig.height : 120;
			}
		}
		else {
			viewConfig.layout = 'fit';
			viewConfig.items.push(tabpanel);
		}
		return viewConfig;
	}
});