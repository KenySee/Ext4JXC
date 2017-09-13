function showLoginName(st){
	var con=$("#con");
	var urs="main!searchLoginNames.action?username="+encodeURI(encodeURI(st.value));
	
 	ajaxs(st,con,urs);
}
//自动补全
var backValue="";
function ajaxs(st,con,urs){
			
			con.hide();
		if(st.value==""||st.value==null){
			con.hide();
		}else{
			$.ajax({
				url:urs,
				dataType:'json',
				type:'POST',
				timeout:30000,
				success:function(response,textStatus){
					var hm="";
					if(response.success){
						var rs=response.data;
						if(rs!=null && rs.length>0){
							for(var i=0;i<rs.length;i++){
								var name=rs[i].name;
								var loginname=rs[i].loginname;
								hm=hm+"<li id='lab"+i +"' onmouseover='colorChange(this)' onmouseout='colorBack(this)' onclick='cont(this)' style='font-size:16px;cursor:default;'>"+name+"["+loginname+"]"+"<label id='lab"+i +"id' style='display:none'>"+loginname+"</label></li>";
							}
						}
					}
					con.html(hm);
					con.show();
				}
			});
		}
	}
function colorChange(la){	
	la.style.backgroundColor="#CCCCCC";
	la.style.width="288px";
	
}
function colorBack(la){
	la.style.backgroundColor="white";
}

function cont(la){
	//$("#username").val(la.innerHTML);
	var a=la.id+"id";
	//var va=$("#"+a).html();
	$("#username").val($("#"+a).html());
	$("#con").hide();
}	

var userWindow=null;
var userTreePanel=null;
function selectUserInfo(){
	var treeStore=Ext.create('Ext.data.TreeStore', {
		 fields:[  
             {name:'id',type:'string'},  
             {name:'name',type:'string'},  
             {name:'leaf',type:'boolean'},
             {name:'user'},
             {name:'sortno'},
             {name:'data',type:'object'}
        ],
        sorters:[{property : 'sortno',direction : 'ASC'}],
	    proxy:{
	    	type:'ajax',
	    	url:"main!findOrganizationInfo.action",
	    	reader : {
			    type: 'json',
			    root: 'data',
			    idProperty: 'id',
			    totalProperty: 'totalCount',
			    successProperty: 'success'
			},
	    	root:{
	    		id: -1,  
	            expanded: true,
	            draggable:false
	    	}
	    }
	 });
	
	userTreePanel=Ext.create('Ext.tree.Panel',{
	    width: 200,
	    height: 150,
	    folderSort : true,
	    displayField:'name',
	    store: treeStore,
	    rootVisible: false,
	    listeners:{'itemdblclick':onDbclickInfo}
	});
	
	userWindow=Ext.create('Ext.window.Window',{
			title:'选择登录用户',
			closeAction: 'hide',
			height:500,
			width:300,
			layout:'fit',
			buttonAlign: 'center',
			plain: true,
			modal: true,
			items:[userTreePanel],
			buttons:[
				{text:'确认',handler:onSelectUser},
				{text:'关闭',handler:onCloseWin}
			]
		});
}
function onShowUserWindow(){
	if(userWindow==null){
		selectUserInfo();
	}
	userWindow.show();
}

function onSelectUser(){
	var records=userTreePanel.getSelectionModel().getSelection();
	if(records!=null && records.length>0){
		var user=records[0].get('user');
		if(user!=null && user.name!=null && user.loginname!=null){
			$("#username").val(user.loginname);
			userWindow.hide();
		}
		
	}
}
function onDbclickInfo(t,record,item,index,e,o){
	var user=record.get('user');
	if(user!=null && user.name!=null && user.loginname!=null){
		$("#username").val(user.loginname);
		userWindow.hide();
	}
}
function onCloseWin(){
		userWindow.hide();
}

