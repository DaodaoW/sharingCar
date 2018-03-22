function ImageOnClick(obj){
            var alertWindow=document.getElementById('alertWindow');
            var showImage=document.getElementById('showImage');
            var show=document.getElementById('show');
            alertWindow.onclick=function (){
                 alertWindow.style.display="none";
                 show.style.display="none";
                 window.parent.nav.navStyle.display="block";
            }
            showImage.onclick=function (){
                 alertWindow.style.display="none";
                 show.style.display="none";
                 //window.parent.nav.navStyle.display="block";
            }
             var str=obj.style.backgroundImage;
             var imageAddress=str.substring(4,str.length-1);
             alertWindow.style.display="block";
             show.style.display="block";
             showImage.setAttribute("src",imageAddress);
             window.parent.nav.navStyle.display="none";
             showImage.style.paddingTop=document.body.clientHeight/3.5+"px";
             // showImage.style.paddingLeft=(document.body.clientWidth-showImage.style.width)/2+"px";
         } 
function ImageOn(obj){
            var alertWindow=document.getElementById('alertWindowT');
            var showImage=document.getElementById('showImageT');
            var show=document.getElementById('showT');
            window.parent.nav.navStyle.display="none";
            showOne.show=false;
            alertWindow.onclick=function (){
                 alertWindow.style.display="none";
                 show.style.display="none";
            }
            showImage.onclick=function (){
                 alertWindow.style.display="none";
                 show.style.display="none";
                 window.parent.nav.navStyle.display="none";
            }
             var str=obj.style.backgroundImage;
             var imageAddress=str.substring(4,str.length-1);
             alertWindow.style.display="block";
             show.style.display="block";
             showImage.setAttribute("src",imageAddress);
             showImage.style.paddingTop=document.body.clientHeight/3.5+"px";
         } 