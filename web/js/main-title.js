
function modifyPsw(){
window.location = 'main!showModifyPassword.action';
}

$(function(){
	//主导航滑块效果
	$(".nav").lavaLamp({
		fx: "backout", 
		speed: 700,
		click: function(event, daohangItem) {
			return true;
		}
	});
	//主导航文字变色效果
	$(".nav ul li").click(function(){
		$(".nav li.current").removeClass("current");
		$(this).addClass("current");
	});
	//图片新闻
	$("#KinSlideshow").KinSlideshow({
			moveStyle:"left",
			intervalTime:5,
			mouseEvent:"mouseover",
			titleFont:{TitleFont_size:12,TitleFont_color:"#fff"}
	});
	//折叠菜单
	var aMenuOneLi = $(".menu-one > li");
	var aMenuTwo = $(".menu-two");
	$(".menu-one > li > .header").each(function (i) {
		$(this).click(function () {
			if ($(aMenuTwo[i]).css("display") == "block") {
				$(aMenuTwo[i]).slideUp(300);
				$(aMenuOneLi[i]).removeClass("menu-show")
			} else {
				for (var j = 0; j < aMenuTwo.length; j++) {
					$(aMenuTwo[j]).slideUp(300);
					$(aMenuOneLi[j]).removeClass("menu-show");
				}
				$(aMenuTwo[i]).slideDown(300);
				$(aMenuOneLi[i]).addClass("menu-show")
			}
		});
	});
	
	$("#pInfo_more").toggle(
		function(){
			$(".jichu_moreb").addClass("jichu_morebb");
		},
		function(){
			$(".jichu_moreb").removeClass("jichu_morebb");
		}
	);
	
	setInterval(function(){
		with(new Date)
			$('#time').text(getFullYear()+"年"+(getMonth()+1)+"月"+getDate()+"日 星期"+"日一二三四五六".charAt(getDay())+" "+getHours()+":"+getMinutes()+":"+getSeconds());
		},
		1000);
		
	
	var html="<a class='dl' href='LoginAction.action'>登录</a> | ";
	if(loginname!=null && loginname!=""){
		html='<span> 当前用户:【<a href="LoginAction.action">'+loginname+'</a>】 | <a href="LogoutAction.action">注销</a> | ';
	}	
	html+='<a href=javascript:addfavorite(this,"http://10.69.56.129:8080/RZWeb/LoginAction","武汉烟草创新管理")>收藏本站</a>';
	$('#loginDiv').html(html);
	
	
	if(loginname!=null && loginname!=""){
//		showMessages();
//		var hm="<li class=dd-backgImg><a>消息提醒（5）</a>"+
//				"<ul class=dd-xiala>"+
//				"<li><a>金点子：3</a></li>"+
//				"<li><a>论文：2</a></li>"+
//				"</ul></li>";
//		$('#dd').html(hm);
	}else{
		$('#dds').html("");
	}

});

	//网页收藏
 function addfavorite(obj,url,title) { 
	  !url ? url = location.href : null;
	  !title ? title = document.title : null;
	  try{   //IE
	   		window.external.addFavorite(url, title); 
	  }catch(e){   
		   try{   // Firefox
		    window.sidebar.addPanel(title, url, ""); 
		   }catch(e){   
		    	alert("加入收藏失败，请使用Ctrl+D进行添加"); 
		   }   
	  }   
 }
	
	
//设置首页
function set_homepage(a, url) {
	var tip = '您的浏览器不支持此操作\n请使用浏览器的“选项”或“设置”等功能设置首页';
	if (/360se/i.test(window.navigator.userAgent)) {
	alert(tip);
	return false;
	}
	url = url || a.href;
	try {
	a.style.behavior = 'url(#default#homepage)';
	a.setHomePage(url);
	} catch(e) {
	alert(tip);
	}
	return false;
	}



	function showMessages(){
		$.ajax({
			url:'main!getMessageInfo.action',
			dataType:'json',
			type:'POST',
			timeout:30000,
			success:function(response,textStatus){
				var hm="";
				if(response.success){
					var rs=response.data;
					if(rs!=null && rs.length>0){
						hm="<li class=dd-backgImg><a style='color:red'>消息提醒["+response.totalCount+"]</a><ul class=dd-xiala>";
						for(var i=0;i<rs.length;i++){
							hm+="<li><a>"+rs[i].msgtype+" : "+rs[i].nums+"</a></li>";
						}
						hm+="</ul></li>";
					}
				}
				$('#dds').html(hm);
			}
		});
	}

//功能菜单
	function DropDown(el) {
		this.dd = el;
		this.placeholder = this.dd.children('span');
		this.opts = this.dd.find('ul.dropdown > li');
		this.val = '';
		this.index = -1;
		this.initEvents();
	}
	DropDown.prototype = {
		initEvents : function() {
			var obj = this;
	
			obj.dd.on('click', function(event){
				$(this).toggleClass('active');
				return false;
			});
	
			obj.opts.on('click',function(){
				var opt = $(this);
				obj.val = opt.text();
				obj.index = opt.index();
				obj.placeholder.text(obj.val);
			});
		},
		getValue : function() {
			return this.val;
		},
		getIndex : function() {
			return this.index;
		}
	}
	
	$(function() {
		var dd = new DropDown( $('#dd') );
		$(document).click(function() {
			// all dropdowns
			$('.wrapper-dropdown-3').removeClass('active');
		});
	
	});