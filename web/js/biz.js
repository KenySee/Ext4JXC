
	
$(function(){
	
	$("#select-year").change(function(){
		var year = $("#select-year option:selected" ).val();
		window.location = 'main!statistics.action?year='+year;
	});
	
	$("#supperMore").click(function(){
		var limit = $("#limit").val();
		var totalCount = $("#totalCount").val();
		if(parseInt(limit) <= (parseInt( totalCount)+3)){
			limit = $("#limit").val();
			window.location = 'main!showInnovationResult.action?limit='+limit;
		}else
		{
			$("#supperMore").html('加载完毕');
		}
		
	});
	
	$("#submitQuestionnaire").click(function(){
		if($("input[name='answerIds']").is(":checked") ||$("radio[name='answerIds']").is(":checked") ){
			//alert('正在提交问卷!');
			var r=confirm("你要提交调查问卷吗?");
		     if (r==true)
		     {
		     	 return true;
		     }
		     else
		     {
		    	 return false;
		     }
		}
		else
		{
			alert('请选择正确的结果!');
			return false;
		}
	});
	
	
});


function downfile(filename){
	if(filename!=null && !filename==""){
		//window.open(filename);	
		window.location.href = filename;
	}
}

function downfileByZip(innovationId)
{
	window.location = 'main!downfileByZip.action?innovationId='+innovationId;
}


function pageTo(page)
{
	window.location = 'main!showInnovationMoreList.action?currentPage='+page;
}

/*function getDownLoadSwfFile(id)
{
	window.location = 'main!getDownLoadSwfFile.action?id='+id;
}*/




