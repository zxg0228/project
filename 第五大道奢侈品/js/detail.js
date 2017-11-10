$(function(){
//	放大镜
	$(".jqzoom").jqueryzoom({
		xzoom: 400, //放大图的宽度(默认是 200)
        yzoom: 400, //放大图的高度(默认是 200)
        offset: 10, //离原图的距离(默认是 10)
        position: "right", //放大图的定位(默认是 "right")
        preload: 1
	});
	
//	切换图片
	$(".good .imgList li").click(function(){
		var s = $(this).children().attr("src");
		console.log(s);
		$(".good .jqzoom img").attr({"src":s,"jqimg":s});
		$(".good .good_left a").attr("href",s);
	})
	
//	左右切换
	$(".good .prev").click(function(){
		console.log(123,parseInt($(".good .imgList").css("left")));
		if(parseInt($(".good .imgList").css("left")) >= -120){
			$(".good .imgList").stop(true,true).animate({left:'-=20px'});
		}
		
	})
	$(".good .next").click(function(){
		console.log(123,parseInt($(".good .imgList").css("left")));
		if(parseInt($(".good .imgList").css("left")) < 0){
			$(".good .imgList").stop(true,true).animate({left:'+=20px'});
		}
		
	})
	
	$(".price>a").hover(function(){
		$(this).next().show();
	},function(){
		$(this).next().hide();
	})
	
	$(".price .right").hover(function(){
		$(this).children("img").slideDown();
	},function(){
		$(this).children("img").slideUp();
	})
	
	$(".good_right .activity div:last-of-type").click(function(){
		$(this).parent().toggleClass("active");
	})
	
	$(".good .good_right .reduce").click(function(){
		if(parseInt($(this).next().val() - 1) > 0){
			$(this).next().val(parseInt($(this).next().val())-1);
		}else{
			alert("所选商品数量不能小于1");
		}
	})
	$(".good .good_right .add").click(function(){
		$(this).prev().val(parseInt($(this).prev().val())+1);
	})
	
	
//	菜单吸顶
	var oT = $(".tab").offset().top;
	$(window).scroll(function(){
		if($(this).scrollTop() >= oT){
			$(".tab").addClass("active");
			$(".tab .container").children().addClass("active");
		}else{
			$(".tab").removeClass("active");
			$(".tab .container").children().removeClass("active");
		}
	})
	
//	tab切换
	$(".tab .tab_right li").click(function(){
		$(this).css("color","#C8A985").siblings().css("color","");
		$(".goodContent .goodContent_right .show").eq($(this).index()).show().siblings().hide();
		$("body").animate({"scrollTop":oT-5});
	})
	
//	轮播
	$('#dowebok').pogoSlider({
		targetWidth:870,
		targetHeight:315,
		autoplayTimeout:2000,
		displayProgess:false,
		slideTransition:"fade"
	});
	$('#slides').slides({
		effect: 'slide',
        auto: false
	});
	
	
	$('.weima').qrcode({
        text: window.location.href,//二维码代表的字符串（本页面的URL）
        width: 128,//二维码宽度
        height: 128//二维码高度
    });
    $(".tab .right_buy").hover(function(){
    	$(this).children("div").show();
    },function(){
    	$(this).children("div").hide();
    })
    
    
    //跨域取评论
    var $ul = $(".goodContent .goodContent_right .assess ul");
    $.ajax({
		type:"get",
		url:"https://club.jd.com/discussion/getProductPageImageCommentList.action?productId=1085328",
		async:true,
		dataType:"jsonp",
		success:function(res){
			console.log(res)
			var imgComments = res["imgComments"];
			var imgList = imgComments["imgList"];
			$ul.empty();
			$.each(imgList,function(i,v){
				console.log(v,v["commentVo"]);
				var com = v["commentVo"];
				var $li = $("<li></li>");
				var $left = $("<div class='left'>");
				var $lImg = $("<img src='http://"+ com["userImageUrl"] +"' />");
//				var $lImg = $("<img src='img/head.jpg' />");
				var $lP = $("<p></p>");
				$lP.html(com["nickname"]);
				$left.append($lImg);
				$left.append($lP);
				$li.append($left);
				
				var $right = $("<div class='right'></div>");
				var $rP = $("<p></p>");
				$rP.html(com["content"]);
				var $rL1 = $("<label>"+ com["productColor"] +"</label>");
				var $rL2 = $("<label>"+ com["productSize"] +"</label>");
				var $rL3 = $("<label>"+ com["creationTime"] +"</label>");
				var $rL4 = $("<label>"+ com["userClientShow"] +"</label>");
				$right.append($rP).append($rL1).append($rL2).append($rL3).append($rL4);
				$li.append($right);
				
				$ul.append($li);
			});
		}
	});
    
})
