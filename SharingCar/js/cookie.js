function addCookie(name,value,expiresHours){ 
		var cookieString=name+"="+value; 
		//alert(value)
//判断是否设置过期时间 
		if(expiresHours>0){ 
			var date=new Date(); 
			date.setTime(date.getTime+expiresHours*3600*1000); 
			cookieString=cookieString+"; expires="+date.toGMTString(); 
		} 
			document.cookie=cookieString; 
		} 
// addCookie("user","TheStar",2);
function getCookie(name){ 
		var strCookie=document.cookie; 
		var arrCookie=strCookie.split("; "); 
	for(var i=0;i<arrCookie.length;i++){ 
		var arr=arrCookie[i].split("="); 
		if(arr[0]==name)return arr[1]; 
	} 
		return ""; 
	} 
//alert(getCookie("user"));
function out(){
	var mymessage=confirm("确认注销？");
	if(mymessage==true){
		addCookie('user',"");
		window.location.href="http://localhost:1234/homePage.html";
	}else{

	}
}