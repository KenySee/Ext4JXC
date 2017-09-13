Ext.define('Keer.widget.core.EditWindow',{
	extend: 'Ext.window.Window',
	//【加载依赖】
	requires: [
		'Ext.layout.*',
		'Keer.widget.action.Form'
	],
	//【混入功能】
	mixins: {
		EnumRender: 'Keer.widget.mixin.EnumRender'
	},
	//【成员变量】
	config:{
		winTitle: '标题',
		editTitle: '',
		formAlias: 'widget-action-form',
		column: 2,
		addWidth: 0,
		addHeight: 0,
		labelWidth: 60,
		labelAlign: 'left',
		formFields: [],		//【表单初始字段数组】
		addFields: [],		//【表单附加字段数组】
		addItems: [],
		formConfig: {},		
		appParams:{} //控制器参数
	},
	//【构造方法】
	constructor: function (config) {
		config = config || {};
		this.initConfig(config);
		if (config.appParams){
			//初始化控制器参数
			var controller = this.getController();
			Ext.apply(controller,config.appParams.initParam);
			Ext.apply(controller,{
				callController: config.appParams.callController
			});
		}
        this.callParent(arguments);
    },
    initComponent: function(){
    	var viewConfig = {
    		id: this.id,
			title: this.getWinTitle(),
			layout: 'fit',
			buttonAlign: 'center',
			modal: true,
			closable: false,
			maximizable:false,
			tbar: [],
			buttons:[],
			tools :[{
				itemId : 'editCloseTool',
				type : 'close'
			}],
			items: this.items
    	};
    	if (!viewConfig.items || viewConfig.items.length == 0){
			var childs = [],fields = this.getFormFields(),
			col = this.getColumn(), i = 0,
			colAlign = this.getLabelAlign(), 
			colWidth = this.getLabelWidth();
			var rowlayout = {};
			Ext.each(fields,function(item){
				if (i%col == 0){
					rowlayout = {layout:'column',border: 0,anchor:'97%',items:[]};
					childs.push(rowlayout);
				}
				if (item.fullLine){
					var fulllayout = {layout:'column',border: 0,anchor:'97%',items:[]};
					childs.push(fulllayout);
					fulllayout.items.push({columnWidth:1,layout:'form',defaults:{labelWidth:colWidth,labelAlign: colAlign},border: 0,margin:'2 10 2 10',items:[item]});
				}
				else {
					if (item.xcontainer){
						rowlayout.items.push({columnWidth:1/col,layout:'form',defaults:{labelWidth:colWidth},border: 0,margin:'0 0 0 0',items:[item]});
					}
					else {
						i += 1;
						rowlayout.items.push({columnWidth:1/col,layout:'form',defaults:{labelWidth:colWidth,labelAlign: colAlign},border: 0,margin:'2 10 2 10',items:[item]});
					}
				}
			},this);
			var row = childs.length;
			var formConfig = this.getFormConfig();
			Ext.apply(formConfig,{
				itemId: 'editFormPanel',
				trackResetOnLoad: true,
				border: 0,
				items: childs
			});
			var alais = this.getFormAlias();
			var form = Ext.widget(alais,formConfig);
			Ext.apply(viewConfig,{
				width: col*280,
				height: row*40 + 60,
				items: [form]
			});
    	}
		if (viewConfig.items && viewConfig.items.length == 1){
			var form = viewConfig.items[0];
	    	var tabList = form.query('[xcontainer]');
			if (tabList && tabList.length > 0){
				viewConfig.height += 220;
				if (viewConfig.width < 400){
					viewConfig.width = 400;
				}
				var tabpanel = Ext.widget('tabpanel',{
					xtype: 'tabpanel',
					region: 'center',
					deferredRender: false,
					plain: true,
					border: 0,
					items:[]
				});
				form.region = 'north';
				viewConfig.layout = 'border';
				viewConfig.items.push(tabpanel);
			}
			else {
		    	if (viewConfig.height < 120){
					viewConfig.height = 120;
				}
			}			
		}
		var controller = this.getController();
		if (controller){
			controller.doViewInitComponent(viewConfig);
		}
		Ext.apply(this,viewConfig);
		this.iconCls = 'menu_item';
		this.width += this.getAddWidth();
		this.height += this.getAddHeight();	
		
    	this.callParent(arguments);
    }
});