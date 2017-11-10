var app = angular.module("indexApp", ["ionic","ngCordova"])
	.controller("indexCon", ["$scope", "$state", "$http", "$ionicHistory", "$ionicModal", "$ionicBackdrop", "$ionicScrollDelegate","$ionicPopover", function($scope, $state, $http, $ionicHistory, $ionicModal, $ionicBackdrop, $ionicScrollDelegate,$ionicPopover) {
		$scope.host = "http://www.520mg.com"
		$scope.goState = function(name, data) {
			$state.go(name, data);
		}
		/*$scope.back = function() {
			$ionicHistory.goBack();
		}*/
		$scope.back = function () {
            console.log($ionicHistory.backView());
            if($ionicHistory.backView()&&$ionicHistory.backView().historyId!="root"){ 	
                $ionicHistory.goBack();
            }else{
              // $scope.goState("home",null)
                window.history.back();
            }

        }
		$scope.chatUser = [
            {id : 1,name : "落月摇情、",img : "img/boy.png",value : "您好，有什么可以帮助您的？",date : "2016-02-22"},
            {id : 2,name : "周大千",img : "img/girl.png",value : "那个单子还不错，你也来看看吧?",date : "2016-02-21"},
            {id : 3,name : "歌歌歌歌歌手",img : "img/girl-1.png",value : "好的，我会尽快发货的！",date : "2016-02-20"},
            {id : 4,name : "约K联系13535545678",img : "img/boy-1.png",value : "好的！",date : "2016-02-19"},
            {id : 5,name : "管她有多美",img : "img/girl-2.png",value : "你说的这两种都有，价格也是最低了！",date : "2016-02-18"}
        ];
        $scope.orders = [
            {id : 1,title : "麦克疯量贩式KTV6小时欢唱",type : "already",img : "img/already.png",num : 1 ,totalP : "68",date : "2016-02-28"},
            {id : 2,title : "麦克疯量贩式KTV6小时欢唱",type : "wait",img : "img/wait.png",num : 1 ,totalP : "68",date : "2016-02-28"},
            {id : 3,title : "麦克疯量贩式KTV6小时欢唱",type : "finish",img : "img/finish.png",num : 1 ,totalP : "68",date : "2016-02-28"}
        ]
		
		$ionicPopover.fromTemplateUrl("template/popover.html", { scope: $scope})
                .then(function(popover) {
                    $scope.popover = popover;
                });
                
        $scope.address = {pcd:"",addressD:"",location:""};

	}])
	.controller("loginCon", ["$scope", "$http", function($scope, $http) {
		$scope.toReg = function() {
			$scope.goState("register", null)
		}
		$scope.toresetPwd = function() {
			$scope.goState("reset", null)
		}
		$scope.user = {
			username: "",
			password: ""
		};
		$scope.login = function() {
			
			$http.post($scope.host + "/member/index_login.php", {
				fmdo: "login",
				dopost: "login",
				userid: $scope.user.username,
				pwd: $scope.user.password
			}).success(function(data) {
				if(data.status) {
					console.log(data)
					$scope.tip = "登陆成功";
					$scope.goState("homes", null);

				} else {
					$scope.tip = data.msg;
				}
			})
		}
	}])
	.controller("registerCon", ["$scope", "$http", function($scope, $http) {
		$scope.user = {
			id: "",
			password: "",
			email: ""
		};
		$scope.register = function() {
			$http.post($scope.host + "/member/reg_new2.php", {

				userid: $scope.user.id,
				userpwd: $scope.user.password,
				email: $scope.user.email
			}).success(function(data) {
				if(data.status) {
					console.log(data)
						//          	$scope.tip="注册成功";
					$scope.goState("login", null);
				} else {
					alert(111)
					console.log(data.msg)
						//              $scope.tip=data.msg;
				}
			})
		}
	}])
	.controller("homeCon", ["$scope", "$http", "$ionicModal", "$ionicBackdrop", "$ionicScrollDelegate", function($scope, $http, $ionicModal, $ionicBackdrop, $ionicScrollDelegate) {
		$scope.toSearch = function() {
			$scope.goState("search", null);
		}
		$scope.toMessage = function() {
			$scope.goState("message", null);
		}
		$scope.toShopping = function() {
			$scope.goState("shopping", null);
		}
		$scope.togoodDetail = function() {
			$scope.goState("goodDetail", null);
		}
		
		
		/**
		 * 初始化数据时，开启模态层
		 */
		$ionicBackdrop.retain();

		$scope.curIndex = 0;

		/**
		 * 导航字母
		 */
		let navABC = $scope.navABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

		/**
		 * 初始化modal
		 */
		$ionicModal.fromTemplateUrl("template/page/cityPage.html", {
			"scope": $scope,
			"animation": "slide-in-up"
		}).then(function(modal) {
			$scope.modal = modal;
		});

		/**
		 * 使用ajax访问数据，得到所有的城市信息
		 */
		$http.get("cityList.json")
			.success(function(data) {
				//取消模态层
				$ionicBackdrop.release();
				setData(data);
			})
			.error(function() {
				//取消模态层
				$ionicBackdrop.release();
			});

		/**
		 * 将ajax访问得到的数据组装成我们想要的数据格式
		 * @param {Object} data ajax得到的数据
		 */
		function setData(data) {
			$scope.address = {};
			$scope.address.citys = [];

			for(let i = 0; i < navABC.length; i++) {
				let temp = new Object();
				temp.names = [];
				temp.key = navABC[i];

				for(let key in data.citys) {
					if(data.citys[key].pinyin.substr(0, 1).toUpperCase() == navABC[i]) {
						temp.names.push(data.citys[key].city);
					}
				}
				$scope.address.citys.push(temp);
			};
		}

		//点击了某个字母
		$scope.setIndex = function(index, content) {
			$(".myNav>div>div").removeClass("actived");
			$(".myNav>div>div:contains(" + content + ")").addClass("actived");
			//		$scope.curIndex = index;
			let top = $(".item-divider:contains(" + content + ")").offset().top;
			$ionicScrollDelegate.$getByHandle('mainScroll').scrollBy(0, top - 43, true);
		}

		/**
		 * 打开选择地址的modal
		 */
		$scope.openModal = function() {
			$scope.modal.show();
		}

		/**
		 * 关闭选择地址的modal
		 */
		$scope.closeModal = function() {
			$scope.modal.hide();
		}
		
		
	}])

