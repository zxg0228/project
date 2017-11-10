function head(elem){
	if(getCookie() != false){
		elem.find(".right li:first-of-type").html(getCookie()+"用户，您好！");
	}
	
	elem.find(".right li").mouseenter(function(){
		var u = $(this).children("ul");
		u.show();
		u.parent().css("background-color","#fff");
	}).mouseleave(function(){
		var u = $(this).children("ul");
		u.hide();
		u.parent().css("background-color","");
	})
}
function logo(elem){
	//跨域搜索
	elem.find("#searchInput").keyup(function(){
		var $v = $(this).val();
			$.ajax({
				type:"get",
				url:"https://suggest.taobao.com/sug?code=utf-8&q=" + $v,
				async:true,
				dataType:"jsonp",
				success:function(res){
					console.log(res)
					var d = res["result"];
					elem.find(".listShow").empty();
					elem.find(".listShow").show();
					$.each(d,function(i,v){
						console.log(v)
						var $p = $("<p>");
						$p.html(v[0]);
						elem.find(".listShow").append($p);
					});
				}
			});
	}).blur(function(){
		elem.find(".listShow").hide();
	})
	
	elem.find(".cart").mouseenter(function(){
		$(this).children("div").slideDown(300);
	}).mouseleave(function(){
		$(this).children("div").slideUp(300);
	})
}
function na(elem){
	elem.find(".first").mouseover(function(){
		$(this).children(".nav2").show();
		elem.parent().next().show();
	}).mouseout(function(){
		$(this).children(".nav2").hide();
		elem.parent().next().hide();
	})
	elem.find(".nav2 li").mouseover(function(){
		$(this).siblings().find("span").hide();
		$(this).find("span").show();
		$(this).children(".nav3").show();
	}).mouseout(function(){
		$(this).children(".nav3").hide();
	})
}


function getCookie(){
	var start=0;
	var end=0;
	if(document.cookie.indexOf("username=")!=-1){
		start=document.cookie.indexOf("username=");		
		end=document.cookie.indexOf(";",start);	
		if(end==-1){	end=document.cookie.lenght;	}
	   return document.cookie.substring(start+"username".length+1,end);
	}
	return false;
}


