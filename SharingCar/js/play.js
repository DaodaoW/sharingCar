window.onload=function(){
   function startTest(){
    if(getCookie('user')==""){
      window.location.href="http://localhost:1234/homePage.html";
    }
  }
 startTest();
	var nav=document.getElementById('nav');
	var main=document.getElementById('main');
	var mainHeight=main.offsetHeight;
	//alert(document.body.clientWidth);浏览器窗口大小screen.width是电脑屏幕大小
	//var goodMapHeight=goodMap.offsetHeight;
	size();
	//浏览器窗口变化时页面自适应
	window.onresize = function(){
     if(document.body.clientWidth<1349){
        nav.style.width="1349"+"px";
        main.style.width="1349"+"px";
        if(document.body.clientHeight<662){
          main.style.height="551"+"px";
        }else{
          main.style.height=document.body.clientHeight-"111"+"px";
        }
     }else{
        nav.style.width=(document.body.clientWidth)+"px";
        main.style.width=(document.body.clientWidth)+"px";
       if(document.body.clientHeight<662){
          main.style.height="551"+"px";
        }else{
          main.style.height=document.body.clientHeight-"111"+"px";
        }
     }
}
    function size(){
        if(document.body.clientWidth<1349){
        nav.style.width="1349"+"px";
        main.style.width="1349"+"px";
        main.style.height=document.body.clientHeight-"111"+"px";
        if(document.body.clientHeight<662){
          main.style.height="551"+"px";
        }else{
          main.style.height=document.body.clientHeight-"111"+"px";
        }
     }else{
        nav.style.width=(document.body.clientWidth)+"px";
        main.style.width=(document.body.clientWidth)+"px";
        main.style.height=document.body.clientHeight-"111"+"px";
         if(document.body.clientHeight<662){
          main.style.height="551"+"px";
        }else{
          main.style.height=document.body.clientHeight-"111"+"px";
        }
     }
    }
     var together=document.getElementById('together');
     var homePage=document.getElementById('homePage');
     var play=document.getElementById('play');
     var fin=document.getElementById('finish');
     var unfin=document.getElementById('unfinish');
     var accept=document.getElementById('accept');
     var all=document.getElementById('all');
     var timeChoose=document.getElementById('timeChoice');
     var city=document.getElementById('cityChoice');
     var bestNew=document.getElementById('bestNew');
     var myOrder=document.getElementById('myOrder');
     var ap=document.getElementById('ap');
     var lookOrder=document.getElementById('lookOrder');
     var orderTake=document.getElementById('orderTake');
     lookOrder.onclick=function(){
        lookOrder.setAttribute("name","0");
        timeChoose.value="";
        city.value="";
        getOrderPage();
     }
     orderTake.onclick=function(){
      var userName=getCookie('user');
      var data={
        user:userName
      }
        $.ajax({
             url:'http://127.0.0.1:1234/userInfo',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
            if(data[0].identity=="车主"){
               lookOrder.setAttribute("name","1");
                   bestNew.value=3;
                   myOrder.value=2;
                   ap.value=2;
                   timeChoose.value="";
                   city.value="";
                   getOrderPage();
            }else{
                alert("你还不是车主,无法接单");
            }
                   
         },error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
     }
     bestNew.onclick=function(){
      bestNew.value=3;
      myOrder.value=2;
      ap.value=2;
      timeChoose.value="";
      city.value="";
      getOrderPage();
     }
     myOrder.onclick=function(){
      bestNew.value=2;
      myOrder.value=3;
      ap.value=2;
      timeChoose.value="";
      city.value="";
      getOrderPage();
     }
     ap.onclick=function(){
      bestNew.value=2;
      myOrder.value=2;
      ap.value=3;
      timeChoose.value="";
      city.value="";
      getOrderPage();
     }
     timeChoose.onchange=function(){
      getOrderPage();
     }
     all.onclick=function(){
       fin.value=0;
       unfin.value=0;
       accept.value=0;
       timeChoose.value="";
       city.value="";
       getOrderPage();
     }
      fin.onclick=function() {
        // alert("nima")
       fin.value=1;
       unfin.value=0;
       accept.value=0;
       timeChoose.value="";
       city.value="";
       getOrderPage();
     }
      unfin.onclick=function() {
       fin.value=0;
       unfin.value=1;
       accept.value=0;
       timeChoose.value="";
       city.value="";
       getOrderPage();
     }
      accept.onclick=function() {
       fin.value=0;
       unfin.value=0;
       accept.value=1;
       timeChoose.value="";
       city.value="";
       getOrderPage();
     }
     together.onclick=function(){
        window.location.href="http://localhost:1234/together.html";
     }
      homePage.onclick=function(){
         if(getCookie("user")==""||getCookie("picture")==""){
            window.location.href="http://localhost:1234/homePage.html";
        }else{
             window.location.href="http://localhost:1234/order.html";
        }
     }
     play.onclick=function(){
        window.location.href="http://localhost:1234/play.html";
     }
       var show=document.getElementById('show');
       var photo=document.getElementById('photo');
       //var userName=getCookie("user");
       show.innerText=getCookie("user");
       photo.style.background="url("+getCookie("picture")+") no-repeat 0px 0px";
       photo.style.backgroundSize="cover";
}
 function getOrder(pageNo){
  var fin=document.getElementById('finish').value;
  var unfin=document.getElementById('unfinish').value;
  var accept=document.getElementById('accept').value;
  var city=document.getElementById('cityChoice').value;
  var time=document.getElementById('timeChoice').value;
  var lookOrder=document.getElementById('lookOrder').getAttribute("name");
  var bestNew=document.getElementById('bestNew').value;
  var myOrder=document.getElementById('myOrder').value;
  var ap=document.getElementById('ap').value;
  var userName=getCookie("user");
  var data={
      userN:userName,
      city:city,
      fin:fin,
      unfin:unfin,
      accept:accept,
      time:time,
      page:pageNo,
      lookOrder:lookOrder,
      bestNew:bestNew,
      myOrder:myOrder,
      ap:ap
  }
         $.ajax({
             url:'http://127.0.0.1:1234/getOrder',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
           OrderList(data);
         },error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
      }

function OrderList(data){
  var order=document.getElementById('order');
  var lookOrder=document.getElementById('lookOrder');
  var txt="";
  var txt2="";
  var people="";
  var tel="";
  order.innerHTML="";
  for(var i=0;i<data.length;i++){
      //alert(data[i].passenger);
      if(lookOrder.getAttribute("name")=="0"){
              if(data[i].condtion=="已完成"){
                 txt="评价";
                 txt2="接单人:";
                 tel=data[i].driverTel;
                 people=data[i].driver;
                }
              if(data[i].condtion=='未完成'){
                 txt="取消";
                 txt2="接单人:";
                 people="暂无";
                 tel="暂无";
                }
                if(data[i].condtion=='已取消'){
                 txt2="接单人:";
                 people="无";
                 tel="无";
                 txt="无效";
                }
              if(data[i].condtion=='车在途中'){
                 txt="确认";
                 txt2="接单人:";
                 tel=data[i].driverTel;
                 people=data[i].driver;
                }
      }else{
        if(data[i].condtion=="已完成"){
                 txt2="乘客:";
                 tel=data[i].Ptel;
                 people=data[i].passenger;
                }
              if(data[i].condtion=='未完成'){
                 txt="接单";
                 txt2="乘客:";
                 people=data[i].passenger;
                 data[i].condtion='可接订单'
                 tel=data[i].Ptel;
                }
              if(data[i].condtion=='车在途中'){
                 txt2="乘客:";
                 people=data[i].passenger;
                 tel=data[i].Ptel;
                }
      }     
      order.innerHTML=order.innerHTML+"<div class='orderList' onclick='detail(this)'>"+
           "<div style='font-size: 20px;'>"+
             "<div style='float: left;margin-left: 10px;margin-top: 10px;'>出发城市：<span style='color: #7B7B7B;''>"+data[i].city+"</span></div>"+
             "<div style='float: left;margin-left: 20px;margin-top: 10px;''>出行时间：<span style='color: #7B7B7B;'>"+new Date(data[i].date).toLocaleString()+"</span></div>"+
             "<div style='float: left;margin-left: 20px;margin-top: 10px;''>订单号：<span style='color: #7B7B7B;'>"+data[i].orderNum+"</span></div>"+
             "<div style='float: left;margin-left: 20px;margin-top: 10px;'>订单状态：<span style='color: #7B7B7B;'>"+data[i].condtion+"</span></div>"+
             "</div>"+
             "<div style='margin-left: 20px;float: left;width: 73%;display:none'>"+
              "<div style='width: 130%;border: 0.5px dashed #CCCCCC;margin-top: 5px;margin-left: 0px;'></div>"+
                "<div style='float: left;font-size: 18px;margin-top: 10px;margin-left: 20px;'>出发地:<span style='color: #7B7B7B;'>"+data[i].SPlace+"</span></div>"+
                "<div style='float: left;font-size: 18px;margin-top: 10px;margin-left: 20px;'>目的地:<span style='color: #7B7B7B;'>"+data[i].EPlace+"</span></div>"+
             "</div>"+
              "<div class='driver' style='display:none'></div>"+
             "<div style='float: left;width: 16%;margin-top: 20px;display:none'>"+
               "<div style='font-size: 18px;'>"+txt2+"<span style='color: #7B7B7B;'><a>"+people+"</a></span></div>"+
               "<div style='font-size: 18px;'>电话:<span style='color: #7B7B7B;'>"+tel+"</span></div>"+
             "</div>"+
              "<div class='driver' style='display:none;color:#551A8B;width:50px;height:50px;' onclick='Cservice(this)'>"+txt+"</div>"+
             "</div>"
  }
}

function Cservice(obj){
        var driver=getCookie('user');
        var driverTel=getCookie('tel');
        var orderNum=obj.parentNode.firstChild.lastChild.previousSibling.innerText.substring(4);
        if(obj.innerText=="接单"){
             var mymessage=confirm("确认接单？");
             //alert(obj.parentNode.firstChild.lastChild.previousSibling.innerText)
                   if(mymessage==true){
                         var data={
                              active:"接单",
                              driver:driver,
                              driverTel:driverTel,
                              condtion:"车在途中",
                              orderNum:orderNum
                           }
         $.ajax({
             url:'http://127.0.0.1:1234/opOrder',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
             var timeChoose=document.getElementById('timeChoice');
             var city=document.getElementById('cityChoice');
             bestNew.value=2;
             myOrder.value=3;
             ap.value=2;
             timeChoose.value="";
             city.value="";
             getOrderPage();
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
     } else{}
        }else if(obj.innerText=="取消"){
            var mymessage=confirm("确认取消订单？");
                   if(mymessage==true){
                         var data={
                              active:"取消",
                              condtion:"已取消",
                              orderNum:orderNum
                           }
         $.ajax({
             url:'http://127.0.0.1:1234/opOrder',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
             var timeChoose=document.getElementById('timeChoice');
             var city=document.getElementById('cityChoice');
             var fin=document.getElementById('finish');
             var unfin=document.getElementById('unfinish');
             var accept=document.getElementById('accept');
             fin.value=0;
             unfin.value=1;
             accept.value=0;
             timeChoose.value="";
             city.value="";
             getOrderPage();
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
     }
                   else{
                    
                      }
        }else if(obj.innerText=="确认"){
            var mymessage=confirm("确认该订单？");
                   if(mymessage==true){
                     var data={
                              active:"确认",
                              condtion:"已完成",
                              orderNum:orderNum
                           }
         $.ajax({
             url:'http://127.0.0.1:1234/opOrder',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
             var timeChoose=document.getElementById('timeChoice');
             var city=document.getElementById('cityChoice');
             var fin=document.getElementById('finish');
             var unfin=document.getElementById('unfinish');
             var accept=document.getElementById('accept');
             fin.value=1;
             unfin.value=0;
             accept.value=0;
             timeChoose.value="";
             city.value="";
             getOrderPage();
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
    }else{}
        }else if(obj.innerText=="评价"){
          var lookuser=obj.previousSibling.firstChild.innerText.substring(4);
          var data={
                user:lookuser
          }
          addCookie("lookUser",lookuser,24);
           $.ajax({
            url: 'http://127.0.0.1:1234/getPhoto',
            data: data,
            dataType: 'jsonp',
            cache: false,
            timeout: 5000,
        jsonp: 'callback',
        jsonpCallback: 'jsonpCallback',
        success: function(data) {
           addCookie("lookPicture",data.picture,24);
           window.location.href="http://localhost:1234/personal.html";
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
          //alert(obj.previousSibling.firstChild.innerText.substring(4))
          //alert(obj.previousSibling.style.backgroundImage.substring(5,obj.previousSibling.style.backgroundImage.length-2))
        
        }else if(obj.innerText=="无效"){
            alert("无效订单,无法评论");
        }
}


function detail(obj){
  obj.style.height=103+"px";
  obj.style.marginTop=10+"px";
  obj.firstChild.nextSibling.style.display="block";
  //obj.firstChild.nextSibling.nextSibling.style.display="block";
  obj.firstChild.nextSibling.nextSibling.nextSibling.style.display="block";
  obj.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.style.display="block";
  //obj.innerHTML=obj.innerHTML+
}

   function userInfo(){
       var show=document.getElementById('show').innerText;
       var picture=document.getElementById('photo');
       var lookPicture=picture.style.backgroundImage.substring(5,picture.style.backgroundImage.length-2);
       addCookie("lookUser",show,24);
       addCookie("lookPicture",lookPicture,24);
       window.location.href="http://localhost:1234/personal.html";
    }

