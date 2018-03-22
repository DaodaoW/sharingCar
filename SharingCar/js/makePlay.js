var makePlay=document.getElementById('makePlay');
var makeT=document.getElementById('makeT');
var thisCity=document.getElementById('thisCity');
var closeMakeT=document.getElementById('closeMakeT');
var subMake=document.getElementById("subMake");
var Ttext=document.getElementById("Ttext");
var textTips=document.getElementById("textTips");
var file=document.getElementById("file");
var upImage=[];
// upImage=file.files;
makePlay.onclick=function(){
	makeT.style.display="block";
	setTimeout(makePlayAction,1);
	showCityInfo();
}
closeMakeT.onclick=function(){
	setTimeout(makePlayActionBack,1);
}
function makePlayAction(){
		var h=parseInt(makeT.style.top);
		if(h<111){
			makeT.style.top=(parseInt(makeT.style.top)+15)+"px";
			setTimeout(makePlayAction,1);
		}
}
function makePlayActionBack(){
		var h=parseInt(makeT.style.top);
		if(h>-511){
			makeT.style.top=(parseInt(makeT.style.top)-15)+"px";
			setTimeout(makePlayActionBack,1);
		}else{
			makeT.style.display="none";
		}
}
//获取所选图片的路径
function getObjectURL(file){   
            var url=null     
            if(window.createObjectURL!=undefined){ // basic    
                url=window.createObjectURL(file)    
            }else if(window.URL!=undefined){ // mozilla(firefox)  
                url=window.URL.createObjectURL(file)    
            } else if(window.webkitURL!=undefined){ // webkit or chrome    
                url=window.webkitURL.createObjectURL(file)  
            }    
            return url  ;  
        }
 //显示要上传的图片
file.onchange=function(){
	    give();
	    if(upImage.length>4){
	    	for(var i=0;i<4;i++){
	          var objUrl=getObjectURL(upImage[i]);    
	          var showImage=document.getElementById(i+5);
	          showImage.setAttribute("src",objUrl);
	      }	  
	    }else{
	    	for(var i=0;i<upImage.length;i++){
	          var objUrl=getObjectURL(upImage[i]);    
	          var showImage=document.getElementById(i+5);
	          showImage.setAttribute("src",objUrl);
	      }	  
	    }
			  	
   }
 //上传图片
 subMake.onclick=function(){
       if(Ttext.value==""){
       		textTips.style.display="block";
       		// subPlay(); 
       }else{
              subPlay();
       }  
 }
 //将输入到input的图片放入数组中
 function give(){
 	var j=upImage.length;
 	if((file.files.length+upImage.length)>4){
		for(var i=0;i<4;i++){
			upImage[i+j]=file.files[i];
		}	
	}else{
		for(var i=0;i<file.files.length;i++){
			upImage[i+j]=file.files[i];
		}
	}
}
 	
 //删除已选择图片
function deleteImage(obj){
	var num=parseInt(obj.getAttribute("id"))-5;
	upImage.splice(num,1);
	for(var i=0;i<4;i++){
          if(upImage[i]==undefined){
          	var showImage=document.getElementById(i+5);
          	showImage.setAttribute("src","/noimage2.png");
          }else{
          	var objUrl=getObjectURL(upImage[i]);   
            var showImage=document.getElementById(i+5);
            showImage.setAttribute("src",objUrl);
          }
      }	
	//obj.setAttribute("src","/noimage.png");
}

function listen(space,size){        
                var image = new Image();  
                image.onload=function(){
                       var width = image.width;  
                       var height = image.height;
                       if(size>50){
                       	  width=width*0.4;
                       	  height=height*0.4;
                       	  var imageSize={
                       	    width:width,
                       	    height:height
                         };
                          dealImage(space,imageSize); 
                       }else{
                       	  var imageSize={
                       	    width:width,
                       	    height:height
                           };
                          dealImage(space,imageSize); 
                       }      
                 }; 
                 //alert(objUrl) 
                image.src= space;  
     };    
