function borderUserT(){
	var user=document.getElementById('user');
	user.style.borderColor="rgb(169,169,169)";
}
function onblus1T(){
	var user=document.getElementById('user');
	user.style.borderColor="rgb(225,226,228)";
}
function borderPwdT(){
	var pwd=document.getElementById('password');
	pwd.style.borderColor="rgb(169,169,169)";
}
function onblus2T(){
	var pwd=document.getElementById('password');
	pwd.style.borderColor="rgb(225,226,228)";
}
function borderPwdT1(){
	var pwd=document.getElementById('passwordTwo');
	pwd.style.borderColor="rgb(169,169,169)";
}
function onblus2T1(){
	var pwd=document.getElementById('passwordTwo');
	pwd.style.borderColor="rgb(225,226,228)";
}
function borderTel(){
	var tel=document.getElementById('tel');
	tel.style.borderColor="rgb(169,169,169)";
}
function onblusTel(){
	var tel=document.getElementById('tel');
	tel.style.borderColor="rgb(225,226,228)";
}
var userRegister=document.getElementById('userRegister');
userRegister.onclick=function(){
	var userName=document.getElementById('user').value;
	var password=document.getElementById('password').value;
	var passwordTwo=document.getElementById('passwordTwo').value;
	var tel=document.getElementById('tel').value;
	if(userName==""||password==""||passwordTwo==""||tel==""){
		alert(请输入完整信息);
	}else if(password!=passwordTwo){
		alert("两次密码输入不相同");
	}else{
		 var data = {
                   userName:userName,
                   password:password,
                   tel:tel
                 };
       $.ajax({
            url: 'http://127.0.0.1:1234/registerUser',
            dataType: 'json',
            data:data,
            cache: false,
            timeout: 5000,
        success: function(data){
                if(data.back=="ok"){
                 alert("注册成功");
                 window.location.href="http://localhost:1234/homePage.html";
                }else{
                    alert("网络错误")
                }
        },
         error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
	}
}