$(function(){
	//固定底部
			$(".fixB a").click(function(){
				$(".fixB").css("display","none");
			})
			
			$("#registerBtn").click(function(){
				var reg = /^1\d{10}$/;
				if(!reg.test($("#username").val())){
					$("#username").nextAll("p").first().addClass("active").html("手机号格式不正确");
					return false;
				}else{
					$("#username").nextAll("p").first().removeClass("active").html("");
				}
				if($("#checkcode").val() != "1314"){
					console.log($("#checkcode").val());
					$("#checkcode").next().addClass("active").html("你输入的验证码不正确");
					return false;
				}else{
					$("#checkcode").next().removeClass("active").html("");
				}
				if($("#pas").val() == ""){
					$("#pas").next().addClass("active").html("密码不能为空");
					return false;
				}else if($("#pas").val() != $("#repas").val()){
					$("#repas").next().addClass("active").html("密码不一致");
					return false;
				}else{
					$("#pas").next().removeClass("active").html("");
					$("#repas").next().removeClass("active").html("");
				}
				regist();
				
//				return true;
			})
			
			$("form .getcode").click(function(){
				$("#phone").val($("#username").val());
				$(".registerPop").show();
			})
			
			$(".registerPop .top a").click(function(){
				$(".registerPop").hide();
			})
			$(document).keydown(function(e){
				if(e.keyCode == 27){
					$(".registerPop").hide();
				}
			})
			
			$.idcode.setCode();   //加载生成验证码方法
			$(".registerPop .content button").click(function(){
				var reg = /^1\d{10}$/;
				if($("#phone").val() == ""){
					alert("请输入手机号码。");
					return false;
				}else if(!reg.test($("#phone").val())){
					alert("手机号码格式不正确。");
					return false;
				}
				if($("#Txtidcode").val() == ""){
					alert("请输入识别码。");
					return false;
				}
				var IsBy = $.idcode.validateCode()  //调用返回值，返回值结果为true或者false
		        if(IsBy){
//		            alert("识别码输入正确");
		        }else {
		            alert("请重新输入识别码");
		            return false;
		        }
		        alert("手机验证是：1314");
				$(".registerPop").hide();
				return true;
			})
			
			function regist(){
				console.log(123);
				$.get("http://datainfo.duapp.com/shopdata/userinfo.php",{"status":"register","userID":$("#username").val(),"password":$("#pas").val()},function(res,status,xhr){
					if(res == 0){
						alert("用户已存在");
						return false;
					}else if(res == 2){
						alert("出错了，请再稍后再试");
						return false;
					}else{
//						alert("注册成功");
						setTimeout(function(){
							window.location.href = "login.html";
						},1000);
						
						return true;
					}
				})
			}
})
