app.controller("home",["$scope",function ($scope) {
        
    }])
    .controller("validateOrder",["$scope",function ($scope) {
        $scope.searchKey = "";
        $scope.num = function (i) {
            $scope.searchKey += i ;
        }
        $scope.val = function () {
            if($scope.searchKey == ""){
                alert("验证内容不能为空！");
            }else{
                $scope.goState("val",null);
            }
        }
        $scope.clear = function () {
            $scope.searchKey = "";
        }

    }])
    .controller("sao", function($scope, $cordovaBarcodeScanner) {
        document.addEventListener("deviceready", function () {

            $cordovaBarcodeScanner
                .scan()
                .then(function(barcodeData) {
                    // Success! Barcode data is here 扫描数据：barcodeData.text
                    console.log("success");
                }, function(error) {
                    // An error occurred
                    console.log("error");
                });
        }, false);
    })
    .controller("withdraw",["$scope","$ionicModal",function ($scope,$ionicModal) {
        $ionicModal.fromTemplateUrl('template/modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.data={"money":""}
        $scope.withdraw = function () {
            console.log($scope.data.money);
            if($scope.data.money > 0){
                $scope.src = "img/icon.png";
                $scope.msg = "提现成功，请等待审核";
                $scope.modal.show();
                setTimeout(function () {
                    $scope.modal.hide();
                },1000);
            }else{
                alert("提现金额必须大于0元！");
            }

        }
    }])
    .controller("selectCard",["$scope",function ($scope) {
        $scope.isShang = false;
        $scope.isGuang = true;
        $scope.isJian = true;
        $scope.shang = function () {
            console.log($scope.isShang);
            $scope.isShang = !$scope.isShang;
            $scope.isGuang = true;
            $scope.isJian = true;
        }
        $scope.guang = function () {
            $scope.isShang = true;
            $scope.isGuang = !$scope.isGuang;
            $scope.isJian = true;
        }
        $scope.jian = function () {
            $scope.isShang = true;
            $scope.isGuang = true;
            $scope.isJian = !$scope.isJian;
        }
    }])
    .controller("addCard",["$scope","$ionicModal",function ($scope,$ionicModal) {
        $scope.card = {};
        $ionicModal.fromTemplateUrl('template/modal.html', {
            scope: $scope,
        }).then(function(modal) {
            $scope.modal = modal;
        });
            mui.init();
            $scope.cardPicker3 = new mui.PopPicker({
                layer: 2
            });
            $scope.cardPicker3.setData(cardData);
            $scope.showCardPickerButton = document.getElementById('showCardPicker3');
            $scope.cardResult3 = document.getElementById('cardResult3');
            $scope.showCardPickerButton.addEventListener('tap', function(event) {
                $scope.cardPicker3.show(function(items) {
                    $scope.card.cardType = (items[0] || {}).text + " " + (items[1] || {}).text;
                    console.log($scope.card.cardType);
                });// show ed
            })//showCityPickered
        
        $scope.sub = function ($event) {
            if(!$scope.card.username){
                alert("持卡人内容不能为空");
                return;
            }
            if(!$scope.card.cardType){
                alert("卡类型内容不能为空");
                return;
            }
            if(!$scope.card.cardNum){
                alert("卡号内容不能为空");
                return;
            }
            if(!$scope.card.bank){
                alert("开户行内容不能为空");
                return;
            }
            $scope.src = "img/icon.png";
            $scope.msg = "绑卡成功!";
            $scope.modal.show();
            setTimeout(function () {
                $scope.modal.hide();
            },2000);
        }
    }])
    .controller("messageD",["$scope","$stateParams",function ($scope,$stateParams) {
        console.log($stateParams);
        $scope.u = $stateParams;
    }])
    .controller("wait",["$scope",function ($scope) {
        $scope.w = [];
        $scope.w.type = "wait";
    }])
    .controller("already",["$scope",function ($scope) {
        $scope.a = [];
        $scope.a.type = "already";
    }])
    .controller("finish",["$scope","$ionicModal",function ($scope,$ionicModal) {
        $scope.f = [];
        $scope.f.type = "finish";
        $ionicModal.fromTemplateUrl('template/modal.html', {
            scope: $scope,
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.delete = function (o) {
            if(confirm("您是否删除这个商品？")){
                console.log($scope.orders.indexOf(o)) ;
                var index = $scope.orders.indexOf(o);
                $scope.orders.splice(index,1);
                $scope.src = "img/icon.png";
                $scope.msg = "删除成功!";
                $scope.modal.show();
                setTimeout(function () {
                    $scope.modal.hide();
                },2000);
            }

        }
    }])
    .controller("order",["$scope",function ($scope) {
        $scope.flag = false;
        $scope.finish = false;
        $scope.show = function (type) {
            if(type == "order.finish"){
                $scope.finish = true;
            }else{
                $scope.finish = false;
            }
            $scope.goState(type,null);
        }
    }])
    .controller("address",["$scope",function ($scope) {
        
               mui.init();
                $scope.cityPicker3 = new mui.PopPicker({
                    layer: 3
                });
        $scope.cityPicker3.setData(cityData3);
        $scope.showCityPickerButton = document.getElementById('showCityPicker3');
        $scope.cityResult3 = document.getElementById('cityResult3');
        $scope.showCityPickerButton.addEventListener('tap', function(event) {
            $scope.cityPicker3.show(function(items) {
                        $scope.address.pcd = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                        console.log($scope.address.pcd);
                    });// show ed
                })//showCityPickered
    }])
    .controller("map",["$scope","$stateParams",function ($scope,$stateParams) {
         $scope.map = new AMap.Map("container", {
            resizeEnable: true
        });
        AMap.plugin('AMap.Geocoder',function(){

            var geocoder = new AMap.Geocoder();
            //地理编码,返回地理编码结果
            geocoder.getLocation($stateParams.addressD, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    geocoder_CallBack(result);
                }
            });

            function addMarker(i, d) {
                var marker = new AMap.Marker({
                    map: $scope.map,
                    position: [ d.location.getLng(),  d.location.getLat()]
                });
                var infoWindow = new AMap.InfoWindow({
                    content: d.formattedAddress,
                    offset: {x: 0, y: -30}
                });
                marker.on("mouseover", function(e) {
                    infoWindow.open($scope.map, marker.getPosition());
                });
            }
            //地理编码返回结果展示
            function geocoder_CallBack(data) {
                var resultStr = "";
                //地理编码结果数组
                var geocode = data.geocodes;
                for (var i = 0; i < geocode.length; i++) {
                    //拼接输出html
                    resultStr += "<span style=\"font-size: 12px;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\">" + "<b>地址</b>：" + geocode[i].formattedAddress + "" + "&nbsp;&nbsp;<b>的地理编码结果是:</b><b>&nbsp;&nbsp;&nbsp;&nbsp;坐标</b>：" + geocode[i].location.getLng() + ", " + geocode[i].location.getLat() + "" + "<b>&nbsp;&nbsp;&nbsp;&nbsp;匹配级别</b>：" + geocode[i].level + "</span>";
                    console.log(geocode[i].location.getLng() + ", " + geocode[i].location.getLat());
                    $scope.address.location = geocode[i].location.getLng() + ", " + geocode[i].location.getLat();
                    addMarker(i, geocode[i]);
                }
                $scope.map.setFitView();
                document.getElementById("result").innerHTML = resultStr;
            }
        })
    }])
