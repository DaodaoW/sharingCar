var titpanel=new Vue({
	el:"#titpanel",
	data:{
		photo:"/avtar.png",
		userName:"尚未登录",
		toollist:true,
		list:[{tip:"我的留言",icon:"myleave.png"},{tip:"车主信息",icon:"carMsg.png"},{tip:"车主认证",icon:"carIdent.png"}]
		//icon:["carMsg.png","carIdent.png","myleave.png"]
	},
	methods:{
		getUserInfo:function(){
			if(getCookie('user')==""){
				this.userName="尚未登录";
				this.photo="/avtar.png";
			}else{
				this.userName=getCookie('user');
				this.photo=getCookie('picture');
			}
		},
		userMsg:function(){
			if(getCookie('user')==""){
				headP.page();
			}else{
				showThree.tel=getCookie('tel').substring(0,3)+"****"+getCookie('tel').substring(7,11);
				showThree.userName=getCookie('user');
				showThree.sex=getCookie('sex')+".png";
				showThree.photo=getCookie('picture');
				window.parent.nav.navStyle.display="none";
			    showThree.showTwoStyle.display="block";
			    showThree.show=true;
			}
		},
		toright:function(index){
			if(index==0) {
				showOne.title="我的留言";
				var lookUser=getCookie('user');
				if(lookUser==""){
					headP.page();
				}else{
					addCookie('lookUser',lookUser);
					window.parent.nav.navStyle.display="none";
				    showOne.showOneStyle.display="block";
				    showOne.show=true;
				    showOne.getleaveWords(lookUser);
				}
			}
			if(index==1){
				if(getCookie('identity')=="driver"){
					showOne.title="车主信息";
				    window.parent.nav.navStyle.display="none";
			        showTwo.showTwoStyle.display="block";
			        showTwo.show=true;
				}else if(getCookie('user')==""){
					headP.page();
				}else{
					alert("您还不是车主");
				}
			}
			if(index==2){
				// showOne.rep="";
				// showOne.title="车主认证";
				alert("请于电脑端认证");
			}
		}
	},
	mounted(){
		this.getUserInfo();
	}
})


var showOne=new Vue({
	el:"#showOne",
	data:{
		title:"我的留言",
		showOneStyle:{
			display:"none"
		},
		show:false,
		leaveWord:[],
		reply:[],
		judge:false,
		tId:""
	},
	methods:{
		toleft:function(){
			showOne.show=false;
			setTimeout(function(){
				showOne.showOneStyle.display="none";
				showOne.leaveWord=[];
				showOne.reply=[];
				window.parent.nav.navStyle.display="block";
			},200);
		   // this.showOneStyle.display="none";
		},
		getleaveWords:function(lookUser){
	        var data={
		               lookUser:lookUser
	                 }
			$.ajax({
		             url:'http://10.26.236.3:1234/getLeaveWords',
		             data: data,
		             dataType: 'json',
		             cache: false,
		             timeout: 5000,
		          success: function(data) {
		          	showOne.reply=[];
		            for(var i=0;i<data.length;i++){
		            	 data[i].date=new Date(data[i].date).toLocaleString();
		            	 showOne.getleaveWordR(data[i].WId);
		             }
		             showOne.leaveWord=data;
		         },
		          error: function(jqXHR, textStatus, errorThrown) {
		              console.log(textStatus + ' ' + errorThrown);
		          }
		       });
		},
		getleaveWordR:function(WId){
			var data={
			    WId:WId
		    }
			$.ajax({
		             url:'http://10.26.236.3:1234/getLeaveWordsRep',
		             data: data,
		             dataType: 'json',
		             cache: false,
		             timeout: 5000,
		          success: function(data) {
		          	for(var i=0;i<data.length;i++){
		            	 data[i].date=new Date(data[i].date).toLocaleString();
		            	 showOne.reply.push(data[i]);
		             }
		          },
		          error: function(jqXHR, textStatus, errorThrown) {
		              console.log(textStatus + ' ' + errorThrown);
		          }
	          });
		},
		 replyPerson:function(name,Id){
		 	// alert("kk")
            if(name!=undefined){
                showInput.pla="回复"+name+":";
                showOne.judge=true;
                showInput.otherName=name;
                showInput.WId=Id;
            }else{
                showInput.pla="想说什么就说什么...";
                showOne.judge=false;
                // showInput.tId=this.tId;
                // alert(showInput.tId)
            }
            showInput.showInputStyle.display="block";
            window.parent.nav.navStyle.display="none";
            showInput.action=true;
        }
	}
})


