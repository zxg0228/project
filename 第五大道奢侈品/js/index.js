
$(function(){
	//固定底部
	$(".fixB a").click(function(){
		$(".fixB").css("display","none");
	})
	
	
	$(".brand .flagship").mouseenter(function(){
		$(this).find(".container").animate({"top":0},300);
	}).mouseleave(function(){
		$(this).find(".container").animate({"top":100},300);
	})
	
	$(".brand .hot .border_animation").mouseenter(function(){
		$(this).addClass("hover");
		$(this).children(".cover").fadeIn(300);
	});
	$(".brand .hot .border_animation").mouseleave(function(){
		$(this).removeClass("hover");
		$(this).children(".cover").fadeOut(300);
	});
	
	$("#slides").slides({
		effect: 'slide',
        auto: false
	});
	
	$(".items .pagers .pager").first().css({"background-color":"#000","color":"#fff"});
	$(".items .pagers .pager").mouseover(function(){
		$(this).css({"background-color":"#000","color":"#fff"});
		$(this).siblings().css({"background-color":"","color":""});
		var w = $(".items .banner1 .slider").width();
		$(".items .banner1 .wrap").animate({"left":-$(this).index() * w});
	})
	$(".items .banner1 .slider .right .anima").mouseenter(function(){
		$(this).children(".title").stop(false,true);
		$(this).children(".img_content").stop(false,true);
		var tl = parseInt($(this).children(".title").css("left"));
		$(this).children(".title").animate({"left":tl-20});
		var il = parseInt($(this).children(".img_content").css("left"));
		$(this).children(".img_content").animate({"left":il+20});
	}).mouseleave(function(){
		$(this).children(".title").stop(false,true);
		$(this).children(".img_content").stop(false,true);
		var tl1 = parseInt($(this).children(".title").css("left"));
		$(this).children(".title").animate({"left":tl1+20});
		var il1 = parseInt($(this).children(".img_content").css("left"));
		$(this).children(".img_content").animate({"left":il1-20});
	})
	
	
	$(".mall .shopping .container").slides({
		effect: 'slide',
        auto: false
	});
	
	
	$(".promotion .border_animation").mouseenter(function(){
		$(this).addClass("hover");
		console.log("img/" + ($(this).index()+1) + "bank.jpg");
		$(".promotion .show img").attr("src","img/" + ($(this).index()+1) + "bank.jpg");
	});
	$(".promotion .border_animation").mouseleave(function(){
		$(this).removeClass("hover");
		
	});
})

