$(function(){
	//固定底部
			$(".fixB a").click(function(){
				$(".fixB").css("display","none");
			})
			
//			表单验证
			$("#loginBtn").click(function(){
				if($("#username").val() == ""){
					$("#username").next().addClass("active").html("用户名不能为空.");
					return false;
				}else{
					$("#username").next().removeClass("active").html("");
				}
				if($("#pas").val() == ""){
					$("#pas").next().addClass("active").html("密码不能为空.");
					return false;
				}else{
					$("#pas").next().removeClass("active").html("");
				}
				login();
				return true;
			})
			
			
			function login(){
				console.log("login");
				$.get(" http://datainfo.duapp.com/shopdata/userinfo.php",{"status":"login","userID":$("#username").val(),"password":$("#pas").val()},function(res,status,xhr){
					if(res == 0){
						alert("用户不存在");
						return false;
					}else if(res == 2){
						alert("用户名密码不符");
						return false;
					}else{
//						alert("登录成功");
						setCookie($("#username").val(),$("#pas").val());
						setTimeout(function(){
							window.location.href = "index.html";
						},1000);
						
						return true;
					}
				})
			}
			
			function setCookie(username,pwd){
				var cookieText="username="+username + ";password=" + pwd;
				document.cookie=cookieText;	
			}

})
