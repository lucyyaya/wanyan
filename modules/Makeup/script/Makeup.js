/**
 * Created by Lucy on 2018/5/18.
 */
app.controller("Makeup", function($scope, $http, SystemConfig, $anchorScroll,$location) {
    $scope.private = new Object();
    console.log(1);
    var private = new Object();
    $(".accordion").on("click",".title",e=>
            $(e.target).next(".content").toggleClass("in")
                .siblings(".content").removeClass("in")
    );
    $scope.private.hover = function(){
        var $li3=$(".foundation ul li");

        $li3.hover(function (e) {//鼠标移入
            $scope.private.movef3.call(this,e,true);
        },function (e) {//鼠标移出
            $scope.private.movef3.call(this,e,false);
        });
    }
    $scope.private.hover();
    $scope.private.movef3 = function(e,bool){
        //获取鼠标的x,y坐标值
        var x=e.clientX;
        var y=e.clientY;
        //获取当前li各个边距离浏览器顶部,左边的值
        var top=$(this).offset().top-$(document).scrollTop();
        var bottom=top+$(this).height();
        var left=$(this).offset().left;
        var right=left+$(this).width();
        //计算鼠标与li四个边的差值
        var sT=Math.abs(y-top);
        var sB=Math.abs(y-bottom);
        var sL=Math.abs(x-left);
        var sR=Math.abs(x-right);
        var direction=Math.min(sT,sB,sL,sR);//最小值
        switch (direction){
            case sT:
                if(bool){
                    $(this).find('a').css({//先瞬间上去
                        left:'16px',
                        top:'-330px'
                    }).stop().animate({//再运动下来
                        top:0
                    },300);
                }else{
                    $(this).find('a').animate({//再运动下来
                        top:'-330px'
                    },300);
                }
                break;
            case sB:
                if(bool){
                    $(this).find('a').css({//先瞬间上去
                        left:'16px',
                        top:'330px'
                    }).stop().animate({//再运动下来
                        top:0
                    },300);
                }else{
                    $(this).find('a').animate({//再运动下来
                        top:'330px'
                    },300);
                }

                break;
            case sL:
                if(bool){
                    $(this).find('a').css({//先瞬间上去
                        left:'-290px',
                        top:0
                    }).stop().animate({//再运动下来
                        left:'16px'
                    },300);
                }else{
                    $(this).find('a').animate({//再运动下来
                        left:'-290px'
                    },300);
                }

                break;
            case sR:
                if(bool){
                    $(this).find('a').css({//先瞬间上去
                        left:'300px',
                        top:0
                    }).stop().animate({//再运动下来
                        left:'16px'
                    },300);
                }else{
                    $(this).find('a').animate({//再运动下来
                        left:'300px'
                    },300);
                }
                break;
        }
    }
})
