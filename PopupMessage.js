$.extend({
    Popup: function () {
        layer.open({
            type: 1, //此处以iframe举例
            title: '当你选择该窗体时，即会在最顶端',
            area: ['390px', '330px'],
            shade: 0,
            offset: [Math.random() * ($(window).height() - 300), Math.random() * ($(window).width() - 390)],//为了演示，随机坐标
            maxmin: true,
            content: 'settop.html',
            btn: ['继续弹出', '全部关闭'], //只是为了演示
            yes: function () {
                $(this).click(); //此处只是为了演示，实际使用可以剔除
            },
            btn2: function () {
                layer.closeAll();
            },
            zIndex: layer.zIndex, //重点1
            success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
    }
});