$(function(){
	var str = "Beringer贝灵哲庄园,Bollinger,Bodega Colome 佳乐美酒庄,Chanson Pere&Fils香颂家族,Ch.D'Esclans蝶之兰城堡,Clos De Los Siete鹰格堡,Chateau Gruaud-Larose金玫瑰城堡,Clarence Dillon克兰斯帝龙酒业,Champagne Laurent Perrier 罗兰百悦香槟,Chateau Cos-d'Estournel 爱士图尔庄园,Domaine Leroy 勒桦酒庄,E.Guigal吉佳乐世家,Flechas安第斯之箭,Freixenet菲斯奈特,Gabriel Meffre-Laurus月桂花冠,Ginestet 吉娜斯,Gaja嘉雅,InniskillinJoanneJackson-Triggs杰克逊瑞格酒庄,Laurent-Perrier罗兰百悦,Luce麓鹊,Louis Jadot路易亚都世家,LatourLaurus Cotes du Rhone Villages RougeLeeuwin Estate 露纹酒庄,LOUIS XIII 路易十三,Marchesi De Frescobaldi花思蝶,Michele Chiarlo迈克.基阿罗,Masi马西庄园,Mazzei马泽世家凤都城堡,Maison Trimbach 婷芭克世家酒庄,Non-exclusiveOpus One一号乐章酒园,Plump Jack澎湃庄园Penfolds奔富酒园,Robert Mondavi Winery蒙大菲酒园,Riscal瑞格尔,Ridgeside Winery维达尔,Rothschild Family罗斯柴尔德,Rupert&Rothschild ClassiqueStag's Leap 鹿跃酒窖,Saltram 索莱酒庄,Taylor'sWynns Coonawarra Estate酝思库纳瓦拉山庄,Wolfblass禾富庄园,Weingut Brundlmayer 布德梅尔酒庄";
	var arr = str.split(",");
	var oS = {};
	for(var i = 0;i < arr.length;i++){
		var firstW = arr[i].charAt(0);
		/*if(oS.join("").indexOf(firstW) == -1){
			oS.firstW = [];
		}*/
		oS[firstW] = [];
	}
	for(var i = 0;i < arr.length;i++){
		var firstW = arr[i].charAt(0);
		oS[firstW].push(arr[i]);
	}
	for(var k in oS){
		var a = $("<a></a>");
		a.html(k);
		a.css("margin-left","10px");
		$(".listD a").last().before(a);
	}
	function allBrand(){
		for(var k in arr){
			var a = $("<a></a>");
			a.html(arr[k]);
			$(".listDs").append(a);
		}
	}
	allBrand();
	$(".listD a:not('.last')").mouseover(function(){
		$(".listDs").html("");
		if($(this).html() == "所有品牌"){
			allBrand();
			$(this).addClass("hover").siblings().removeClass("hover");
		}else{
			for(var k in oS[$(this).html()]){
				var a = $("<a></a>");
				a.html(oS[$(this).html()][k]);
				$(".listDs").append(a);
			}
			$(this).addClass("hover").siblings().removeClass("hover");
		}
	})
	$(".listD a.last").click(function(){
		if($(this).html() == "更多"){
			$(this).html("收起");
		}else{
			$(this).html("更多");
		}
		$(".listDs").toggleClass("active");
	})
	
	
//	翻页
	var index = 0;
	var w = $(".box").outerWidth();
	var t = $(".box").offset().top;
	var page = $(".box .container").outerWidth()/$(".box").outerWidth();
	$(".pagination li.first").click(function(){
		$(".box .container").animate({"left":0});
		$(this).addClass("active").siblings().removeClass("active");
		index = 0;
		backListTop();
	})
	$(".pagination li.last").click(function(){
		var l = $(".box .container").outerWidth() - $(".box").outerWidth();
		$(".box .container").animate({"left":-l});
		$(this).addClass("active").siblings().removeClass("active");
		index = page - 1;
		backListTop();
		
	})
	$(".prev").click(function(){
		index--;
		if(index <= 0){
			$(".box .container").animate({"left":0});
			index = 0;
		}else{
			$(".box .container").animate({"left":-$(".box").outerWidth()*index});
		}
		$(".pagination li.num").eq(index).addClass("active").siblings().removeClass("active");
		backListTop();
	})
	$(".next").click(function(){
		index++;
		if(index >= page){
			$(".box .container").animate({"left":-w * (page-1)});
			index = page - 1;
		}else{
			$(".box .container").animate({"left":-$(".box").outerWidth()*index});
		}
		$(".pagination li.num").eq(index).addClass("active").siblings().removeClass("active");
		backListTop();
	})
	$(".pagination li.num").click(function(){
		index = $(this).children().html() - 1;
		$(".box .container").animate({"left":-$(".box").outerWidth()*index});
		$(this).addClass("active").siblings().removeClass("active");
		backListTop();
	})
	
	function backListTop(){
		$("body,html").animate({"scrollTop":t});
		$(".right .now").html(index+1);
	}
})
