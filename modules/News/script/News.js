/**
 * Created by Lucy on 2018/5/19.
 */
app.controller("News", function($scope, $http, SystemConfig, $anchorScroll,$location,$timeout) {
    $scope.private = new Object();
    var private = new Object();
    $scope.private.flash = function(){

        $(".mainTitle").animate({opacity:"0"},250);
        $(".mainTitle").animate({opacity:"1"},499);
    }
    $timeout(function(){
        $scope.private.flash();
    },500);
    $scope.private.displayMore = function(){
        $(".display").css("display",'block');
        $(".displayMore").css('display','none');
    }
})