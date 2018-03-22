var mainPage=document.getElementById('mainPage');
var com=document.getElementById('com');
var personM=document.getElementById('personM');
var subFour=document.getElementById('subFour');
var leaveOfL=document.getElementById('leaveOfL');
var leaveWords3=document.getElementById('leaveWords3');
mainPage.onclick=function(){
	mainPage.setAttribute("name","1");
	com.style.background="url(/comment.png) no-repeat 0px 0px";
    com.style.backgroundSize="cover";
    mainPage.style.background="url(/mainPage2.png) no-repeat 0px 0px";
    mainPage.style.backgroundSize="cover";
    personM.style.background="url(/person.png) no-repeat 0px 0px";
    personM.style.backgroundSize="cover";
	window.location.href="http://localhost:1234/personal.html"
}
com.onclick=function(){
	//layout.style.height=800+"px";
	mainPage.setAttribute("name","0");
	com.style.background="url(/comment2.png) no-repeat 0px 0px";
    com.style.backgroundSize="cover";
    mainPage.style.background="url(/mainPage.png) no-repeat 0px 0px";
    mainPage.style.backgroundSize="cover";
    personM.style.background="url(/person.png) no-repeat 0px 0px";
    personM.style.backgroundSize="cover";
	innerLayout();
	getLeaveWords();
}
personM.onclick=function(){
	 mainPage.setAttribute("name","0");
	 mainPage.style.background="url(/mainPage.png) no-repeat 0px 0px";
     mainPage.style.backgroundSize="cover";
	 com.style.background="url(/comment.png) no-repeat 0px 0px";
     com.style.backgroundSize="cover";
     personM.style.background="url(/person2.png) no-repeat 0px 0px";
     personM.style.backgroundSize="cover";
	 getUserInfo();
}
//用户一次留言
function getLeaveWords(){
	var lookUser=getCookie('lookUser');
	var data={
		lookUser:lookUser
	}
	$.ajax({
             url:'http://127.0.0.1:1234/getLeaveWords',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
             showWords(data);
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
}
function showWords(data){
	for(var i=0;i<data.length;i++){
		layout.innerHTML=layout.innerHTML+"<div class='leaveW'>"+data[i].words+"</div>"+
	                 "<div class='leaverInfo'>"+
	                 		"<div class='newPhoto' style='background: url("+data[i].picture+") no-repeat 0px 0px;background-size:cover;'></div>"+
	                 		"<div class='leaverName'>"+data[i].nameOfLea+"</div>"+
	                        "<div class='leaveDate'><span>于</span>"+new Date(data[i].date).toLocaleString()+"</div>"+
	                        "<div class='leavetips'>给你留言</div>"+
	                        "<div class='leavetips2' onclick='replyLeave(this)'>评论</div>"+
	                        "<div class='report' onclick='report(this)'>举报</div>"+
	                 "</div>"+
	                 "<div id='W"+data[i].WId+"'>"+
	                 		
	                 "</div>"+
	                 "<div class='fgLine'></div>"
	                 replyanswer(data[i].WId)
	}
}
function leaveSub(obj){
	var words=obj.previousSibling.value;
	var nameOfLea=getCookie('user');
	var nameBe=getCookie('lookUser');
	var myDate = new Date();
    var localDate=localTime();
    if(words==""){
    	alert("留言不能为空");
    }else{
    	var good={
    	name:nameOfLea
    }
    //console.log(good)
    $.ajax({
             url:'http://127.0.0.1:1234/getFinishCount',
             data: good,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
          	if(data[0].num==0){
          		alert("完成一次拼车才能评论")
          	}else{
          		 var data={
					words:words,
					nameOfLea:nameOfLea,
					nameBe:nameBe,
					date:localDate
	           }
				$.ajax({
			             url:'http://127.0.0.1:1234/insertWords',
			             data: data,
			             dataType: 'json',
			             cache: false,
			             timeout: 5000,
			          success: function(data) {
			          	 layout.innerHTML="";
			          	 innerLayout();
			             getLeaveWords();
			         },
			          error: function(jqXHR, textStatus, errorThrown) {
			              console.log(textStatus + ' ' + errorThrown);
			          }
			       });
          	}
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
   
    }
    //alert(localDate)
}
function innerLayout(){
	layout.innerHTML="<div class='fgLine'></div>"+
	                 "<textarea class='leaveWords2' placeholder='吐槽、扯淡、评价.......想说啥就说啥！'></textarea>"+
	                 "<div class='subThree' id='subThree' onclick='leaveSub(this)'>发表</div>"+
	                 "<div class='fgLine'></div>"
}
//评论留言
function replyanswer(WId){
		var data={
			WId:WId
		}
		$.ajax({
             url:'http://127.0.0.1:1234/getLeaveWordsRep',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
          	var W="W"+WId;
          	var replyWords=document.getElementById(W);
          	for(var i=0;i<data.length;i++){
          		replyWords.innerHTML=replyWords.innerHTML+"<div class='replyStyle'>"+data[i].ReplyWords+"</div>"+
	                 		"<div>"+
	                 			"<div class='leaverInfoTwo'>"+
	                 			 "<div class='newPhoto2' style='background: url("+data[i].picture+") no-repeat 0px 0px;background-size:cover;'></div>"+
	                 				"<div class='leaverName2'>"+data[i].nameOfRep+"</div>"+
	                        		"<div class='leaveDate2'><span>在</span>"+new Date(data[i].date).toLocaleString()+"</div>"+
	                        		"<div class='leavetips3'></div><div style='float:left;margin-top:11px;color:#8E8E8E;'>回复："+data[i].name+"</div>"+
	                       		    "<div class='leavetips4' onclick='replyLeaveTwo(this)'>评论</div>"+
	                			 "</div>"+
	                 		"</div>"
          	}
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
}
function replyLeave(obj){
		leaveOfL.style.display="block";
		var WId=obj.parentNode.nextSibling.getAttribute("id").substring(1);
		leaveWords3.setAttribute("name",WId);
		leaveWords3.placeholder="回复:"+obj.previousSibling.previousSibling.previousSibling.innerText;
		setTimeout(replyAction,1);
}
function replyLeaveTwo(obj){
		leaveOfL.style.display="block";
	    var WId=obj.parentNode.parentNode.parentNode.getAttribute("id").substring(1);
	    leaveWords3.setAttribute("name",WId);
		leaveWords3.placeholder="回复:"+obj.previousSibling.previousSibling.previousSibling.previousSibling.innerText;
		setTimeout(replyAction,1);
}
function replyAction(){
		var h=parseInt(leaveOfL.style.bottom);
		if(h<0){
			leaveOfL.style.bottom=(parseInt(leaveOfL.style.bottom)+3)+"px";
			setTimeout(replyAction,1);
		}
}
function replyActionBack(){
		var h=parseInt(leaveOfL.style.bottom);
		if(h>-150){
			leaveOfL.style.bottom=(parseInt(leaveOfL.style.bottom)-3)+"px";
			setTimeout(replyActionBack,1);
		}else{
			leaveOfL.style.display="none";
		}
}
function noSubFour(){
		setTimeout(replyActionBack,1);
}
function subFourRep(){
	var words=document.getElementById('leaveWords3').value;
	var nameOfRep=getCookie("user");
	var nameBe=document.getElementById('leaveWords3').getAttribute("placeholder").substring(3);
	var WId=document.getElementById('leaveWords3').getAttribute("name");
	var myDate = new Date();
    var localDate=localTime();
    var good={
    	name:nameOfRep
    }
    //console.log(good)
    $.ajax({
             url:'http://127.0.0.1:1234/getFinishCount',
             data: good,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
          	if(data[0].num==0){
          		alert("完成一次拼车才能评论")
          	}else{
          		var data={
					words:words,
					nameOfRep:nameOfRep,
					nameBe:nameBe,
					date:localDate,
					WId:WId
	            }
				$.ajax({
			             url:'http://127.0.0.1:1234/insertRepLea',
			             data: data,
			             dataType: 'json',
			             cache: false,
			             timeout: 5000,
			          success: function(data) {
			          	if(data.back=="ok"){
			          		innerLayout();
				            getLeaveWords();
				            leaveWords3.value="";
				            setTimeout(replyActionBack,1);
			          	}
			         },
			          error: function(jqXHR, textStatus, errorThrown) {
			              console.log(textStatus + ' ' + errorThrown);
			          }
			       });
          	}
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
}
   function userInfo(){
       var show=document.getElementById('show').innerText;
       var picture=document.getElementById('photo');
       var lookPicture=picture.style.backgroundImage.substring(5,picture.style.backgroundImage.length-2);
       addCookie("lookUser",show,24);
       addCookie("lookPicture",lookPicture,24);
       window.location.href="http://localhost:1234/personal.html";
    }
   function getUserInfo(){
	var user=getCookie("lookUser")
	var data={
		user:user
	}
		$.ajax({
             url:'http://127.0.0.1:1234/userInfo',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
          	setUserInfo(data);
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
}
function setUserInfo(data2){
	 layout.innerHTML="";
	 var ident="";
	 var identTwo="";
	 var lookUser=getCookie('lookUser');
	 var good={
    	name:lookUser
    }
	$.ajax({
             url:'http://127.0.0.1:1234/getFinishCount',
             data: good,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
          	//data[0].num
				  if(data2[0].identity=="车主"){
					 	ident="已认证";
					 }else if(getCookie('user')==getCookie('lookUser')){
					 	ident="<a onclick='attestation(this)' style='color:blue;cursor:pointer'>点击认证</a>";
					 	identTwo="尚未认证";
					 }else{
					 	ident="尚未认证";
					 	identTwo="尚未认证";
					 }
					 if(data2[0].sex="man"){
					 	data2[0].sex="男";
					 }else{
					 	data2[0].sex="女";
					 }
					 var tel=data2[0].tel.substring(0,3)+"****"+data2[0].tel.substring(7);
					 layout.innerHTML=layout.innerHTML+"<div style='width:50%;height:350px;margin-top:50px;float:left'>"+
					 										// "<div class='usertips1'></div><div class='four'>"+data[0].realName+"</div>"+
					 										"<div class='usertips2'></div><div class='four'>"+data2[0].sex+"</div>"+
					 										"<div class='usertips3'></div><div class='four'>"+tel+"</div>"+
					 										"<div class='usertips4'></div><div class='four'>"+ident+"</div>"+
					                                  "</div>"
					 showCer(identTwo);
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
	 
}
//车主认证
function attestation(obj){
	var attest=document.getElementById('attest');
	attest.style.display="block";
	attest.setAttribute("class","attestation");
}
//关闭车主认证框
function close2(){
	var attest=document.getElementById('attest');
	attest.setAttribute("class","attestationBack");
}
//修改用户资料
function changeInfo(){
	var change=document.getElementById('InfoMsg');
	var username=document.getElementById('uName');
	var tel=document.getElementById('telNum');
	change.setAttribute("class","changeInfo");
	username.value=getCookie('user');
	tel.value=getCookie('tel');
	var man=document.getElementById('man');
	var woman=document.getElementById('woman');
	if(getCookie("sex")=="man"){
		man.setAttribute('checked',"checked");
		man.setAttribute("check","man");
	}else{
		woman.setAttribute('checked',"checked");
		woman.setAttribute("check","woman");
	}
	man.onchange=function(){
		man.setAttribute("check","man");
		woman.setAttribute("check","");
	}
	woman.onchange=function(){
		woman.setAttribute("check","woman");
		man.setAttribute("check","");
	}
}
function stopChange(){
	var change=document.getElementById('InfoMsg');
	change.setAttribute("class","");
}
function changeMsg(){
	var username=document.getElementById('uName').value;
	var tel=document.getElementById('telNum').value;
	var man=document.getElementById('man');
	var woman=document.getElementById('woman');
	var sex=null;
	if(man.getAttribute("check")=="man"){
		sex="man";
	}else{
		sex="woman";
	}
	if(sex==getCookie('sex')&&username==getCookie('user')&&tel==getCookie('tel')){
		alert("未修改");
	}else{
		var data={
			tel:tel,
			userName:getCookie('user'),
			sex:sex,
			username:username
		}
		$.ajax({
			url:"http://127.0.0.1:1234/changeUser",
			data:data,
			datatype:"json",
			async: true,
			timeout: 5000,
			success:function(data){
				addCookie('user',username,24);
				addCookie('lookUser',username,24);
				addCookie('tel',tel,24);
				addCookie('sex',sex,24);
				window.location.href="http://localhost:1234/personal.html";
			},
			error:function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
		})
	}
}
//更换头像
function changePhoto(){
	document.getElementById("changePhoto").click();
	var file=document.getElementById("changePhoto");
	document.getElementById("changePhoto").onchange=function(){
		if(file.files.length>1){

		}else{
			//console.log(getObjectURL(file.files[0])); 
	        var size=file.files[0].size/1024;
	        listen(getObjectURL(file.files[0]),size);
		}
	}
}
//控制图片大小
function listen(space,size){        
                var image = new Image();  
                image.onload=function(){
                       var width = image.width;  
                       var height = image.height;
                       if(size>50){
                       	  width=width*0.2;
                       	  height=height*0.2;
                       	  var imageSize={
                       	    width:width,
                       	    height:height
                         };
                          dealImage(space,imageSize); 
                       }else{
                       	  width=width*0.5;
                       	  height=height*0.5;
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
		  var quality = 1;  // 默认图片质量为0.8
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
		  var base64 = canvas.toDataURL('image/jpeg',quality);
		  //alert(base64)
		  // 回调函数返回base64的值
		  //callback(base64);
		     $.ajax({
		      url: 'http://127.0.0.1:1234/upPhoto', 
		      data: {
		        image:base64,
		        pictureName:name
		      },
		      async: true,
		      dataType: 'json',
		       success: function(data){
		          if(data.back=="ok"){
		            photo(name);
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
function photo(name){
	var user=getCookie('user');
	var data={
		photo:name,
		userName:user
	}
		$.ajax({
             url:'http://127.0.0.1:1234/changePhoto',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
          	addCookie('picture',name);
          	addCookie('lookPicture',name);
          	window.location.href="http://localhost:1234/personal.html";
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
}
//获取图片路径
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
//提交车主申请
function subCer(){
	var cer1=document.getElementById('cer1').value;
	var cer2=document.getElementById('cer2').value;
	var cer3=document.getElementById('cer3').value;
	var cer4=document.getElementById('cer4').value;
	var cer5=document.getElementById('cer5').value;
	var cer6=document.getElementById('cer6').value;
	var cer7=document.getElementById('cer7').value;
	var cer8=document.getElementById('cer8').value;
	var cer9=document.getElementById('cer9').value;
	var cer10=document.getElementById('cer10').value;
	var cer11=document.getElementById('cer11').value;
	var userName=getCookie("user");
	var data={
		cer1:cer1,
		cer2:cer2,
		cer3:cer3,
		cer4:cer4,
		cer5:cer5,
		cer6:cer6,
		cer7:cer7,
		cer8:cer8,
		cer9:cer9,
		cer10:cer10,
		cer11:cer11,
		userName:userName
	}
	if(cer1==""||cer2==""||cer3==""||cer4==""||cer5==""||cer6==""||cer7==""||cer8==""||cer9==""||cer10==""||cer11==""){
		alert("信息不完整");
	}else{
		$.ajax({
             url:'http://127.0.0.1:1234/insertCer',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
          	 alert("提交成功，请耐心等待审核");
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
	}
	// checkCer();
}
//检测是否有在申请车主
function checkCer(){
	var name=getCookie("user");
	var data={
		userName:name
	}
	$.ajax({
             url:'http://127.0.0.1:1234/getCerCount',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
          	if(data[0].num!=0){
          		alert("已有申请未审核，请耐心等待...")
          	}else{
          		subCer();
          	}
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });
}
//车主展示
function showCer(ident){
	var lookUser=getCookie('lookUser');
	var data={
		userName:lookUser
	}
	if (ident=="尚未认证") {
		layout.innerHTML=layout.innerHTML+"<div class='show'>"+
				// "<div class='usertips1'></div><div class='four'>"+data[0].realName+"</div>"+
						"<div style='margin-left:140px;margin-top:120px;color:#FFF;font-size:20px;'>认证信息</div>"+
						"<div style='margin-left:90px;margin-top:40px;color:#FFF;font-size:50px;'>尚未认证</div>"+
		    	"</div>"
	}else{
		$.ajax({
             url:'http://127.0.0.1:1234/getCer',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
          	layout.innerHTML=layout.innerHTML+"<div class='show'>"+
				// "<div class='usertips1'></div><div class='four'>"+data[0].realName+"</div>"+
						"<div style='margin-left:140px;margin-top:120px;color:#FFF;font-size:20px;'>认证信息</div>"+
						"<div style='margin-left:100px;margin-top:20px;color:#FFF;font-size:16px;'>车牌号<span style='margin-left:50px;'>"+data[0].plates+"</span></div>"+
						"<div style='margin-left:100px;margin-top:20px;color:#FFF;font-size:16px;'>车型<span style='margin-left:65px;'>"+data[0].color+"</span></div>"+
						"<div style='margin-left:100px;margin-top:20px;color:#FFF;font-size:16px;'>颜色<span style='margin-left:65px;'>"+data[0].model+"</span></div>"+
						"<div style='margin-left:100px;margin-top:20px;color:#FFF;font-size:16px;'>驾龄<span style='margin-left:65px;'>"+data[0].age+"</span></div>"+
		    	"</div>"
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });	
	}
}
//举报留言
function report(obj){
	var reason;
	reason=prompt("请输入举报理由");
	var message=confirm("确认举报该留言？");
	if(message==true){
		var text=obj.parentNode.previousSibling.innerText;
		var WId=parseInt(obj.parentNode.nextSibling.getAttribute("id").substring(1));
		var reporter=getCookie('user');
		var myDate = new Date();
        var localDate=localTime();
		var data={
			text:text,
			reason:reason,
			WId:WId,
			reporter:reporter,
			date:localDate
		}
		$.ajax({
             url:'http://127.0.0.1:1234/reportLeave',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
          	if(date.back=="ok"){
          	  alert("举报成功");
          	}else{
          	  alert("网络错误");
          	}
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });	
	}else{

	}
}


