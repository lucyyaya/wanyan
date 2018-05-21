/**
 * Created by Lucy on 2018/5/14.
 */
app.controller("Skin", function($scope, $http, SystemConfig, $anchorScroll,$location) {
    $scope.private = new Object();
    var private = new Object();
    $(".accordion").on("click",".title",e=>
            $(e.target).next(".content").toggleClass("in")
                .siblings(".content").removeClass("in")
    );

    $scope.private.goTo = function(id){
        console.log(id)
        $location.hash(id);
        $anchorScroll();
    }
})
