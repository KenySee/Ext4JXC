	$(function(){
		var html=' 当前用户:【'+loginname+'】 '; 	
		if(postname!=null && postname!=""){
			html+='【'+postname+'】';
			html+=' <a href="javascript:onShowPostWin()">切换岗位</a> ';
		}else{
			html+='【岗位未设置】';
		}
		html+='| <a href="javascript:onShowPassWin();">修改密码</a>  |  <a href="LogoutAction.action">注销</a> ';
		$('#loginDiv').html(html);
		
		onCreatePassWin();
		onCreatePostWin();
	});
		
	
	//网页收藏
 function addfavorite(obj,url,title) { 
  !url ? url = location.href : null;
  !title ? title = document.title : null;
  try{   
   window.external.addFavorite(url, title); 
  }catch(e){   
   try{   
    window.sidebar.addPanel(title, url, ""); 
   }catch(e){   
    alert("加入收藏失败，请使用Ctrl+D进行添加"); 
   }   
  }   
 }

	var formPanel=null;
	var passWin=null;
	var postWin=null;
	var postGridPanel=null;
	function onCreatePassWin(){
		formPanel=Ext.create('Ext.form.Panel',{
			 region: 'center',
			 layout: 'anchor',
			 defaults: {
	       		 anchor: '97%',
	       		 labelWidth: 60
	   		 },
	   		  bodyPadding: 5,
	   		  defaultType: 'textfield',
	   		  items:[
	   		  	{itemId:'id',xtype:'hidden',name:'id'},
	   		  	{fieldLabel:'用户名称',itemId:'name',name:'name',readOnly:true},
	   		  	{fieldLabel:'登陆名称',itemId:'loginname',name:'loginname',readOnly: true},
	   		  	{fieldLabel:'登陆密码',itemId:'password',name:'password',inputType:'password',allowBlank:false},
	   		  	{fieldLabel:'确认密码',itemId:'passwordTwo',name:'passwordTwo',inputType:'password',allowBlank:false}
	   		  ]
		});
	
		passWin=Ext.create('Ext.window.Window',{
			title:'用户登陆密码修改',
			closeAction: 'hide',
			height:210,
			width:400,
			layout:'fit',
			buttonAlign: 'center',
			plain: true,
			modal: true,
			items:[formPanel],
			buttons:[
				{text:'修改',handler:onSavePass},
				{text:'关闭',handler:onCloseWin}
			]
		});
	}
	
