//
//app.config(['$httpProvider', function($httpProvider) {
//        $httpProvider.defaults.useXDomain = true;
//        delete $httpProvider.defaults.headers.common['X-Requested-With'];
//}]);

//全局变量
app.run(function ($rootScope) {
    //权限赋值操作
    $rootScope.role = {
        roles: "",
        permissions : [], //存放可以访问的页面路由
        Router : {}
    };
    $rootScope.Ispermissions = false;//是否可以开启监听路由状态
    //头部用户名和公司信息显示
    $rootScope.informations = {
        UserName: "",
        CompanyName: "",
        RemoveCookie : ""
    };
});
/**执行页面调用方法 */
app.directive("applicationMenu", function () {
    return {
        restrict: "A",
        scope: {
            test: "="
        },
        link: function (scope, attrs, elements) {
            App.init(); //初始化页面
            $.AddCurrentEleClass();
            $.AcitveSlider();
            //$.PageLoading();
            //显示与隐藏菜单元素
            //$.DisplaySlider();
        }
    }
});
/**
 * 系统配置变量
 */
app.service("SystemConfig", function ($q, $http) {
    return {
        get: function () {
            var deferred = $q.defer();
            var promise = $http.get("./config.json").then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject();
            });
            return deferred.promise;
        }
    }
});

/**
 * 确认栏
 */
app.service("Confirmation",[function () {
    this.confirm = function (title,icon,act) {
        layer.confirm(title, {
            title: ['Prompt', 'font-size:18px;'],
            icon: icon,
            time: 5000,
            btn: [act]
        });
    }
}]);
/*获得cookie信息*/
app.service("GetCookie",function(){
   return{
      _returnInfo : function(){
         var cookieStr = document.cookie.split(";"),resultForIcab = /icab=\S*/g,code = "";
         for(var i = 0 ; i < cookieStr.length ; i ++){
            if(resultForIcab.test(cookieStr[i])){
               code = cookieStr[i];
            }
         }
         if(code != ""){
            var _code = code.replace(/icab=/,"");
            return _code;
         }else{
            return false;
         }
      }
   }
});
//权限拦截
app.run(['$rootScope', '$window', '$location', '$log', 'SystemConfig', '$state','GetCookie', function ($rootScope, $window, $location, $log, SystemConfig, $state,GetCookie) {
		try{
			var _cookies = GetCookie._returnInfo().replace(/(^\s*)|(\s*$)/g, "");
		}catch(e){
			var _cookies = null;
		}
      if(_cookies && typeof _cookies != " "){
         $.BaseCode = _cookies;
      }else{
         $location.url('Login');
      }
    /*防止路由异步加载机制导致，数据判断成功后，跳转到不理想的位置*/
    // $location.url('Cashier');
    // SystemConfig.get().then(function (response) {
    //     GetLocation(response.data.RequestIP);
    // });
    function msg(val) {
        layer.msg(data.message +" Go to the login screen in "+ val +" seconds!", {
            area: ['500px', '70px'],
            anim: 6,
            icon: 16,
            shade: 0.05,
            time: 999
        });
    }

    function GetLocation(urlStr) {
        var url = window.location.href; //读取链接
        var exp = /q=(\S*)/;
        var secExp = /(\S*)#/;
        try {
            var urlData = null;
            var urlNewData = url.match(exp)[1].replace(/\?q/, "");
            if (urlNewData.indexOf("#") != -1) {
                urlData = urlNewData.match(secExp)[1].replace(/\?q/, "");
            } else {
                urlData = urlNewData;
            }
            if (urlNewData.length > 0) {
                $.ajax({
                    type: "post",
                    url: urlStr + "/iCabFranchiseeAccess/rest/login/decodeStr/",
                    cache: false,
                    data: {encodeStr: urlData},
                    success: function (data, status) {
                        $.BaseCode = data.result.encodeStr;
                        if(data.statusCode == 2){
                            layer.msg(data.message +" Go to the login screen in 3 seconds!", {
                                area: ['500px', '70px'],
                                anim: 6,
                                icon: 16,
                                shade: 0.05,
                                time: 2999
                            });
                            // var countdown = 3;
                            // function settime(val) {
                            //     if (countdown != 0) {
                            //         countdown--;
                            //         layer.msg(data.message +" Go to the login screen in "+ countdown +" seconds!", {
                            //             area: ['500px', '70px'],
                            //             anim: 6,
                            //             icon: 16,
                            //             shade: 0.05,
                            //             time: 999
                            //         });
                            //     }
                            //     setTimeout(function() {
                            //         settime(val)
                            //     },999)
                            // }
                        }
                        setTimeout(function () {
                            if (status == "success" && data.statusCode == 2) {
                                $state.go('Login');
                            }
                        },3000);
                    }, error: function (data, status) {
                        $state.go('Login');
                    }
                });
            } else {
                $state.go('Login');
            }
        } catch (error) {
            $location.url('Login');
        }
    }
}]);
/*权限提交回来验证是否正确*/
app.service("PermissionInfo", function () {
    return {
        init: function (response) {
            var status = true;
            if (response.data.statusCode == "2") {
                layer.alert(response.data.message, {
                    title: "Informations",
                    icon: 2,
                    skin: 'layer-ext-moon',
                    btn: ["Close"]
                });
                status = false;
            }
            return status;
        }
    }
});
//手动点击菜单栏退出系统
app.directive("logout", function($state) {
    return {
        restrict: "A",
        link: function(scope, attrs, element, $http) {
           $(element.$$element[0]).on("click",function(event){
               var myDate = new Date();
               myDate.setTime(-1000);//设置时间
               $state.go("Login");
               
          });
        }
    }
});
