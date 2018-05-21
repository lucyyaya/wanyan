/**执行页面调用方法 */
app.directive("jumpMenu", function () {
    return {
        restrict: "A",
        scope: {
            test: "="
        },
        link: function (scope, attrs, elements) {
            var _url = window.location.href;
            console.log(_url)
            var _res = _url.replace(/\S*\/#\//,"");
            var _hostName = _res.replace(/\//g,"");
            $(".header-nav a").each(function(){
                var _this = $(this);
                var _styleName = _this.attr("ui-sref");
                if(_styleName === _hostName){
                    _this.addClass("item-cur");
                }
            });
            $.AcitveSlider();
            //$.PageLoading();
            //显示与隐藏菜单元素
            //$.DisplaySlider();
        }
    }
});