Ext.define('Keer.ui.core.Organization.ChildController',{
	extend: 'Keer.widget.mvc.Controller',
	//【加载依赖】
	requires: [
	],
	//【混入功能】
	mixins: {
	},
	//【成员变量】
	config: {
		editing: null,
		actionUrl: null,
		controllerType: 'child'
	},
	
	//【监听View事件】
    control: {
	},
	
	//【监听Store事件】
	observe: {

	},
	onViewBoxReady: function(){
		this.setEditing(false);
	},
	applyEditing: function(editing){
		this.doSwitchComponent(editing,'childEdit','editing','enable','disable');
		return editing;
	}
});