//	function onCreatePassWin() {
//			formPanel = Ext.create('Ext.form.Panel', {
//				region : 'center',
//				layout : 'anchor',
//				defaults : {
//					anchor : '97%',
//					labelWidth : 60
//				},
//				bodyPadding : 5,
//				defaultType : 'textfield',
//				items : [{
//							fieldLabel : '原密码',
//							itemId : 'oldPassword',
//							name : 'oldPassword',
//							blankText:'请输入原密码',
//							inputType : 'password',
//							allowBlank : false
//						}, {
//							fieldLabel : '新密码',
//							itemId : 'newPassword',
//							name : 'newPassword',
//							blankText:'请输入新密码',
//							inputType : 'password',
//							allowBlank : false
//						}, {
//							fieldLabel : '确认密码',
//							itemId : 'confirmPassword',
//							name : 'confirmPassword',
//							inputType : 'password',
//							allowBlank : false
//						}]
//			});
//		
//			passWin = Ext.create('Ext.window.Window', {
//						title : '用户登陆密码修改',
//						closeAction : 'hide',
//						height : 160,
//						width : 300,
//						layout : 'fit',
//						buttonAlign : 'center',
//						plain : true,
//						modal : true,
//						items : [formPanel],
//						buttons : [{
//									text : '修改',
//									handler : onSavePass
//								}, {
//									text : '关闭',
//									handler : onCloseWin
//								}]
//				});
//		
//		
//	}
		
		
	function onCreatePostWin(){
		var store=Ext.create('Ext.data.Store',{
			fields:[
				{name:'id'},
				{name:'memberName'},
				{name:'postName'},
				{name:'isBoo',type:'boolean'}
			],
			proxy: {
		         type: 'ajax',
		         url: 'LoginAction!getAllUserMemberInfo.action',
		         reader: {
		             type: 'json',
		             root: 'data'
		         }
		     }
     		//autoLoad: true
			
		});
		var columns=[
			{xtype: 'rownumberer'},
			{header:'用户成员',dataIndex:'memberName',width:150},
			{header:'所属岗位',dataIndex:'postName'}
		];
		postGridPanel=Ext.create('Ext.grid.Panel',{
			region:'center',
			store:store,
			columns:columns,
			forceFit : true,
			viewConfig:{
				getRowClass:function(record,index,p,ds) {
					if(record.get('isBoo')){
						return 'mystyle-row';
					}
				}
			}
		});
		
		postWin=Ext.create('Ext.window.Window',{
			title:'用户岗位切换',
			closeAction: 'hide',
			height:400,
			width:300,
			layout:'fit',
			buttonAlign: 'center',
			plain: true,
			modal: true,
			items:[postGridPanel],
			buttons:[
				{text:'确定',handler:onConfirmPost},
				{text:'关闭',handler:onClosePostWin}
			]
		});
	
	}
	
	function onShowPostWin(){
		postGridPanel.getStore().removeAll();
		postGridPanel.getStore().load();
		postWin.show();
	}
	
	function onConfirmPost(){
		var record = postGridPanel.getSelectionModel().getLastSelected();//获取最后选中的记录
		if(record){
			if(!record.get('isBoo')){
				Ext.Msg.confirm('提示','是否切换到【'+record.get('postName')+'】岗位上?',function(op){
					if(op=='yes'){
						doConvertPost(record);
					}
				})
			}else{
				Ext.Msg.alert('提示','您所选择的岗位与当前岗位相同,无需切换!')
			}
		}else{
			Ext.Msg.alert('提示','请先选择要切换的岗位!');
		}
	}
	
	function doConvertPost(record){
		var mask = new Ext.LoadMask(gridPanel,{msg:"请稍候，正在切换用户岗位......"});
		mask.show();
		Ext.Ajax.request({
			url:'LoginAction!doConvertPost.action',
			method:'POST',
			params:{'userMemberId':record.get('id')},
			success:function(response){
				mask.hide();
				var result = Ext.decode(response.responseText);
				if(result.success){
					window.location.href="LoginAction.action";
				}else{
					Ext.Msg.alert('错误',result.message);
				}
			}
		
		})
	}
	
	
	function onShowPassWin(){
		formPanel.getForm().reset();
		passWin.show();
		formPanel.getForm().load({
			url:'LoginAction!findloginuser.action',
			waitMsg: '请稍候，数据正加载中......',
			method:'POST',
			success:function(form, action){
			
			},
			failure: function(form, action) {
       				 Ext.Msg.alert("数据加载错误", action.result.errorMessage);
    		}
		});
	}
//	function onSavePass() {
//		var form = formPanel.getForm();
//		var p1 = form.findField("confirmPassword").getValue();
//		var p2 = form.findField("newPassword").getValue();
//		if (form.isValid()) {
//			if (p1 != p2) {
//				Ext.Msg.alert('提示', '密码输入不一致!');
//				return;
//			}
//			form.submit({
//						url : 'UserAction!changePWD.action',
//						method : 'POST',
//						waitMsg : '请稍候，正在更新数据......',
//						success : function(form, action) {
//							Ext.Msg.alert('提示', '密码修改成功!');
//							passWin.hide();
//						},
//						failure: function(form ,action){
//							Ext.Msg.alert('错误', '<nobr>'+ action.result.message +'</nobr>');
//						}
//					});
//		} else {
//			Ext.Msg.alert('提示', '请输入登陆密码!');
//		}
//	}


	function onSavePass(){
		var form=formPanel.getForm();
		var p1=form.findField("password").getValue();
		var p2=form.findField("passwordTwo").getValue();
		if(form.isValid()){
			if(p1!=p2){
				Ext.Msg.alert('提示', '密码输入不一致!');
				return;
			}
			form.submit({
				url:'LoginAction!saveUserLoginPass.action',
				method:'POST',
				waitMsg: '请稍候，正在更新数据......',
				success:function(form,action){
					Ext.Msg.alert('提示','密码修改成功!');
					passWin.hide();
				},
				failure: function(form, action) {
       				 Ext.Msg.alert("更新数据错误", action.result.errorMessage);
    			}
			});
		}else{
			Ext.Msg.alert('提示','请输入登陆密码!');
		}
	}
	function onCloseWin(){
		passWin.hide();
	}
	
	function onClosePostWin(){
		postWin.hide();
	}