//上传图片
function dealImage(path, obj){
		 var name=path.substring(28)+".png";
		 var img = new Image();
		 img.src = path;
		 img.onload = function(){
		  var that = this;
		  // 默认按比例压缩
		  var w = that.width,
		   h = that.height,
		   scale = w / h;
		   w = obj.width || w;
		   h = obj.height || (w / scale);
		  var quality = 0.7;  // 默认图片质量为0.8
		  //生成canvas
		  var canvas = document.createElement('canvas');
		  var ctx = canvas.getContext('2d');
		  // 创建属性节点
		  var anw = document.createAttribute("width");
		  anw.nodeValue = w;
		  var anh = document.createAttribute("height");
		  anh.nodeValue = h;
		  canvas.setAttributeNode(anw);
		  canvas.setAttributeNode(anh); 
		  ctx.drawImage(that, 0, 0, w, h);
		  // 图像质量
		  if(obj.quality && obj.quality <= 1 && obj.quality > 0){
		   quality = obj.quality;
		  }
		  // quality值越小，所绘制出的图像越模糊
		  var base64 = canvas.toDataURL('image/jpeg', quality );
		  //alert(base64)
		  // 回调函数返回base64的值
		  //callback(base64);
		     $.ajax({
		      url: 'http://127.0.0.1:1234/getPicture', 
		      data: {
		        image:base64,
		        pictureName:name
		      },
		      async: true,
		      dataType: 'json',
		       success: function(data){
		          if(data.back=="ok"){
		            //alert('上传成功');
		        }else{
		            alert('上传失败');
		        }
		    },
		      error: function(err){
		           alert('网络故障');
		        }
		    });
		 }
}
//上传计划内容
function subPlay(){
	var num=document.getElementById('num');
	// var makePassWay=document.getElementById('makePassWay');
	var myDate = new Date();
	var destination=document.getElementById('cityChoiceT').value;
	var specific=document.getElementById('specific').value;
    var localDate=localTime();
 	// var passPlace=makePassWay.value;
    var TogetherText=Ttext.value;
    var nameUser=getCookie('user');
    var personNum=1;
    if(num.value==""){
    	personNum=1;
    }else{
    	personNum=num.value;
    }
    var cityC=thisCity.getAttribute('name');
    var data={
    	date:localDate,
    	text:TogetherText,
    	name:nameUser,
    	people:personNum,
    	city:cityC,
    	// makePassWay:passPlace,
    	destination:destination,
    	specific:specific
    }
    if(destination==""){
    	alert("目的城市为空");
    }else if(specific==""){
    	alert("具体地点为空");
    }else{
    	    $.ajax({
		      url: 'http://127.0.0.1:1234/insertTogether', 
		      data: data,
		      async: true,
		      dataType: 'json',
		      success: function(data){
		      	var space=[];
		      	if(upImage.length!=0){
		      		for(var i=0;i<upImage.length;i++){
           			 var objUrl=getObjectURL(upImage[i]); 
           			 space[i]=objUrl;
                 	 var size=upImage[i].size/1024;     
      			 	 listen(objUrl,size);
              }
		      	subImage(data[0].tid,space);
		      }else{
		      	subImage(data[0].tid,space);
		      }
		      	
		    },
		      error: function(err){
		           //alert('网络故障');
		        }
		    });
    }

}
//将图片链接传到数据库
function subImage(id,space){
	var images=[];
	for(var i=0;i<space.length;i++){
		images[i]=space[i].substring(28)+".png";
	}
	var data={
		tId:id,
		images:images
	}
	 $.ajax({
		      url: 'http://127.0.0.1:1234/insertImage', 
		      data: data,
		      async: true,
		      dataType: 'json',
		      success: function(data){
		      	setTimeout(makePlayActionBack,1);
		      	setTimeout(function(){
		      		window.location.href="http://localhost:1234/together.html";
		      	},1000);	
		    },error: function(err){
		           //alert('网络故障');
		        }
		    });
      }
function showCityInfo(){
        var citysearch = new AMap.CitySearch();
        citysearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city;
                    var citybounds = result.bounds;
                    var newCity=cityinfo;
            	thisCity.setAttribute("name",newCity);
                if(newCity>4){
                	thisCity.innerText=newCity.substring(0,3)+"...";
                }else{
                	thisCity.innerText=newCity;
                }    
                }
            } else {
                document.getElementById('tip').innerHTML = result.info;
            }
        });
    }
// 获取图片大小，宽度
// function check(){  
// var input = document.getElementById("file");
// alert(getFilePath(input)) 
// console.log(input.value)
// if(input.files.length==0){
// 	alert("尚未选择图片");
// }else if(input.files){  
// 	//console.log(input.files)
//     //读取图片数据  
//   for(var i=0;i<input.files.length;i++){
//   var place=input.value;
//     //console.log(place)
//   var f = input.files[i];  
//   var reader = new FileReader();  
//   // reader.onload = function (e) {  
//   //     var data = e.target.result; 
//   //     console.log(data)
//   //     //加载图片获取图片真实宽度和高度  
//   //     var image = new Image();  
//   //     image.onload=function(){
//   //         var width = image.width;  
//   //         var height = image.height;  
//   //         //alert(width);
          
//   //     };  
//   //     image.src= data;  
//   // };  
//   var imageSize={
//                 width:500,
//                 height:400
//               }
//           dealImage(place,imageSize); 
//       reader.readAsDataURL(f);  
//   }
//   }else{  
//       var image = new Image();   
//       image.onload =function(){  
//           var width = image.width;  
//           var height = image.height;  
//           var fileSize = parseInt(image.fileSize)/1024;  
//       }  
//       image.src = input.value;  
//   } 
// }  