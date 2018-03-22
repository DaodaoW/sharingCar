window.onload=function(){
	var nav=document.getElementById('nav');
	var main=document.getElementById('main');
	//var goodMap=document.getElementById('map');
	//var scroll=getScrollbarWidth();//浏览器滚动条宽度
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
     //计算浏览器滚动条的宽度
     //    function getScrollbarWidth() {
     //              var oP = document.createElement('p'),
     //              styles = {
     //                 width: '100px',
     //                     height: '100px'
     //                 }, i, clientWidth1, clientWidth2, scrollbarWidth;
     //          for (i in styles) oP.style[i] = styles[i];
     //                      document.body.appendChild(oP);
     //                      clientWidth1 = oP.clientWidth;
     //                  oP.style.overflowY = 'scroll';
     //                  clientWidth2 = oP.clientWidth;
     //                  scrollbarWidth = clientWidth1 - clientWidth2;
     //                  oP.remove();
     //                  return scrollbarWidth;
     // }
    var together=document.getElementById('together');
    var homePage=document.getElementById('homePage');
    var play=document.getElementById('play');
     together.onclick=function(){
      if(getCookie('user')==""){
         window.location.href="http://localhost:1234/homePage.html";
      }else{
        window.location.href="http://localhost:1234/together.html";
      } 
     }
      homePage.onclick=function(){
        window.location.href="http://localhost:1234/homePage.html";
     }
       play.onclick=function(){
        if(getCookie('user')==""){
         window.location.href="http://localhost:1234/homePage.html";
        }else{
         window.location.href="http://localhost:1234/play.html";
        } 
     }
}
   function userInfo(){
       var show=document.getElementById('show').innerText;
       var picture=document.getElementById('picture');
       var lookPicture=picture.style.backgroundImage.substring(5,picture.style.backgroundImage.length-2);
       addCookie("lookUser",show,24);
       addCookie("lookPicture",lookPicture,24);
       window.location.href="http://localhost:1234/personal.html";
    }
