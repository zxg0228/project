function Slider(opt){
    			var elem=opt.dom;  //每个slider 最大的div
    			var sliders= elem.getElementsByClassName("slider")//所有的幻灯片    
    			var index=1;//默认第几张显示
    			var wrap = elem.getElementsByClassName("wrap")[0];//包裹起 left定位
    			var interId=null;//停止间隔调用
    			var pre=null;//上一张
    			var next=null;//下一张
    			var pagerItems=null;//123456
    			var sliderLen=sliders.length;
    			
    			if(opt.default){
    				index=opt.default+1;
    			}
		
    			init();//默认初始化一次
    			function init(){    				
    				
    				renderDom();//渲染html
    				bindDom();// 添加事件
    				auto();//自动
				    goSlider(index);
    			}
    			function renderDom(){
//    				渲染页面
					wrap.style.width=sliders[0].offsetWidth*(sliderLen+2)+"px";
					wrap.style.height=sliders[0].offsetHeight+"px";
					wrap.style.position="absolute";
					//设置wrap的宽高
					
					var preNext=document.createElement("div");
					preNext.className="preNext";					
					preNext.innerHTML='<div class="pre"></div><div class="next"></div>'
					elem.appendChild(preNext);
					//创建上一张下一张
					pre=elem.getElementsByClassName("pre")[0];
					next=elem.getElementsByClassName("next")[0];
					// 当插入到页面中 开始重新更新 pre next 上一张下一张变量
					
					if(!opt.showPre){
						preNext.style.display="none";	
					}// 如果有参数是去掉上一张 就none
					
					var pagers =document.createElement("div");
					pagers.className="pagers";
					var s="";
					for(var i=0;i<sliderLen;i++){
						s +="<span class='pager'></span>";
					}
					pagers.innerHTML=s;
					elem.appendChild(pagers);
					// 创建 1 2 3 4 5 
					pagerItems =elem.getElementsByClassName("pager");
					// 更新 12345 变量
					var last=sliders[sliderLen-1].cloneNode(true);
					var first=sliders[0].cloneNode(true);
					wrap.appendChild(first);
					wrap.insertBefore(last,sliders[0])

					
    			}
    			function bindDom(){
    				console.log("绑定事件")
    				// 绑定事件
    				elem.onmouseover=function(){
    					clearInterval(interId);
    				}
    				elem.onmouseout=function(){
    					auto();
    				}
    				//停止开始自动
    				
    				next.onclick=function(){

    					var num=index+1;
    					goSlider(num);
    				}
    				//下一张
    				
    				
    				pre.onclick=function(){
    					var num=index-1;   					
    					goSlider(num);

    				}
    				// 上一张
    				
    				// 小点单击
    				for(var i=0;i<sliderLen;i++){
    					!function(i){
    						var j= i;
    						pagerItems[j].onclick=function(){
    							goSlider(j+1);
    						}
    					}(i)
    				}
    				
    			}
    			
    			//自动
 			function auto(){
 				interId=setInterval(function(){
 					var num=index+1;
 					goSlider(num);
 					
 				},opt.time)
 			}
    			// 切换幻灯片
    			function goSlider(num){
    				//  默认 index 1
    				if(num<-1){
    					num=sliderLen;
    				}
    				console.log(sliderLen);
    				if(num>sliderLen+1){
    					num=-1;
    				}
    				
    				
    				
    				
    				// 判断边界
    				
    				wrap.style.left=num*sliders[0].offsetWidth*-1+"px";//根据index 更新位置
    				//默认位置是对的
//  				
    				
    				if(num==sliderLen+1){//后面的第i张 就要回到真正的第一张
    					setTimeout(function(){
    						wrap.className="wrap";    						
    						wrap.style.left=sliders[0].offsetWidth*-1+"px";    						
    					},500) 
    					pagerItems[sliderLen-1].className="pager";
    					pagerItems[0].className="pager active";//添加高亮
    					index=1;
    				}else if(num==0){
    					// 0时候就要切到地4个
    				
    					setTimeout(function(){
    						wrap.className="wrap";    						
    						wrap.style.left=sliders[0].offsetWidth*sliderLen*-1+"px";    						
    					},500) 
    					
    					pagerItems[0].className="pager";
    					pagerItems[sliderLen-1].className="pager active";//添加高亮
    					index=sliderLen;
    					
    				}else{
    					pagerItems[index-1].className="pager";//去掉之前的高亮  
    					pagerItems[num-1].className="pager active";//添加高亮
    					index=num;//更新index
    				}
    				
    				wrap.className="wrap ani";
    				
    			}
    	    			
    		}
    		
    		var dom =$(".banner")[0];
//  		var dom2 =document.getElementsByClassName("mybu")[0]
//  		var opt = {dom:dom,time:2000};
			console.log(dom);
    		new Slider( {dom:dom,time:2000,showPre:true});//把幻灯片最大的内容传递进来；
//  		new Slider( {dom:dom2,time:2000,showPre:true,default:2});//把幻灯片最大的内容传递进来