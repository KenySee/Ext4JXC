Ext.define('Keer.ui.core.Organization.EditWindow',{
	extend: 'Keer.widget.view.EditWindow',
	alias: 'widget.ui-core-Organization-editwindow',
	controller: 'Keer.ui.core.Organization.EditController',
	//【加载依赖】
	requires: [
		'Keer.store.Role.Store',
		'Keer.store.Organization.Store',
		'Keer.widget.field.ObjectTrigger',
		'Keer.widget.field.CollectionHidden',
		'Keer.ui.selwin.Post.FindWindow',
		'Keer.ui.selwin.Role.FindWindow',
		'Keer.ui.selwin.Organization.FindWindow',
		'Keer.ui.core.Organization.User.FindWindow',
		'Keer.ui.core.Organization.Role.ChildContainer',
		'Keer.ui.core.Organization.ChildContainer',
		'Keer.ui.core.Organization.EditController'
	],
	//【混入功能】
	mixins: {
	},	
	config:{
		column: 2,
		addWidth: 0,
		addHeight: 0,
		labelWidth: 60,
		labelAlign: 'left',
		tabLayout: true,
		formConfig: {},
		appParams: {}
	},
	initConfig: function (config) {
		this.callParent(arguments);
	},
	initComponent: function(){
		Ext.apply(this,{
			title: '组织机构',
			cmdToolbar: [
				{text:'新增',itemId:'toolbar_add',iconCls:'add',iconAlign: 'left', privilege: 'ADD', hidden: true,editReady:'ready'},
				{text:'保存',itemId:'toolbar_save',iconCls:'save',iconAlign: 'left', privilege: 'EDIT',editEdit:'editing'},
				{text:'取消',itemId:'toolbar_cancel',iconCls:'cancel',iconAlign: 'left', privilege: 'EDIT', hidden: true},
				{text:'关闭',itemId:'toolbar_close',iconCls:'x-button-close',iconAlign: 'left'}
			],
			formFields : [
				{fieldLabel:'成员编号',name:'code',itemId:'code',dataIndex:'code',xtype:'textfield'},
				{fieldLabel:'成员名称',name:'name',itemId:'name',dataIndex:'name',xtype:'textfield'},
				{fieldLabel:'成员用户',name:'user',itemId:'user',dataIndex:'user',xtype:'widget-field-objecttrigger',xwindow:'ui-core-Organization-User-findwindow',allowBlank:false,displayField:'name'},
				{fieldLabel:'所属岗位',name:'post',itemId:'post',dataIndex:'post',xtype:'widget-field-objecttrigger',xwindow:'ui-selwin-Post-findwindow',allowBlank:true,displayField:'name'}
			]
		});
		var orgRole = Keer.systemvar.OrgRole;
		var useRole = Keer.systemvar.MemberRole;
		if (orgRole){
			this.formFields.shift();
			this.formFields.push({
				fieldLabel:'当前角色',
				name:'role',
				itemId:'role',
				dataIndex:'role',
				xtype:'widget-field-objecttrigger',
				xwindow:'ui-selwin-Role-findwindow',
				displayField:'name'
			});
			this.formFields.push({
				fieldLabel:'继承角色',
				name:'parentOrgRoles',
				itemId:'parentOrgRoles',
				dataIndex:'parentOrgRoles',
				xtype:'widget-field-collectionhidden',
				store: Ext.widget('Organization-store'),
				xcontainer:'ui-core-Organization-childcontainer'
			});
		}
		if (useRole){
			this.formFields.push({
				fieldLabel:'成员角色',
				name:'roles',
				itemId:'roles',
				dataIndex:'roles',
				mem:true,
				xtype:'widget-field-collectionhidden',
				store: Ext.widget('Role-store'),
				xcontainer:'ui-core-Organization-Role-childcontainer'
			});		
		}
		this.callParent(arguments);
	}
});