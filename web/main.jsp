<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <%--<title>科尔创新平台演示</title>--%>
	  <title>玩艺汇管理端</title>
    <%--<link rel="stylesheet" type="text/css" href="application/ext/packages/ext-theme-neptune/build/resources/ext-theme-neptune-all-debug.css"/>--%>
 	<link rel="stylesheet" type="text/css" href="resources/css/TabScrollerMenu.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/ext-icon.css"/>
	<link rel="stylesheet" type="text/css" href="resources/css/ext-patch.css"/> 
	  
    <link rel="stylesheet" type="text/css" href="application/ext/packages/ext-theme-classic/build/resources/ext-theme-classic-all-debug.css"/>
	<link rel="stylesheet" type="text/css" href="resources/css/TabScrollerMenu.css" />
	<link href="css/all.css" rel="stylesheet" type="text/css" />
	<link href="css/top.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="resources/css/ext-patch.css"/>
	<link rel="stylesheet" type="text/css" href="resources/css/ext-icon.css"/> 
	<style type="text/css">
	.x-item-readonly {
  		filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=75);
  		opacity: 0.75;
	}	
	.nav-list {
	    padding: 0 3px 0 3px;
	}
	.nav-list-item {
	    margin-top: 3px;
	    padding-left: 20px;
	    font-size: 11px;
	    line-height: 20px;
	    cursor: pointer;
	    background: url(resources/css/icons/feed.png) no-repeat 0 2px;
	    border: 1px solid #fff;
	}
	.nav-list .x-item-selected {
	    font-weight: bold; 
	    color: #15428B;
	    background-color: #DFE8F6;
	    border: 1px dotted #A3BAE9;
	}
	.nav-list-item-hover {
	    background-color: #eee;
	}
	.x-tree-icon-parent {
	  width: 16px;
	  background-image: url(resources/css/icons/play_blue.png);
	}

	.x-grid-tree-node-expanded .x-tree-icon-parent {
	  background-image: url(resources/css/icons/reverse_blue.png);
	}
	
	</style>
    <script type="text/javascript" src="js/ajax-pushlet-client.js"></script>
    <script type="text/javascript" src="js/jquery-1.7.2.min.js" ></script>
    <script type="text/javascript" src="application/ext/ext-all-dev.js"></script>
    <script type="text/javascript" src="application.js"></script>
	<script type="text/javascript" src="resources/local/ext-lang-zh_CN.js"></script>
	<script type="text/javascript">
		var loginname="${loginname}";
		var rolename="${rolename}";
		var postname="${postname}";
		var Keer = {
			systemvar : ${systemvar},
			loginuser : ${loginuser},
			enumstore: {}
		};
	</script>
</head>
<body style="background:#FFFFFF" >
		<div id="top-minimenu" class="bg">
			<div class="logo"><img src="images/logo_01.gif"/></div>
			<div class="nav">
		       <ul>
		         <li class="li1"><a href="#"></a></li>
		         <li class="li2"><a href="#"></a></li>
		         <li class="li3"><a href="#"></a></li>
		         <li class="li4"><a href="#"></a></li>
		         <li class="li5"><a href="#"></a></li>
		         <li class="li6"><a href="#"></a></li>
		         <li class="li7"><a href="#"></a></li>
		       </ul>
    		</div>
    		<div class="top_help">
		      <div class="h_top"><a href="#">帮助</a> | <a href="#">关于</a> |<a href="#"> 退出</a></div>
		      <div class="xx"><em>用户名</em><span>消息</span><b>15</b></div>
    		</div>
		</div>
</body>
</html>