.controller("searchCon", ["$scope", function($scope) {
		$scope.page = 1;
		$scope.clear = function() {
			$scope.page = 2;
		}
	}])
	.controller("messageCon", ["$scope", "$state", function($scope, $state) {
		$scope.users = [{
			id: 1,
			name: "皇家礼炮",
			time: "2017-02-22",
			value: "您好，有什么可以帮助您的？ ",
			photo: "img/zyy_img1.fw.png",

		}, {
			id: 2,
			name: "周大千  ",
			value: "那个单子还不错，你也来看看吧？  ",
			photo: "img/zyy_img2.fw.png",
			time: "2017-02-21"
		}, {
			id: 3,
			name: "歌歌歌歌歌手  ",
			value: "好的，我会尽快发货的！  ",
			photo: "img/zyy_img3.fw.png",
			time: "2017-02-20"
		}, {
			id: 5,
			name: "约K联系13535545678",
			value: "好的!",
			photo: "img/zyy_img4.fw.png",
			time: "2017-02-19"
		}, {
			id: 6,
			name: "管她有多美  ",
			value: "你说的这俩种都有，价格也是最低了！",
			photo: "img/zyy_img5.fw.png",
			time: "2017-02-18"
		}, ]

		$scope.goState = function(u) {
			$state.go("detail", u);
		}
	}])
	.controller("detailCon", ["$scope", "$stateParams", function($scope, $stateParams) {
		$scope.id = $stateParams.id;
		$scope.name = $stateParams.name;
		$scope.time = $stateParams.time;
		$scope.value = $stateParams.value;
		$scope.photo = $stateParams.photo;
		console.log($stateParams, $scope.time);

	}])
	.controller("cityCon", ["$scope", "$http", "$ionicModal", "$ionicBackdrop", "$ionicScrollDelegate", function($scope, $http, $ionicModal, $ionicBackdrop, $ionicScrollDelegate) {
		console.log(123);
		//标注当前组的字母
		let curText = "";
		/**
		 * 检测地址页面的滚动事件
		 */
		$scope.scrollPosition = function() {
			$(".item-divider").each(function() {
				var top = $(this).offset().top;
				if(top < 50) {
					curText = $(this).text();
					return;
				} else {
//					return false;
				}
			});
			$(".myNav>div>div").removeClass("actived");
			$(".myNav>div>div:contains(" + curText + ")").addClass("actived");
		}
		

	}])
	.controller("shoppingCon",["$scope",function($scope){

	}])
.controller("orderCon",["$scope",function($scope){
	$scope.toCard = function() {
		$scope.goState("cards", null)
	}
}])
.controller("enableCon",["$scope",function($scope){

}])
.controller("disableCon",["$scope",function($scope){

}])
.controller("goodDetailCon",["$scope",function($scope){
	$scope.toOrder = function() {
			$scope.goState("order", null);
		}
}])

.controller("hyd6",["$scope","$ionicModal",function($scope,$ionicModal){
	$ionicModal.fromTemplateUrl("hyd-modal.html",{
                scope : $scope
            }).then(function(modal){
                $scope.modal = modal;
            });
            $scope.openModal = function(modal){
                $scope.modal.slideDown();
            }
}])

