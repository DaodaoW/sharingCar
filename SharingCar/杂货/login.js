window.onload=function(){
        var sub=document.getElementById("sub");
        var userName=document.getElementById("userName");
        var pwd=document.getElementById("pwd");
        var close=document.getElementById("close");
        var signTwo=document.getElementById("password");
    sub.onclick=function(){
        var user=userName.value;
        var password=pwd.value;
        if(password==""&&user!=""){
            signTwo.setAttribute('class', 'key');
        }else if(password!=""&&user!=""){
            var data = {
            user: user,
            password: password
            };
     $.ajax({
            url: 'http://127.0.0.1:1234/login',
            data: data,
            dataType: 'jsonp',
            cache: false,
            timeout: 5000,
        jsonp: 'callback',// jsonp 字段含义为服务器通过什么字段获取回调函数的名称
        jsonpCallback: 'jsonpCallback',  // 声明本地回调函数的名称，jquery 默认随机生成一个函数名称
        success: function(data) {
            console.log("ajax success callback: " + data.name+data.id);
            if(data.back=="success"){
                signTwo.setAttribute('class', '');
                window.location.href="http://localhost:1234/register.html";
            }else if(data.back=="fail"){
                pwd.value="";
                signTwo.setAttribute('class', 'key');
            }
            //alert(data.back);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
        }
        
};
    // function jsonpCallback(data) {
    //      console.log("jsonpCallback: " + data.name)
    // }
    close.onclick=function(){
        userName.value="";
        pwd.value="";
    }
};