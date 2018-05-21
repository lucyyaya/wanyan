var notidication = function(options){
    var defaults = {
        title : "新的事件信息" ,
        context : "有错误信息提醒" ,
        type : "error"
    };
    var options = $.extend(defaults,options);
    this.init = function(){
        if (window.Notification) {
            var popNotice = function() {
                if (Notification.permission == "granted") {
                    var notification = new Notification(options.title, {
                        body: options.context,
                        icon: '../assets/pages/img/Prompt.png'
                    });
                    notification.onclick = function() {
                        notification.close();    
                    };
                }    
            };
            if (Notification.permission == "granted") {
                popNotice();
            } else if (Notification.permission != "denied") {
                Notification.requestPermission(function (permission) {
                  popNotice();
                });
            }
        } else {
            console.log('该设备不支持Notification!');    
        }
    };
    clearTimeout(this.insideTime);
    this.insideTime = setTimeout(function(){
        this.init();
    },2000);
};