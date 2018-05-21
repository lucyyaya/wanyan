app.controller("login", function($scope, $http, SystemConfig, $state, $base64,HideMenu,$timeout) {
    $scope.private = new Object();
    var private = new Object();
    $scope.private.displayHeader = function(){
        $(".header").css("display",'none');
    }
    $scope.private.displayHeader();
    //打开注册窗口
    $scope.private.goToRegister = function(){
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
        document.querySelector('.cont_form_sign_up').style.display = "block";
        document.querySelector('.cont_form_login').style.opacity = "0";

        $timeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
        },100);

        $timeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
        },400);
    };
    //打开登录窗口
    $scope.private.goToLogin = function(){
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
        document.querySelector('.cont_form_login').style.display = "block";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";
        $timeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },400);
        $timeout(function(){
            document.querySelector('.cont_form_sign_up').style.display = "none";
        },200);
    };
    //关闭登录注册窗口
    $scope.private.closeWindow = function(){
        document.querySelector('.cont_forms').className = "cont_forms";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";
        document.querySelector('.cont_form_login').style.opacity = "0";
        $timeout(function(){
            document.querySelector('.cont_form_sign_up').style.display = "none";
            document.querySelector('.cont_form_login').style.display = "none";
        },500);
    }
    //登录
    $scope.private.Login = function() {
        if(private.validata()){
            $http({
                method: "POST",
                type: "JSON",
                data: {
                    "user_name": $scope.private.user,
                    "user_pwd": $scope.private.password
                },
                url: "app/data/login.php",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json"
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).then(function(res) {
                if (res.data.code == 1) {
                    layer.msg('登录成功');
                    $.user = $scope.private.user;
                    $.password = $scope.private.password;
                    $scope.private.user = "";
                    $scope.private.password = "";
                    $timeout(function(){
                        $state.go('Home');
                    },1000);
                } else {
                    layer.msg(res.data.msg);
                }
            }).catch(function(res) {
                layer.alert('网络错误！', {
                    icon: 0,
                    skin: 'layer-ext-moon',
                    title: "提示",
                    btn: ['Close']
                });
            })
        }else{
            //layer.msg("请重新登录！")
        }

    }
    //注册
    $scope.private.register = function(){
        if(private.test()){
            $http({
                method: "POST",
                type: "JSON",
                data: {
                    "user_name": $scope.private.registerUser,
                    "user_pwd": $scope.private.registerPwd
                },
                url: "app/data/register.php",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json"
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).then(function(res) {
                console.log(res);
                if (res.data.code == 1) {
                    layer.msg('注册成功');
                    $timeout(function(){
                        $scope.private.goToLogin();
                    },1000);
                    $scope.private.registerUser = "";
                    $scope.private.registerPwd = "";
                    $scope.private.registerPwdC = "";
                } else {
                    layer.msg(res.data.msg);
                }
            }).catch(function(res) {
                layer.alert('网络错误！', {
                    icon: 0,
                    skin: 'layer-ext-moon',
                    title: "提示",
                    btn: ['Close']
                });
            })
        }else{
            //layer.msg("请重新登录！")
        }
    }
    //忘记密码
    $scope.private.goToForget = function(){};
    //重置密码
    $scope.private.forget = function(){}

    // 文本框是否为空检测
    private.validata = function() {
        var inside = false;
        if (!$scope.private.user || !$scope.private.password || $scope.private.user == "" || $scope.private.password == "") {
            layer.alert('用户名和密码不能为空！', {
                icon: 0,
                skin: 'layer-ext-moon',
                title: "提示",
                btn: ['Close']
            });
            inside = false;
        } else {
            inside = true;
        }
        return inside;
    };
    //注册文本框检测
    private.test = function(){
        var inside = false;
        if (!$scope.private.registerUser || !$scope.private.registerPwd || $scope.private.registerUser == "" || $scope.private.registerPwd == "") {
            layer.alert('注册名和注册密码不能为空！', {
                icon: 0,
                skin: 'layer-ext-moon',
                title: "提示",
                btn: ['Close']
            });
            inside = false;
        } else {
            inside = true;
        }
        return inside;
    }

});

