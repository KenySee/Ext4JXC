Ext.define('Keer.ui.${upfolder}.${appfolder}.window.edit.Window',{
	extend: 'Ext.window.Window',
	controller: 'Keer.ui.${upfolder}.${appfolder}.window.edit.Controller',
	<#assign itemlist = toFieldRequires()>
	requires:[
		'Ext.layout.*',
		<#list itemlist as item>
		'${item}',
		</#list>
		'Keer.app.view.widget.Form'
	],
	config: {
		titleName: '${name}',
		column: 2,
		addWidth: 0,
		addHeight: 0,
		labelWidth: 60,
		fields: [],
		tabList: [],
		formConfig: {}
	},
	initComponent: function(){
		var items = this.getFields();
		if (items.length == 0){
			items = [
				<#list toFieldConfig() as item>
				${item}<#if item_has_next>,</#if>
				</#list>
			];
			this.setFields(items);
		}
		var fields = this.getFields();
		var tablist = [];
		var childs = [], col = this.getColumn(), i = 0;
		var rowlayout = {};
		Ext.each(fields,function(item){
			if (i%col == 0){
				rowlayout = {layout:'column',border: 0,anchor:'97%',items:[]};
				childs.push(rowlayout);
			}
			if (item.fullLine){
				var fulllayout = {layout:'column',border: 0,anchor:'97%',items:[]};
				childs.push(fulllayout);
				fulllayout.items.push({columnWidth:1,layout:'form',defaults:{labelWidth:this.getLabelWidth()},border: 0,margin:'2 10 2 10',items:[item]});
			}
			else {
				if (item.xcontainer){
					item = Ext.widget(item.xtype,item);
					tablist.push(item);
					if (item.xcontainer.indexOf('-mem-') > 0){
						rowlayout.items.push({columnWidth:1/col,layout:'form',defaultType:'textfield',defaults:{labelWidth:this.getLabelWidth()},border: 0,margin:'0 0 0 0',items:[item]});
					}
				}
				else {
					if (item.xtype != 'hidden'){
						i += 1;
						rowlayout.items.push({columnWidth:1/col,layout:'form',defaultType:'textfield',defaults:{labelWidth:this.getLabelWidth()},border: 0,margin:'2 10 2 10',items:[item]});
					}
				}
			}
		},this);
		var row = childs.length;
		var form = {};
		Ext.apply(form,this.getFormConfig());
		Ext.apply(form,{
			xtype: 'app-view-widget-form',
			trackResetOnLoad: true,
			border: 0,
			items: childs
		});
		Ext.apply(this,{
			title: this.getTitleName(),
			layout: 'fit',
			width: col*280,
			height: row*40 + 60,
			modal: true,
			maximizable:true,
			tbar: [],
			items: [form]
		});
		if (tablist.length > 0){
			var item = this.items[0];
			item.region = 'north';
			this.height += 220;
			if (this.width < 400){
				this.width = 400;
			}
			var tabcontrol = {
				xtype: 'tabpanel',
				region: 'center',
				deferredRender: false,
				plain: true,
				border: 0
			};
			this.layout = 'border';
			this.items.push(tabcontrol);
			this.setTabList(tablist);
		}
		this.width += this.getAddWidth();
		this.height += this.getAddHeight();
		this.callParent(arguments);
	}
});