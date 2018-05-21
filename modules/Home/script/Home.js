/**
 * Created by Lucy on 2018/5/7.
 */
app.controller("Home",function($scope,$http,SystemConfig){
    $scope.private = new Object();
    $scope.private.displayHeader = function(){
        $(".header").css("display",'block');
    }
    $scope.private.displayHeader();

    $scope.private.trackTips = function(){
        //layer.
    }
})