//车主信息页
var showTwo=new Vue({
	el:"#showTwo",
	data:{
		title:"车主信息",
		showTwoStyle:{
			display:"none"
		},
		show:false,
		mode:"",
		age:"",
		color:"",
		num:""
	},
	methods:{
		toleft:function(){
			showTwo.show=false;
			window.parent.nav.navStyle.display="block";
			setTimeout(function(){
				showTwo.showTwoStyle.display="none";
			},500);
		   // this.showOneStyle.display="none";
		  },
		 showDriver:function(){
		 	var userName=getCookie('user');
		 	var data={
		 		userName:userName
		 	}
		 	$.ajax({
             url:'http://10.26.236.3:1234/getCer',
             data: data,
             dataType: 'json',
             cache: false,
             timeout: 5000,
          success: function(data) {
          	 showTwo.num=data[0].plates;
          	 showTwo.age=data[0].age;
          	 showTwo.color=data[0].color;
          	 showTwo.mode=data[0].model;
         },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus + ' ' + errorThrown);
          }
       });	
		 }
	},
	mounted(){
		this.showDriver();
	}
})
//用户信息页
var showThree=new Vue({
	el:"#showThree",
	data:{
		title:"我的主页",
		showTwoStyle:{
			display:"none"
		},
		show:false,
		tel:"",
		sex:"",
		userName:"",
		photo:""
	},
	methods:{
		toleft:function(){
			showThree.show=false;
			window.parent.nav.navStyle.display="block";
			setTimeout(function(){
				showThree.showTwoStyle.display="none";
			},500);
		  },
		outofLogin:function(){
	            	addCookie("user","");
            	    addCookie("picture","");
            	    addCookie("tel","");
            	    addCookie("sex","");
            	    addCookie("identity","");
            	    this.toleft();
	            	titpanel.getUserInfo();
		}
		}
})

var headTip=new Vue({
	el:"#headTip",
	data:{
		mine:true
	},
	methods:{

	}
})

