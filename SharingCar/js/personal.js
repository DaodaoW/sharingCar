  var nav=document.getElementById('nav');
  var main=document.getElementById('main');
  var newMain=document.getElementById('newMain');
  var layout=document.getElementById('layout');
  var scroll=getScrollbarWidth();//浏览器滚动条宽度
  var show=document.getElementById('show');
  var photo=document.getElementById('photo');
  var picture=document.getElementById('picture');
  var userId=document.getElementById('userId');
  var UN=getCookie("lookUser");
  var page=0;
  var count=0;
       show.innerText=getCookie("user");
       userId.innerText=getCookie("lookUser");
       photo.style.background="url("+getCookie("picture")+") no-repeat 0px 0px";
       photo.style.backgroundSize="cover";
       picture.style.background="url("+getCookie("lookPicture")+") no-repeat 0px 0px";
       picture.style.backgroundSize="cover";
  size();
  //浏览器窗口变化时页面自适应
  window.onresize = function(){
     if(document.body.clientWidth<1349){
        nav.style.width="1349"+"px";
        newMain.style.width="1349"+"px";
        layout.style.width="1349"+"px";
     }else{
        nav.style.width=(document.body.clientWidth)+"px";
        newMain.style.width=(document.body.clientWidth)+"px";
        layout.style.width=(document.body.clientWidth)+"px";
     }
}
    function size(){
        if(document.body.clientWidth<1349){
        nav.style.width="1349"+"px";
        layout.style.width="1349"+"px";
        newMain.style.width="1349"+"px";
     }else{
        nav.style.width=(document.body.clientWidth-scroll)+"px";
        layout.style.width=(document.body.clientWidth-scroll)+"px";
        newMain.style.width=(document.body.clientWidth-scroll)+"px";
     }
    }
    var together=document.getElementById('together');
    var homePage=document.getElementById('homePage');
    var play=document.getElementById('play');
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
     //计算浏览器滚动条宽度
     function getScrollbarWidth() {
                  var oP = document.createElement('p'),
                  styles = {
                         width: '100px',
                         height: '100px'
                     }, i, clientWidth1, clientWidth2, scrollbarWidth;
              for (i in styles) oP.style[i] = styles[i];
                          document.body.appendChild(oP);
                          clientWidth1 = oP.clientWidth;
                          oP.style.overflowY = 'scroll';
                          clientWidth2 = oP.clientWidth;
                          scrollbarWidth = clientWidth1 - clientWidth2;
                          oP.remove();
                          return scrollbarWidth;
     }
      function firstLoad(){
        var data = {
           page:page,
           UN:UN
         };
       $.ajax({
            url: 'http://127.0.0.1:1234/getpersonT',
            dataType: 'json',
            data:data,
            cache: false,
            timeout: 5000,
        success: function(data){
           layout.innerHTML="";
           setTogether(data) ;
           if(getCookie('user')==getCookie('lookUser')){
      var changeP=document.getElementById('changeP');
      changeP.innerHTML="<div style='cursor: pointer;font-size:15px;color:#707070;margin-top:105px;' class='userId'><span  onclick='changePhoto()'>更换头像</span>&nbsp&nbsp&nbsp&nbsp<span onclick='changeInfo()'>编辑信息</span></div>"+
                        "<input style='display: none;' id='changePhoto' type='file' >"    
     }   
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
      }
      firstLoad();
       var scrollFunc = function (e) {  
        e = e || window.event;  
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
            if (e.wheelDelta > 0) { //当滑轮向上滚动时  
              
            }  
            if (e.wheelDelta < 0) { //当滑轮向下滚动时  
               if(ScollPostion().top/ScollPostion().height>=0.4){
                var mainPage=document.getElementById('mainPage');
                 if(mainPage.getAttribute("name")==1){
                  load();
                 }
               }
            }  
        } else if (e.detail) {  //Firefox滑轮事件  
            if (e.detail> 0) { //当滑轮向上滚动时  
               //事件 
            }  
            if (e.detail< 0) { //当滑轮向下滚动时  
                //事件  
            }  
        }  
    }  
function load(){
                page=page+1;
             var data = {
                  page:page,
                  UN:UN
                 };
       $.ajax({
            url: 'http://127.0.0.1:1234/getpersonT',
            dataType: 'json',
            data:data,
            cache: false,
            timeout: 5000,
        success: function(data){
            //console.log(data);
        if(data.length==0&&count==0){
              window.onmousewheel = document.onmousewheel =function(){}; 
              if(count==0){
                 layout.innerHTML=layout.innerHTML+"<div style='text-alian:center;line-height:30px;width: 800px;text-align:center;margin-top: 10px;margin-left:280px;background-color:rgb(218,218,218)'>已加载全部</div>"
                 count=1;
              }
            
        }else if(data.length!=0&&count==0){
             setTogether(data);
        }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
}
      function ScollPostion() {//滚动条位置
             var t, l, w, h;
           if (document.documentElement && document.documentElement.scrollTop) {
                    t = document.documentElement.scrollTop;
                    l = document.documentElement.scrollLeft;
                    w = document.documentElement.scrollWidth;
                    h = document.documentElement.scrollHeight;
             } else if (document.body) {
                    t = document.body.scrollTop;
                    l = document.body.scrollLeft;
                    w = document.body.scrollWidth;
                    h = document.body.scrollHeight;
            }
                    return { top: t, left: l, width: w, height: h };
            }
         window.onmousewheel = document.onmousewheel = scrollFunc;

         //点击照片出现弹框并放大
     function ImageOnClick(obj){
            var alertWindow=document.getElementById('alertWindow');
            var showImage=document.getElementById('showImage');
            var imageclick=document.getElementById('imageclick');
            var realImage=document.getElementById('realImage');
            var close=document.getElementById('close');
            alertWindow.onclick=function (){
                 alertWindow.style.display="none";
                 showImage.style.display="none";
            }
            close.onclick=function (){
                 alertWindow.style.display="none";
                 showImage.style.display="none";
            }
            var str=obj.style.backgroundImage;
            var imageAddress=str.substring(str.indexOf('("')+2,str.indexOf('")'));
            alertWindow.style.display="block";
            showImage.style.display="block";
            var image = new Image();
            image.src = imageAddress;
                image.onload = function(){
                    if(image.width<100||image.height<200){
                             showImage.style.width=parseInt(image.width)*1+"px";
                             showImage.style.height=parseInt(image.height)*1+"px";
                             showImage.style.background="url("+imageAddress+") no-repeat 0px 0px";
                             showImage.style.backgroundSize="cover";
                             showImage.style.marginLeft=(1350-parseInt(image.width)*1)/2+"px";
                             showImage.style.marginTop=(670-parseInt(image.height)*1)/2+"px";
                    }else{
                             showImage.style.width=parseInt(image.width)*0.6+"px";
                             showImage.style.height=parseInt(image.height)*0.6+"px";
                             showImage.style.background="url("+imageAddress+") no-repeat 0px 0px";
                             showImage.style.backgroundSize="cover";
                             showImage.style.marginLeft=(1350-parseInt(image.width)*0.6)/2+"px";
                             showImage.style.marginTop=(670-parseInt(image.height)*0.6)/2+"px";
                    }
                            
              }
           
         } 

    //计算评论的高度
        function Cheight(Clength){
            var height;
            if(Clength+10<40){
                height=45;
                return height;
            }else{
                height=((Clength+10)/40)*20+22;
                return height;
            }
        }
    //用户留言框
    function message(obj){
        obj.style.height=60+"px";
        obj.placeholder="请输入200字以内的留言";
        obj.parentNode.style.height=120+"px";
        obj.parentNode.lastChild.style.display="block";
    }
    //回复其他用户
    function reply(obj){    
       if(obj.parentNode.parentNode.lastChild.firstChild.style.display=="none"){
        //autofocus='autofcous'
          obj.parentNode.parentNode.lastChild.firstChild.autofocus='autofcous';
          obj.parentNode.parentNode.lastChild.lastChild.style.display="block";
          obj.parentNode.parentNode.lastChild.firstChild.style.display="block";
          obj.parentNode.parentNode.lastChild.firstChild.placeholder="回复:"+obj.parentNode.previousSibling.firstChild.innerText;
          obj.parentNode.parentNode.style.height=parseInt(obj.parentNode.parentNode.style.height)+125+"px";
       }else{

       }
    }
    //用户留言提交
    function sub(obj){
        var sub=document.getElementById('sub');
        var auther=getCookie("user");
        var photoTwo=getCookie("picture");
        var tId=obj.parentNode.firstChild.id.substring(1);
        var discuss=obj.parentNode.firstChild.value;
        var myDate = new Date();
        var localDate2=localTime();
        if(discuss==""){
            alert("评论输入不能为空")
        }else{
           var data = {
                   auther:auther,
                   photoTwo:photoTwo,
                   tId:tId,
                   discuss:discuss,
                   localDate2:localDate2
                 };
       $.ajax({
            url: 'http://127.0.0.1:1234/insertCom',
            dataType: 'json',
            data:data,
            cache: false,
            timeout: 5000,
        success: function(data){
                if(data.back=="ok"){
                   obj.parentNode.firstChild.value="";
                   obj.parentNode.firstChild.style.height=25+"px";
                   obj.parentNode.firstChild.placeholder="想一起去？留言沟通吧";
                   obj.parentNode.firstChild.parentNode.style.height=50+"px";
                   obj.style.display="none";
                      comments(tId);
                }else{
                    alert("未知错误")
                }
        },
         error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
        }
       
    }
    function localTime(){
        var myDate = new Date();
        var localDate=myDate.toLocaleDateString();//+" "+myDate.toLocaleTimeString().substring(2);
        var time=myDate.toLocaleTimeString();
        var t=time.substring(0,2);
        if(t=="下午"){
             var littleTime=(parseInt(time.substring(2,4))+12);
             if(littleTime>=22){
               var realTime=myDate.toLocaleDateString()+" "+littleTime+time.substring(4);
             }else{
               var realTime=myDate.toLocaleDateString()+" "+littleTime+time.substring(3);
             }
        }else if(t=="上午"){
             var realTime=myDate.toLocaleDateString()+" "+time.substring(2);
        }
        return realTime;
    }
    //限制textarea的输入长度
    function text(obj){
        if(obj.value.length>198){
            obj.value=obj.value.substr(0,198);
        }
    }
    //获取评论回复
    function answer(h){
        var data={
          CId:h
        }
        $.ajax({
            url: 'http://127.0.0.1:1234/getReply',
            dataType: 'json',
            data:data,
            cache: false,
            timeout: 5000,
        success: function(data){
          if (data.back=="no") {
          }else{
            var Rid="R"+h;
            var reply=document.getElementById(Rid);
            for(var i=0;i<data.length;i++){
               if(Cheight(data[i].answer.length)==45){
                            var topD=-12+"px";
                          }else{
                            var topD=0+"px";
                          }
               reply.innerHTML=reply.innerHTML+"<div class='Rdiscuss' style='margin-left:40px';>"+
                                            "<div class='RcomUser' onclick='userInfoTwo(this)' style='background: url("+data[i].picture+") no-repeat 0px 0px;background-size:cover;'></div>"+
                                            "<span class='Rcomment' ><span style='color:#295C9D'>"+data[i].name+"</span>&nbsp<span style='color:black'>回复&nbsp</span><span style='color:#295C9D'>"+data[i].OtherName+"</span><span style='color:black'>&nbsp:</span>&nbsp"+data[i].answer+"</span></span>"+
                                              "<div class='RcomDate' style='margin-top:"+topD+"'>"+new Date(data[i].date).toLocaleString()+"<span></span><img onclick='replyTwo(this)' class='RuserReply' src='/replyIcon.png'/></div>"+
                                            "<div>"+
                                            "<textarea id='tea' class='RreplyWords' oninput='text(this)' style='display:none;'></textarea>"+
                                              "<div class='RsubTwo' id='RsubTwo' onclick='SecondAnswer(this)'>发表</div>"+
                                            "</div>"+
                                            "</div>" 
                  var Rheight=Cheight(data[i].answer.length);   
                  reply.parentNode.style.height=parseInt(reply.parentNode.style.height)+Rheight+5+"px"; 
            }
          }
          //alert(reply.innerHTML+reply.id) 
        },
         error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
        });
    }

     function replyTwo(obj){
       if(obj.parentNode.parentNode.lastChild.firstChild.style.display=="none"){
          obj.parentNode.parentNode.lastChild.lastChild.style.display="block";
          obj.parentNode.parentNode.lastChild.firstChild.style.display="block";
          obj.parentNode.parentNode.lastChild.firstChild.placeholder="回复:"+obj.parentNode.previousSibling.firstChild.innerText;
          obj.parentNode.parentNode.parentNode.parentNode.style.height=parseInt(obj.parentNode.parentNode.parentNode.parentNode.style.height)+110+"px";
       }
    }
    function answert(obj){
        var userName=getCookie('user');
        var RuserName=obj.parentNode.previousSibling.previousSibling.previousSibling.firstChild.innerText;
        var myDate = new Date();
        var localDate=localTime();
        var Rphoto=getCookie("picture");
        var CId=parseInt(obj.parentNode.previousSibling.id.substring(1));
        var tId=parseInt(obj.parentNode.parentNode.parentNode.id);
        var reply=obj.parentNode.firstChild.value;
          if(reply==""){
            alert("回复不能为空")
        }else{
           var data = {
                   auther:userName,
                   autherTwo:RuserName,
                   Rphoto:Rphoto,
                   CId:CId,
                   reply:reply,
                   localDate:localDate
                 };
       $.ajax({
            url: 'http://127.0.0.1:1234/insertReply',
            dataType: 'json',
            data:data,
            cache: false,
            timeout: 5000,
        success: function(data){
                if(data.back=="ok"){
                  obj.style.display="none";
                  obj.previousSibling.style.display="none";
                  obj.parentNode.parentNode.style.height=parseInt(obj.parentNode.parentNode.style.height)-125+"px";
                  comments(tId);
                }else{
                    alert("未知错误")
                }
        },
         error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
        }
    }
    //二级评论提交
    function SecondAnswer(obj){
        var userName=getCookie('user');
        var RuserName=obj.parentNode.previousSibling.previousSibling.firstChild.innerText;
        var reply=obj.parentNode.firstChild.value;
        var myDate = new Date();
        var localDate=localTime();
        var Rphoto=getCookie("picture");
        var CId=parseInt(obj.parentNode.parentNode.parentNode.id.substring(1));
        var tId=parseInt(obj.parentNode.parentNode.parentNode.parentNode.parentNode.id);
       if(reply==""){
            alert("回复不能为空")
        }else{
           var data = {
                   auther:userName,
                   autherTwo:RuserName,
                   Rphoto:Rphoto,
                   CId:CId,
                   reply:reply,
                   localDate:localDate
                 };
       $.ajax({
            url: 'http://127.0.0.1:1234/insertReply',
            dataType: 'json',
            data:data,
            cache: false,
            timeout: 5000,
        success: function(data){
                if(data.back=="ok"){
                  obj.style.display="none";
                  obj.previousSibling.style.display="none";
                  obj.parentNode.parentNode.style.height=parseInt(obj.parentNode.parentNode.style.height)-125+"px";
                  comments(tId);
                }else{
                    alert("未知错误")
                }
        },
         error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
        }
    }


    //获取评论
    function comments(tId){
           var comments={
                comments:tId
            }
            $.ajax({
            url: 'http://127.0.0.1:1234/comments',
            dataType: 'json',
            data:comments,
            cache: false,
            timeout: 5000,
        success: function(comments) {
                   // console.log(data)
                              var com=document.getElementById(tId);
                              com.innerHTML="";
                    for(var j=0;j<comments.length;j++){
                            var Comheight=Cheight(comments[j].comment.length)+"px";
                          if(Cheight(comments[j].comment.length)==45){
                            var topD=-12+"px";
                          }else{
                            var topD=0+"px";
                          }
                          // console.log(comments[j].CId);
                          var Dheight=Cheight(comments[j].comment.length-40)+"px";
                          com.innerHTML=com.innerHTML+"<div class='discuss' style='height:"+Comheight+"';>"+
                                                          "<div class='comUser' onclick='userInfoTwo(this)' style='background: url("+comments[j].picture+") no-repeat 0px 0px;background-size:cover;'></div>"+
                                                          "<span class='comment' ><span style='color:#295C9D'>"+comments[j].name+"</span>&nbsp:&nbsp"+comments[j].comment+"</span></span>"+
                                                          "<div class='comDate' style='margin-top:"+topD+"'>"+new Date(comments[j].date).toLocaleString()+"<img onclick='reply(this)' class='userReply' src='/replyIcon.png'/></div>"+
                                                        "<div id='R"+comments[j].CId+"'>"+  
                                                       "</div>"+   
                                                        "<div>"+
                                                           "<textarea class='replyWords' onBlur='messageEnd(this)' oninput='text(this)' style='display:none;'></textarea>"+
                                                           "<div class='subTwo' id='subTwo' onclick='answert(this)'>发表</div>"+
                                                       "</div>"+
                                                      "</div>"                     
                        answer(comments[j].CId);
                    }
            }
          });
    }

function setTogether(data){
      if(data[0].name==getCookie('user')){
         var del="删除";
      }else{
         var del="";
      }
      var imageHeight=0;
      if(data.length==1){
        layout.style.height=400+"px";
      }
          for(var i=0;i<data.length;i++){
                comments(data[i].tId);
            if(data[i].imageOne==""){
               imageHeight=0;
            }else{
               imageHeight=150;
            }
           layout.innerHTML=layout.innerHTML+"<div class='txt' id='txt'>"+
            "<div style='width: 100%;height: 90px;'>"+
                 "<div class='pictureTwo' id='pictureTwo' onclick='userInfoTwo(this)' style='background: url("+data[i].picture+") no-repeat 0px 0px;background-size:cover;'></div>"+
                 "<div style='float: left;'>"+
                     "<div class='userTwo' id='userTwo'>"+data[i].name+"</div>"+
                     "<div class='sex'  style='background: url(/"+data[i].sex+".png) no-repeat 0px 0px;background-size:cover;'></div>"+
                     "<div  class='userTwo' style='margin-left:70%;cursor:pointer' onclick='deleteTogether("+data[i].tId+")'>"+del+"</div>"+
                    "<div style='width: 700px;height: 30px;margin-top:55px;'>"+
                       "<div class='makeTime' id='makeTime'>"+new Date(data[i].date).toLocaleString().substring(0,10)+"</div>"+
                       "<div class='makeCity'><div class='local'></div>&nbsp&nbsp"+data[i].city+"-"+data[i].destination+"</div>"+
                       "<div class='makeCity'><a style='color:blue'>&nbsp&nbsp想去#</a>"+data[i].specificPlace+"</div>"+
                       "<div class='makeCity'><a style='color:blue'>人数#</a>"+data[i].people+"</div>"+
                       // "<div class='makeCity'><a style='color:blue'>来源#</a>"+data[i].identity+"</div>"+
                     "</div>"+
                 "</div>"+
            "</div>"+
            "<div style='width: 90%;'>"+
                 "<div style='margin-left: 30px;'>"+data[i].text+"</div>"+//<a style='color:blue'>&nbsp&nbsp路过#</a><a style='color:#707070'>"+data[i].passPlace+"</a>
            "</div>"+
             "<div style='width: 100%;height: "+imageHeight+"px;margin-top: 15px;'>"+data[i].imageOne+data[i].imageTwo+data[i].imageThree+data[i].imageFour+
             "</div>"+
             "<div class='wordLine'></div>"+
              "<div style='width:100%;' id='"+data[i].tId+"'>"+
             //   "<div style='width:100%;height:40px;border:1px solid red;margin-top:10px'>你是不是傻逼</div>"+
             "</div>"+
             "<div style='width: 100%;height: 50px;margin-top:10px;'>"+
             "<textarea oninput='text(this)' onfocus='message(this)' id='m"+data[i].tId+"' class='leaveWords' placeholder='想一起去?留言沟通吧' value=''></textarea>"+
             "<div class='sub' id='sub' onclick='sub(this)'>发表</div>"+
             // "<textarea class='textArea' placeholder='请输入200字以内的留言'></textarea>"
             "</div>"+
        "</div>"
          }     
   }


    function userInfo(){
       var show=document.getElementById('show').innerText;
       var picture=document.getElementById('photo');
       var lookPicture=picture.style.backgroundImage.substring(5,picture.style.backgroundImage.length-2);
       addCookie("lookUser",show,24);
       addCookie("lookPicture",lookPicture,24);
       window.location.href="http://localhost:1234/personal.html";
    }
   function userInfoTwo(obj){
       var lookuser=obj.nextSibling.firstChild.innerText;
       var lookPicture=obj.style.backgroundImage.substring(5,obj.style.backgroundImage.length-2);
       addCookie("lookUser",lookuser,24);
       addCookie("lookPicture",lookPicture,24);
       window.location.href="http://localhost:1234/personal.html";
   }
    function deleteTogether(tId){
        var data={tId:tId};
        $.ajax({
            url: 'http://127.0.0.1:1234/del',
            dataType: 'json',
            data:data,
            cache: false,
            timeout: 5000,
          success: function(comments) {
                window.location.href="http://localhost:1234/personal.html";
            }
          });
    }