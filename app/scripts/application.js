//决定样式加载到对应标签
app.service("MenuAddStyle",function(){
   return{
      init : function(){
         var _url = window.location.href;
         var _res = _url.replace(/\S*\/#\//,"");
         var _hostName = _res.replace(/\//g,"");
         $(".header-nav a").each(function(){
            var _this = $(this);
            var _styleName = _this.attr("ui-sref");
            if(_styleName === _hostName){
               _this.addClass("item-cur");
            }
         });
      }
   }
});
//隐藏掉菜单项
app.service("HideMenu",function($rootScope,$state,$location,$timeout,MenuAddStyle){
   return {
      init : function(type){
         layer.closeAll('dialog');
         $rootScope.role.permissions = [];
         $rootScope.role.Router = type;
         $rootScope.Ispermissions = true;
         $("#sliderMenu").find("li").find("a").each(function(){
            var _this = $(this);
            if(_this.hasClass("nav-toggle")){
               return ;
            }else{
               if(!$rootScope.role.Router[_this.attr("ui-sref")]){
                  _this.parent("li").hide();
               }else{
                  $rootScope.role.permissions.push(_this.attr("ui-sref"));
               }
            }
         });
         //如果二级菜单全部被移除，一级菜单要被移除掉
         $("#sliderMenu .sub-menu").each(function(){
         	var _eleNum = 0;
            var _ele = $(this).find("li").length;
            var _this = $(this);
            _this.find("li").each(function(){
            	if($(this).css("display") == "none"){
            		_eleNum ++;
            	}
            });
            if(_ele === _eleNum){
               _this.closest(".nav-item").hide();
            }
         });
         var _exceptionEle = function(){
            $(".page-wrapper").empty();
            $(".page-wrapper").css("backgroud","#709ac4");
            $(".page-wrapper").append("<p class='LimitedAccess'>Limited Access!</p>");
         };
         var _currentUrl = window.location.href;
         var _res = _currentUrl.replace(/\S*\/#\//,"");
         var _hostName = _res.replace(/\//g,"");
         var _num = $rootScope.role.permissions.length;
         //决定当前页面渲染问题
		if(_num < 1){
			_exceptionEle();
		}else{
			$state.go($rootScope.role.permissions[0]);
		}

         //对当前页面在菜单栏加上对应的样式
         $timeout(function(){
            MenuAddStyle.init();
         },2000);

      }
   }
});
//登录权限验证
app.run(["$rootScope","$http","GetCookie","HideMenu","SystemConfig",function($rootScope,$http,GetCookie,HideMenu,SystemConfig){
   if(GetCookie._returnInfo()){
      layer.alert("Please wait a moment, in the initialization...",{
         btn : 0 ,
         closeBtn : 0 ,
         icon : 4 ,
         title : "System Informations"
      });

      function request(url){
         $http({
            url :url + "/iCabFranchiseeAccess/rest/login/getPrivilege" ,
            method : "POST" ,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            },
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data : {
               "encodeStr" : $.BaseCode
            }
         }).then(function(response){
            HideMenu.init(response.data.result);
         }).catch(function(response){
            layer.alert("Please refresh the page and try again later!The error message : " + response,{
               btn : 0 ,
               closeBtn : 0 ,
               icon : 0 ,
               title : "System Informations"
            });
         });
      };
      SystemConfig.get().then(function(response){
         request(response.data.RequestIP);
      }).catch(function(response){
         layer.alert("Initialization failure!The error message : " + response,{
            btn : 0 ,
            closeBtn : 0 ,
            icon : 0 ,
            title : "System Informations"
         });
      })
   };

}]);
app.run(["$rootScope","$location","$state","$timeout",function($rootScope,$location,$state,$timeout){
   //监听路由切换
   $rootScope.$watch("Ispermissions",function(nv,ov){
      if(nv){
         $rootScope.$on('$stateChangeStart', function(evt, next, current,toState){
            if(!$rootScope.role.Router[next.name]){
               evt.preventDefault();
               $state.go(toState.name);
            }
         });
      }
   });
}]);
