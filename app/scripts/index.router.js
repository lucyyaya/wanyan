var app = angular.module("app",["ui.router","base64"]);
app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    //$urlRouterProvider.when("", "/Cashier");
    $stateProvider.state("Home", {
        url : "/Home",
        templateUrl : "modules/Home/client/Home.html",
        controller : "Home",
        resolve : {
          "SystemConfig" : ["SystemConfig",function(init){
              return init.get();
          }]
        },
        controllerAs : "vm"
    }).state("Skin", {
        url : "/Skin",
        templateUrl : "modules/Skin/client/Skin.html",
        controller : "Skin",
        resolve : {
            "SystemConfig" : ["SystemConfig",function(initService){
                return initService.get();
            }]
        },
        controllerAS : "vm"
    }).state("Makeup",{
        url : "/Makeup" ,
        templateUrl : "modules/Makeup/client/Makeup.html" ,
        controller : "Makeup" ,
        resolve : {
            "SystemConfig" : ["SystemConfig",function(initService){
                return initService.get();
            }]
        },
        controllerAS : "vm"
    }).state("Best",{
        url : "/Best" ,
        templateUrl : "modules/Best/client/Best.html" ,
        controller : "Best" ,
        resolve : {
            "SystemConfig" : ["SystemConfig",function(initService){
                return initService.get();
            }]
        },
        controllerAS : "vm"
    }).state("News",{
        url : "/News" ,
        templateUrl : "modules/News/client/News.html" ,
        controller : "News" ,
        resolve : {
            "SystemConfig" : ["SystemConfig",function(initService){
                return initService.get();
            }]
        },
        controllerAS : "vm"
    }).state("About",{
        url : "/About" ,
        templateUrl : "modules/About/client/About.html" ,
        controller : "About" ,
        resolve : {
            "SystemConfig" : ["SystemConfig",function(initService){
                return initService.get();
            }]
        },
        controllerAS : "vm"
    }).state("Login",{
        url : "/Login" ,
        templateUrl : "modules/Login/client/login.html" ,
        controller : "login" ,
        resolve : {
            "SystemConfig" : ["SystemConfig",function(initService){
                return initService.get();
            }]
        }
    }).state("Error",{
        url : "/Error" ,
        templateUrl : "modules/Error/client/error.html" ,
        controller : "error" ,
        resolve : {
            "SystemConfig" : ["SystemConfig",function(initService){
                return initService.get();
            }]
        }
    })
});
