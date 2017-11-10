function sider(elem){
	elem.children("ul").children("li").mouseover(function(){
		$(this).children("div").show();
	}).mouseout(function(){
		$(this).children("div").hide();
	})
	var flag = true;
	elem.children(".siderT").children("li").first().click(function(){
		if(flag){
			elem.animate({"right":0},500);
			flag = false;
		}else{
			elem.animate({"right":-298},500);
			flag = true;
		}
		
	})
	elem.children(".siderB").children("li").last().click(function(){
		$("body,html").animate({"scrollTop":0},500);
	})
	elem.find(".cart div a").click(function(){
		elem.animate({"right":-298},500);
	})
	
	elem.find(".login").click(function(){
		elem.find(".loginPop").show();
	})
	elem.find(".feed").click(function(){
		elem.find(".feedback").show();
	})
	
	elem.find(".pop .top a").click(function(){
		elem.find(".pop").hide();
	})
	$(document).keydown(function(e){
		if(e.keyCode == 27){
			elem.find(".pop").hide();
		}
	})
	
	elem.find(".loginPop form").submit(function(){
		if($(this).children("input").eq(0).val() == ""){
			$(this).children("input").eq(0).prev().prev().css("color","red").html("*用户名不能为空");
			return false;
		}else{
			$(this).children("input").eq(0).prev().prev().css("color","red").html("");
		}
		if($(this).children("input").eq(1).val() == ""){
			$(this).children("input").eq(1).prev().prev().css("color","red").html("*密码不能为空");
			return false;
		}else{
			$(this).children("input").eq(1).prev().prev().css("color","red").html("");
		}
		return true;
	})
	
	elem.find(".feedback form").submit(function(){
		var reg = /^1\d{10}$/;
		if(!reg.test($(this).children("input").last().val())){
			alert("手机号不正确");
			return false;
		}
		return true;
	})
	
	elem.find(".feedback form>input").blur(function(){
		$(this).css("background-color","#D5D5D5");
	}).focus(function(){
		$(this).css("background-color","#fff");
	})
}
