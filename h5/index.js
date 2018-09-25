window.onload = function(){
		var arrowEle = document.getElementById("arrowwhite");
		var liNodes = document.querySelectorAll("#head .headMain > .nav > .list > li");
		var upNodes = document.querySelectorAll("#head .headMain > .nav > .list > li .up");
		var firstLiNode = liNodes[0];
		var firstUpNode = firstLiNode.querySelector(".up");
		//firstLiNode.style.width = "100%";
        arrowEle.style.left = firstLiNode.offsetLeft+firstLiNode.offsetWidth/2 - arrowEle.offsetWidth/2 +"px";
		var head = document.querySelector("#head");
        var content = document.querySelector("#content");
        var cliNodes = document.querySelectorAll("#content .list > li");
		var clist = document.querySelector("#content .list ");
		var home2LiNodes = document.querySelectorAll("#content > .list > .home .home2 > li ");
		var home1LiNodes = document.querySelectorAll("#content > .list > .home .home1 > li ");
		var home1 = document.querySelector("#content > .list > .home .home1");

		//选择器一定要弄清单个是querySelector 两个以上是querySelectorAll
		var aboutUls = document.querySelectorAll("#content > .list > .about .about3 > .item > ul");

		var dottLis = document.querySelectorAll("#content > .dott > li");
		var team3 = document.querySelector("#content > .list > .team .team3");
		var team3Lis = document.querySelectorAll("#content > .list > .team .team3 li");

		var mask = document.querySelector("#mask");
		var curtain = document.querySelectorAll("#mask div");
		var line = document.querySelector("#mask .line");
		/*同步content li 的索引*/
		var now = 0;
        var timer = 0;

		/*content 区域*/
		
		//开机动画
		loadingAn();
		function loadingAn(){
			//var swidth = document.documentElement.clientWidth;
			var arr = ['b1.jpg','b2.jpg','b3.jpg','b1.jpg','b2.jpg'];//模拟加载产生进度条效果
			var flag = 0;
//			for(var i=0;i<12;i++){
//				arr[i] = swidth/12*(i+1);
//			}
			for(var j=0;j<arr.length;j++){
				var img = new Image();
				img.src = "img/"+arr[j];
				img.onload = function(){
					flag++;
					line.style.width = flag/arr.length*100+"%";
				}
			}
			line.addEventListener("transitionend",function(){
				if(flag === arr.length){
					for(var i=0;i<curtain.length;i++){
						curtain[i].style.height = 0+"px";
					}
					this.style.display="none";
				}
			})
			
			curtain[0].addEventListener("transitionend",function(){
				mask.remove();
				home3d();
			})
		}

		//出入场动画
		var anArr = [{
						inAn:function(){
							
						},
						outAn:function(){
							
						}
		            },
					{
						inAn:function(){
							
						},
						outAn:function(){
							
						}
					},
					{
					    inAn:function(){
							
						},
						outAn:function(){
							
						}
					},
					{
						inAn:function(){
							var dire1 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(1)"); 
							var dire2 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(2)");
							dire1.style.transform = "rotate(0turn)";
							dire2.style.transform = "rotate(0turn)";
						},
						outAn:function(){
							var dire1 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(1)"); 
							var dire2 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(2)");
							dire1.style.transform = "rotate(0.2turn)";
							dire2.style.transform = "rotate(-0.2turn)";
						}
					},
					{
						inAn:function(){
							var team1 = document.querySelector("#content > .list > .team .team1");
							var team2 = document.querySelector("#content > .list > .team .team2");

							team1.style.transform = "translateX(0px)";
							team2.style.transform = "translateX(0px)";
						},
						outAn:function(){
							var team1 = document.querySelector("#content > .list > .team .team1");
							var team2 = document.querySelector("#content > .list > .team .team2");
							
							team1.style.transform = "translateX(-200px)";
							team2.style.transform = "translateX(200px)";
						}
					}];
		anArr[3].outAn();
		setTimeout(function(){
			anArr[3].inAn();
		},2000);

		//bubbles
		bubbles();
		function bubbles(){
			var cav = null;
			var time1 = 0;
			var time2 = 0;
			for (var i=0;i< team3Lis.length;i++)
			{
				team3Lis[i].onmouseenter = function(){
					for (var j=0;j<team3Lis.length ;j++ )
					{
						team3Lis[j].style.opacity = 0.3;
					}
					this.style.opacity = 1;
					addCanvas();
					cav.style.left = this.offsetLeft+80+"px";
				} 
			}

			function addCanvas(){
				if(!cav){
					cav = document.createElement("canvas");
					cav.width = team3Lis[0].offsetWidth;
					cav.height = team3Lis[0].offsetHeight*2/3;

					cav.onmouseleave = function(){
						for (var j=0;j<team3Lis.length ;j++ )
						{
							team3Lis[j].style.opacity = 1;
						}
						removeCanvas();
					}
					team3.appendChild(cav);
					qiPao()
				}
			}

			function removeCanvas(){
				cav.remove();
				cav = null;
				clearInterval(time1);
				clearInterval(time2);
			}

			function qiPao(){
				if(cav.getContext){
					var cx = cav.getContext("2d");
					var arr = [];

					time1 = setInterval(function(){
						cx.clearRect(0,0,cav.width,cav.height);//clear context
						//carton
						for(var i=0;i<arr.length;i++){
							arr[i].radin +=10;
							arr[i].x = arr[i].pX + Math.sin(arr[i].radin*Math.PI/180)*arr[i].step*2;
							arr[i].y = arr[i].pY -(arr[i].radin*Math.PI / 180)*arr[i].step/2;
							if(arr[i].y <=50){
								arr.splice(i,1);
							}
						}

						//draw
						for(var i=0;i<arr.length;i++){
							cx.save();
							cx.beginPath();
							cx.fillStyle = "rgba("+arr[i].red+","+arr[i].green+","+arr[i].blue+","+arr[i].alp+")";
							cx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI,true);
							cx.fill();
						}
				
				    },1000/80)

					//输入数据
					time2 = setInterval(function(){
						var r = Math.random()*6+2;
						var x = Math.random()*cav.width;
						var y = cav.height - r;
						var red = Math.round(Math.random()*255);
						var green = Math.round(Math.random()*255);
						var blue = Math.round(Math.random()*255);
						var alp = 1;

						var radin = 0;
						var pX = x;
						var pY = y;
						var step = Math.random()*20+10;
						arr.push({
							x:x,
							y:y,
							r:r,
							red:red,
							green:green,
							blue:blue,
							alp:alp,
							radin:radin,
							pX:pX,
							pY:pY,
							step:step
						})
					
					},100/2);
				}
			}
		}

		/*fouth screen Pictures Boom 效果*/
		picBoom();
		function picBoom(){
			for (var i=0;i<aboutUls.length ;i++ )
			{
				change(aboutUls[i]);
			}
			function change(ul){
				var src = ul.dataset.src;
				var w = ul.offsetWidth/2;
				var h = ul.offsetHeight/2;
				for(var j=0;j<4 ;j++ )
				{
					var liNode = document.createElement("li");
					liNode.style.width = w+"px";
					liNode.style.height = h+"px";
					var imgNode = document.createElement("img");

//					0 left:0   top:0
//					1 left:-w  top:0
//					2 left:0   top:-h
//					3 left:-w  top:-h

					imgNode.style.left = -(j%2)*w+"px";
					imgNode.style.top = -Math.floor(j/2)*h+"px";
					imgNode.src = src; 
					
					liNode.appendChild(imgNode);
					ul.appendChild(liNode);
				}
				var imgNodes = "";
				ul.onmouseenter = function(){
//					0 left:0   top:h
//					1 left:-2w  top:0
//					2 left:w   top:-h
//					3 left:-w  top:-2h
					imgNodes = this.querySelectorAll(" li > img");
					imgNodes[0].style.top = h+"px";
					imgNodes[1].style.left = -2*w+"px";
					imgNodes[2].style.left = w+"px";
					imgNodes[3].style.top = -2*h+"px";
				}

				ul.onmouseleave = function(){
				    imgNodes = this.querySelectorAll(" li > img");
					imgNodes[0].style.top = 0+"px" ;
					imgNodes[1].style.left = -w+"px";
					imgNodes[2].style.left = 0+"px";
					imgNodes[3].style.top = -h+"px";
				
				}
			}
		}

		/*first screen 3D 效果*/
		var oldIndex = 0;
		var timer3D = null;
		var autoIndex = 0;
		//home3d(); 开机动画结束后调用
        function home3d(){
			for (var i=0;i<home2LiNodes.length ;i++ )
			{   
				home2LiNodes[i].index = i;

				home2LiNodes[i].onclick = function(){
					clearInterval(timer3D);
					
					for (var j=0;j<home2LiNodes.length ;j++ )
			        {		
						home2LiNodes[j].classList.remove("active");
					}
					this.classList.add("active");

					//left to right
					if(oldIndex<this.index){
						home1LiNodes[this.index].classList.remove("leftShow");
						home1LiNodes[this.index].classList.remove("leftHide");
						home1LiNodes[this.index].classList.remove("rightHide");
						home1LiNodes[this.index].classList.add("rightShow");

						home1LiNodes[oldIndex].classList.remove("rightShow");
						home1LiNodes[oldIndex].classList.remove("rightHide");
						home1LiNodes[oldIndex].classList.remove("leftShow");
						home1LiNodes[oldIndex].classList.add("leftHide");
					}

					//right to left
					if(oldIndex>this.index){
						home1LiNodes[this.index].classList.remove("rightShow");
						home1LiNodes[this.index].classList.remove("rightHide");
						home1LiNodes[this.index].classList.remove("leftHide");
						home1LiNodes[this.index].classList.add("leftShow");

						home1LiNodes[oldIndex].classList.remove("rightShow");
						home1LiNodes[oldIndex].classList.remove("leftShow");
						home1LiNodes[oldIndex].classList.remove("leftHide");
						home1LiNodes[oldIndex].classList.add("rightHide");
					}
					oldIndex = this.index;
					//手动轮播同步自动轮播
					autoIndex = this.index;
					//手动点完继续自动轮播
					autoMove();
				}
			}
            
			//auto show left to right 
			autoMove();
			function autoMove(){
				//debugger;
				clearInterval(timer3D); //正常套路，调用之前清一下循环定时器
				timer3D = setInterval(function(){
					autoIndex++;
					if(autoIndex == home2LiNodes.length){
						autoIndex = 0;
					}

					//圆点同步
					for(var i=0;i<home2LiNodes.length;i++){
						home2LiNodes[i].classList.remove("active");
					}
					home2LiNodes[autoIndex].classList.add("active");

					home1LiNodes[autoIndex].classList.remove("leftShow");
					home1LiNodes[autoIndex].classList.remove("leftHide");
					home1LiNodes[autoIndex].classList.remove("rightHide");
					home1LiNodes[autoIndex].classList.add("rightShow");

					home1LiNodes[oldIndex].classList.remove("rightShow");
					home1LiNodes[oldIndex].classList.remove("rightHide");
					home1LiNodes[oldIndex].classList.remove("leftShow");
					home1LiNodes[oldIndex].classList.add("leftHide");
					
					oldIndex = autoIndex;
				},2000);
			}

			home1.onmouseenter = function(){
				clearInterval(timer3D);
			}
			home1.onmouseleave = function(){
				autoMove();
			}
		}


		//滚轮事件
		if(content.addEventListener){
			content.addEventListener("DOMMouseScroll",function(ev){
				ev = ev||event;
				clearTimeout(timer);
				timer = setTimeout(function(){
					fn(ev);
				},200)
			});
		}
		content.onmousewheel = function(ev){
			ev = ev||event;
			clearTimeout(timer);
			timer = setTimeout(function(){
				fn(ev);
			},200)
		};
		function fn(ev){
			ev = ev||event;
			var dir = "";
			if(ev.wheelDelta){
				dir = ev.wheelDelta>0?"up":"down";
			}else if(ev.detail){
				dir = ev.detail<0?"up":"down";
			}
			switch(dir){
				case "up":
				if(now>0){
					now--;
					arrowMove(now);
				}
				break;
				case "down":
				if(now<cliNodes.length-1){
					now++;
					arrowMove(now);
				}
				break;
			}
		}

        contentbind();

		/*缩放窗口*/
        window.onresize = function(){
			contentbind();
		}

		function contentbind(){
			content.style.height = document.documentElement.clientHeight - head.offsetHeight+"px";
			for(var i=0;i<cliNodes.length;i++){
				cliNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight+"px";
			}
		}


        /*head 效果*/
		headbind();
		//nav 点击效果
		function headbind(){
			for(var i=0;i<liNodes.length;i++){
				liNodes[i].index = i;
				liNodes[i].onclick = function(){
					arrowMove(this.index);
					now = this.index;
				}
		    }
			//右侧圆点
			for(var i=0;i<dottLis.length;i++){
				dottLis[i].index = i;
				dottLis[i].onclick = function(){
					arrowMove(this.index);
					now = this.index;
				}
		    }
		}
        
		arrowMove(0);
		function arrowMove(index){
			for(var i=0;i<upNodes.length;i++){
				upNodes[i].style.width = "";
			}
			upNodes[index].style.width = "100%";
			arrowEle.style.left =liNodes[index].offsetLeft+liNodes[index].offsetWidth/2 - arrowEle.offsetWidth/2 +"px";
			/*定位到ul*/
			clist.style.top = -index*(document.documentElement.clientHeight - head.offsetHeight)+"px";
			/*定位到li*/
//			for(var i=0;i<cliNodes.length;i++){
//				cliNodes[i].style.top = "";
//			}
//          cliNodes[index].style.top = -index*(document.documentElement.clientHeight - head.offsetHeight)+"px";
            for(var i=0;i<dottLis.length;i++){
				dottLis[i].className = "";
			}
            dottLis[index].className = "active"; 
		}
		

	}