.controller("zhaobiao",["$scope","$state",function ($scope,$state) {
            $scope.goState = function(name,data){
                $state.go(name,data);
            }
        }])
	.controller("jingbiao",["$scope","$ionicModal",function ($scope,$ionicModal) {
	        	 $ionicModal.fromTemplateUrl('template/lmymodal.html', {
	                scope: $scope,
	            }).then(function(modal) {
	                $scope.modal = modal;
	            });
	             $scope.tj = function () {
	                $scope.modal.show();
	                setTimeout(function () {
	                    $scope.modal.hide();
	                },1000)
	            }
	        }])
        .controller("detail4",["$scope",function ($scope) {
            $scope.gozhaobiao = function () {
                $scope.goState("tabs2.zhaobiao",null)
            }
        }])
.controller("pop",["$scope",function ($scope) {
            $scope.gofzhaopin = function () {
                $scope.goState("fzhaopin",null);
                $scope.popover.hide();
            }
            $scope.gofqiuzhi = function () {
                $scope.goState("fqiuzhi",null);
                $scope.popover.hide();

            }
        }])
        .controller("detail2",["$scope",function ($scope) {
            $scope.gozhaopin =function () {
                $scope.goState("tabs.zhaopin",null)
            }
        }])
        .controller("fzhaopin",["$scope","$ionicModal",function ($scope,$ionicModal) {
            $ionicModal.fromTemplateUrl('template/lmymodal.html', {
                scope: $scope,
            }).then(function(modal) {
                $scope.modal = modal;
            });
            $scope.gozhaopin =function () {
                $scope.goState("tabs.zhaopin",null)
            }
            $scope.sh = function () {
                $scope.modal.show();
                setTimeout(function () {
                    $scope.modal.hide();
                },1000)
            }
        }])
        .controller("fqiuzhi",["$scope","$ionicModal",function ($scope,$ionicModal) {
            $ionicModal.fromTemplateUrl('template/lmymodal.html', {
                scope: $scope,
            }).then(function(modal) {
                $scope.modal = modal;
            })
            $scope.goqiuzhi =function () {
                $scope.goState("tabs.qiuzhi",null)
            }
            $scope.sh = function () {
                $scope.modal.show();
                setTimeout(function () {
                    $scope.modal.hide();
                },1000)
            }
        }])
        .controller("myfocus",["$scope",function($scope){
				$scope.myfocus_list = [
					{
						src: "img/mkf-img29.fw.png",
						name: "落月摇情 、",
						content: "怎样在	KTV运用K歌技巧"
					},
					{
						src: "img/mkf-img30.fw.png",
						name: "落月摇情 、",
						content: "怎样在	KTV运用K歌技巧"
					},
					{
						src: "img/mkf-img31.fw.png",
						name: "落月摇情 、",
						content: "怎样在	KTV运用K歌技巧"
					},
					{
						src: "img/mkf-img29.fw.png",
						name: "落月摇情 、",
						content: "怎样在	KTV运用K歌技巧"
					},
					{
						src: "img/mkf-img30.fw.png",
						name: "落月摇情 、",
						content: "怎样在	KTV运用K歌技巧"
					},
					{
						src: "img/mkf-img31.fw.png",
						name: "落月摇情 、",
						content: "怎样在	KTV运用K歌技巧"
					}
				]
			}])
        .controller("myheadCtrl",["$scope",function($scope){
				$scope.heading_data = [
					{
						src:"img/mkf-img23.fw.png",
						title:"怎样在KTV里运用K歌技巧",
						time:"2015-08-14",
						content: "要想唱一首歌曲，首先唱歌的人一定要做到声情并茂。",
					},
					{
						src:"img/mkf-img24.fw.png",
						title:"怎样在KTV里运用K歌技巧",
						time:"2015-08-14",
						content: "要想唱一首歌曲，首先唱歌的人一定要做到声情并茂。",
					},
					{
						src:"img/mkf-img25.fw.png",
						title:"怎样在KTV里运用K歌技巧",
						time:"2015-08-14",
						content: "要想唱一首歌曲，首先唱歌的人一定要做到声情并茂。",
					},
					{
						src:"img/mkf-img26.fw.png",
						title:"怎样在KTV里运用K歌技巧",
						time:"2015-08-14",
						content: "要想唱一首歌曲，首先唱歌的人一定要做到声情并茂。",
					},
					{
						src:"img/mkf-img27.fw.png",
						title:"怎样在KTV里运用K歌技巧",
						time:"2015-08-14",
						content: "要想唱一首歌曲，首先唱歌的人一定要做到声情并茂。",
					},
					{
						src:"img/mkf-img28.fw.png",
						title:"怎样在KTV里运用K歌技巧",
						time:"2015-08-14",
						content: "要想唱一首歌曲，首先唱歌的人一定要做到声情并茂。",
					}
				]
				$scope.shouldShowDelete = false;
			}])