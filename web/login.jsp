<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>科尔创新协同管理平台-用户登录</title>
	<link href="css/all.css" rel="stylesheet" type="text/css" />
	<link href="css/load.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="js/jquery.cookie.js"></script>
	<script type="text/javascript">
	$(function(){
		$('#username').focus();		
		var login = function(){
			if($("#username").val() == ""){
				alert("请输入用户名！");
				$("#username").focus();
				return;
			}
			if($("#password").val() == ""){
				alert("请输入密码！");
				$("#password").focus();
				return;
			}
			var username = $("#username").val();
			var password = $("#password").val();
			var param = '&username=' + username + '&password=' + password;
			$('#error').hide();
			$('#msg').html("请稍候，正在检测用户合法性......");
			$('#msg').show();
			$.post('LoginAction!verify.action',param,
				function(data){
					result = data;
					if(result.success == true){
						$('#msg').html("登录成功，正转向首页......");
						window.location.href = "LoginAction";
						return;          	
		            }else{
		            	$('#msg').hide();
		            	$('#error').html(result.message);
		            	$('#error').show();
						$('#username').select();
		            }
				}
			);
		};
		$('#login').click(login);
		$(document).keydown(function(e){
				if(e.keyCode == 13) {
					login();
				}
		});
	});	
	</script>
</head>
  <div class="bg1024">
     <div class="name"><img src="images/name_03.png"/></div>
     <div class="cont">
        <div class="left_img"><img src="images/limg_03.png"/></div>
        <div class="right_form">
           <form class="for">
           <ul>
             <li>
               <p class="f1">用户名：</p>
               <p class="f3">
                  <input class="input_218" id="username" type="text" />
               </p>
             </li>
              <li>
               <p class="f1">密&nbsp;&nbsp;码：</p>
               <p class="f3">
                  <input  class="input_218" id="password" name="password" type="password" />
               </p>
             </li>
           </ul>
           <div class="safe">
              <span class="safe-login">
                <input type="checkbox"/>
                <label>记住用户名<span><a href="#">忘记密码</a></span></label>
              </span>
           </div>
           <div class="butt">
              <a id="login"></a>
              <div style="color:red;text-align:center; font-size:12px;" id="error"></div>
           	  <div style="color:green;text-align:center; font-size:12px;" id="msg"></div>
           </div>
        </form>
        </div>
     </div>
  </div>
</body>
</html>