var headP=new Vue({
	el:'#headP',
	data:{
		title:"注册账号",
		Active1:false,
		Active:false,
		ActiveTwo:false,
		start:false,
		user:"",
 		password:"",
 		Active2:false,
		ActiveTwo2:false,
		test:{
			display:"none"
		},
		login:{
			display:"block"
		},
		register:{
			display:"none"
		},
		RUser:"",
		RPwd:"",
		RTel:""
	},
	methods:{
		page:function(){
			headP.test.display="block";
			headTip.mine=false;
			headP.Active1=false;
			headP.start=true;
			titpanel.toollist=false;
			window.parent.nav.navStyle.display="none";
			//main.mainStyle.display="none";
		},
		push:function(){
			if(this.title=="注册账号"){ 
				 this.register.display="block";
				 this.Active2=true;
				 this.ActiveTwo2=false;
				 this.Active=true;
				 this.ActiveTwo=false;
			     this.title="返回登录";
			     setTimeout(function(){
					headP.login.display="none";
			       },200);
			}else{
				 this.login.display="block";
				 this.ActiveTwo2=true;
				 this.Active2=false;
				 this.Active=false;
				 this.ActiveTwo=true;
				 this.title="注册账号";
				 setTimeout(function(){
					headP.register.display="none";
			       },200);
			}	
		},
		close:function() {
			this.Active1=true;
			this.start=false;
			this.ActiveTwo=false;
			setTimeout(function(){
				headTip.mine=true;
				headP.test.display="none";
				window.parent.nav.navStyle.display="block";
				titpanel.toollist=true;
			},400);
		},
		sub:function(){
			//console.log("密码:"+this.password+" "+"用户:"+this.user);
			$.ajax({
	            url: 'http://10.26.236.3:1234/login',
	            data:{
	            	user:this.user,
	            	password:this.password
	            },
	            dataType: 'json',
	            timeout: 5000,
	                 success: function(data) {
	            if(data.back=="success"){
	            	headP.close();
	            	addCookie("user",headP.user,24);
            	    addCookie("picture",data.picture,24);
            	    addCookie("tel",data.tel,24);
            	    addCookie("sex",data.sex,24);
            	    if(data.identity=="车主"){
            	    	addCookie("identity","driver",24);
            	    }
	            	headP.close();
	            	titpanel.getUserInfo();
	            	// nav.minePage();
	            }else if(data.back=="fail"){
	            	alert("密码错误");
	            }
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	                  console.log(textStatus + ' ' + errorThrown);
	            }
    });
		},
		reg:function(){
			alert(this.RTel)
			var data = {
                   userName:this.RUser,
                   password:this.RPwd,
                   tel:this.RTel
                 };
       $.ajax({
            url: 'http://10.26.236.3:1234/registerUser',
            dataType: 'json',
            data:data,
            cache: false,
            timeout: 5000,
        success: function(data){
                if(data.back=="ok"){
                	this.login.display="block";
				    this.ActiveTwo2=true;
				    this.Active2=false;
				 	this.Active=false;
				 	this.ActiveTwo=true;
				 	this.title="注册账号";
				 setTimeout(function(){
					headP.register.display="none";
			       },200);
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
});



var showInput=new Vue({
    el:"#showInput",
    data:{
        showInputStyle:{
            display:"none"
        },
        action:true,
        discuss:"",
        pla:"想说什么就说什么...",
        otherName:"",
        WId:""
    },
    methods:{
        close:function(){
             //document.getElementById("reply").blur();
             window.parent.nav.navStyle.display="none";
             this.action=false;
             setTimeout(function(){
                showInput.showInputStyle.display="none";
            },400);
        },
        subReply:function(){
             if(showOne.judge==true){
                if(this.discuss==""){
                    alert("留言不能为空");
                }else{
                    this.subTwo();
                }
             }else{
                if(this.discuss==""){
                    alert("留言不能为空");
                }else{
                    this.subOne();
                }
             }
        },
        subOne:function(){
            var nameOfLea=getCookie('user');
            var nameBe=getCookie('lookUser');
            var myDate = new Date();
            var localDate2=this.localTime();
            var msg={
                nameOfLea:nameOfLea,
                date:localDate2,
                nameBe:nameBe,
                words:showInput.discuss
            }
            if(nameOfLea==""){
                headP.page();
            }else{
                $.ajax({
                    url: 'http://10.26.236.3:1234/insertWords',
                    dataType: 'json',
                    data:msg,
                    cache: false,
                    timeout: 5000,
                success: function(data){
                     showInput.discuss="";
                     showOne.getleaveWords(getCookie('lookUser'));
                     showInput.close();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ' ' + errorThrown);
                }
            });
            }
        },
        subTwo:function(){
             var nameOfRep=getCookie('user');
             var nameBe=this.otherName;
             var myDate = new Date();
             var date=this.localTime();
             var words=this.discuss;
             var WId=this.WId;
             var data = {
                   nameOfRep:nameOfRep,
                   nameBe:nameBe,
                   WId:WId,
                   words:words,
                   date:date
                 };
	        $.ajax({
	            url: 'http://10.26.236.3:1234/insertRepLea',
	            dataType: 'json',
	            data:data,
	            cache: false,
	            timeout: 5000,
	        success: function(data){
	             showInput.discuss="";
	             showOne.getleaveWords(getCookie('lookUser'));
	             showInput.close();
	        },
	         error: function(jqXHR, textStatus, errorThrown) {
	            console.log(textStatus + ' ' + errorThrown);
	        }
	        });
        },
        localTime:function(){
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
    }
})
