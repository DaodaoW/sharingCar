function line(){
	var login=document.getElementById('login');
	var register=document.getElementById('register');
	var lLine=document.getElementById('lLine');
	var right=document.getElementById('right');
	var left=document.getElementById('left');
	var range=100;
	var rangeTwo=0;
	var count=0;
	register.onclick=function(){
		register.style.color="rgb(2,178,181)";
		login.style.color="black";
		 if(rangeTwo!=0){
		 	rangeTwo=0;
		 	count=0;
			lLine.style.marginLeft="368"+"px";
			left.style.display="none";
		    right.style.display="block";
		    right.style.marginLeft="100"+"px";
		    left.style.marginLeft="700"+"px";
		}else{
			count=0;
			setTimeout(action,1);
		}
	}
	login.onclick=function(){
		login.style.color="rgb(2,178,181)";
		register.style.color="black";
		if(range!=100){
			range=100;
			count=1;
			left.style.display="block";
		    right.style.display="none";
			lLine.style.marginLeft="268"+"px";
			left.style.marginLeft="100"+"px";
		}else{
			left.style.display="block";
		    right.style.display="none";
			count=1;
			setTimeout(actionTwo,1);
		}
	}
	function action(){
		if(range>0&&count==0){
			range=range-1;
			lLine.style.marginLeft=(368-range)+"px";
			left.style.marginLeft=(parseInt(left.style.marginLeft)+6.5)+"px";
			setTimeout(action,1);
		}else if(range==0){
			right.style.display="block";
			left.style.display="none";
			range=100;
			count=1;
		}
	}
	function actionTwo(){
		if(rangeTwo<100&&count==1){
			rangeTwo=rangeTwo+1;
			lLine.style.marginLeft=368-rangeTwo+"px";
			left.style.marginLeft=(parseInt(left.style.marginLeft)-5.5)+"px";
			setTimeout(actionTwo,1);
		}else{
			rangeTwo=0;
			count=0;
		}
	}
	
}
function borderUser(){
	var userName=document.getElementById('userName');
	userName.style.borderColor="rgb(169,169,169)";
}
function onblus1(){
	var userName=document.getElementById('userName');
	userName.style.borderColor="rgb(225,226,228)";
}
function borderPwd(){
	var pwd=document.getElementById('pwd');
	pwd.style.borderColor="rgb(169,169,169)";
}
function onblus2(){
	var pwd=document.getElementById('pwd');
	pwd.style.borderColor="rgb(225,226,228)";
}
line();

// var show=document.getElementById('show');
//  alert(show.innerText);
document.getElementById('userLogin').onclick = function(){
		var userName=document.getElementById('userName');
		var pwd=document.getElementById('pwd');
		var show=document.getElementById('show');
 		var picture=document.getElementById('picture');
		var user=userName.value;
        var password=pwd.value;
        var che=check();
        if(password==""&&user!=""){
            
        }else if(password!=""&&user!=""&&che==true){
            var data = {
            user: user,
            password: password
            };
     $.ajax({
            url: 'http://127.0.0.1:1234/login',
            data: data,
            dataType: 'json',
            timeout: 5000,
        success: function(data) {
            if(data.back=="success"){
            	changeImg();
            	show.innerText=user;
            	addCookie("user",data.user,24);
            	addCookie("picture",data.picture,24);
            	addCookie("tel",data.tel,24);
            	addCookie("sex",data.sex,24);
                picture.style.background="url("+data.picture+") no-repeat 0px 0px";
                picture.style.backgroundSize="cover";
                window.location.href=data.order;
                // document.getElementById("main").innerHTML = '<object type="text/html" data="/order.html" width="100%" height="100%"></object>';
  
            }else if(data.back=="fail"){
            	alert("登录失败");
            	changeImg();
                //pwd.value="";
                //signTwo.setAttribute('class', 'key');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
        }else{
        	alert("验证码错误");
        }
}