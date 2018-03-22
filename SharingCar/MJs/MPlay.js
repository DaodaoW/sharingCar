var headTip=new Vue({
	el:"#headTip",
	data:{
		show:false,
		showT:false,
        showF:false,
		myOrder:{
			color:"#FF7A3F"
		},
		getOrder:{
			marginLeft: "22%",
			color:"#707070"
		}
	},
	methods:{
		toright:function(){
            if(getCookie('identity')=="driver"){
                this.show=true;
                this.showT=false;
                this.getOrder.color="#FF7A3F";
                this.myOrder.color="#707070";
                orderPanel.show=true;
                orderPanel.back=false;
                orderPanel.getOrder();
            }else{
                 alert("您还不是车主")
            }
		},
		toleft:function(){
			this.show=false;
			this.showT=true;
			orderPanel.show=false;
			orderPanel.back=true;
			this.getOrder.color="#707070";
			this.myOrder.color="#FF7A3F";
		},
        getrder:function(){
            if(getCookie('identity')=="driver"){
                lookOrder.getOrder();
            }else{
                alert("您还不是车主");
            }
        }
	}
})



var titpanel=new Vue({
	el:"#titpanel",
	data:{
		passenger:"",
		date:"",
		city:"",
		startPlace:"",
		endPlace:"",
		orderList:[],
		op:"确认",
		btn:[],
		butn:[]
	},
	methods:{
		slide:function(){
			
		},
		getOrder:function(){
			var name=getCookie('user');
			var data={
    			userName:name
             }
	         $.ajax({
	             url:'http://10.26.236.3:1234/MOrder',
	             data: data,
	             dataType: 'json',
	             cache: false,
	             timeout: 5000,
	          success: function(data) {
		          	titpanel.btn=[];
		          	titpanel.butn=[];
	            for(var i=0;i<data.length;i++){
		             if(data[i].condtion=="已完成") {
		             	titpanel.btn.push("评价");
		             	titpanel.butn.push({background:"#FF7A3F"});
		             }else if(data[i].condtion=="未完成"){
		             	titpanel.btn.push("取消");
		             	titpanel.butn.push({background:"#FF7A3F"});
		             }else if(data[i].condtion=="已取消"){
		             	titpanel.btn.push("无效");
		             	titpanel.butn.push({background:"#CCCCCC"});
		             }else if(data[i].condtion=="车在途中"){
		             	titpanel.btn.push("确认");
		             	titpanel.butn.push({background:"#FF7A3F"});
		             }         
	 			    data[i].date=new Date(data[i].date).toLocaleString();
	 		     }
	 		     titpanel.orderList=data;
	            console.log(data);
	         },error: function(jqXHR, textStatus, errorThrown) {
	              console.log(textStatus + ' ' + errorThrown);
	          }
	          });
		},
		opOrder:function(condtion,orderNum,name){
			if(condtion=="评价"){
				orderPanel.seeUser(name);
			}else if(condtion=="取消"){
				this.abolish(orderNum);
			}else if(condtion=="确认"){
				this.confirm(orderNum);
			}else{

			}
		},
		abolish:function(orderNum){
			var mymessage=confirm("确认取消订单？");
                   if(mymessage==true){
                         var data={
                              active:"取消",
                              condtion:"已取消",
                              orderNum:orderNum
                           }
				         $.ajax({
				             url:'http://10.26.236.3:1234/opOrder',
				             data: data,
				             dataType: 'json',
				             cache: false,
				             timeout: 5000,
				          success: function(data) {
				              titpanel.getOrder();
				         },
				          error: function(jqXHR, textStatus, errorThrown) {
				              console.log(textStatus + ' ' + errorThrown);
				          }
				       });
		         }
	       },
	       confirm:function(orderNum){
	       		var mymessage=confirm("确认该订单？");
                   if(mymessage==true){
                     var data={
                              active:"确认",
                              condtion:"已完成",
                              orderNum:orderNum
                           }
			         $.ajax({
			             url:'http://10.26.236.3:1234/opOrder',
			             data: data,
			             dataType: 'json',
			             cache: false,
			             timeout: 5000,
			          success: function(data) {
			              titpanel.getOrder();
			         },
			          error: function(jqXHR, textStatus, errorThrown) {
			              console.log(textStatus + ' ' + errorThrown);
			          }
			       });
		     }
	   }
	},
	mounted(){
		this.getOrder()
	}
})




var orderPanel=new Vue({
	el:"#orderPanel",
	data:{
		show:false,
		back:false,
		orderList:[]
	},
	methods:{
		getOrder:function(){
			$.ajax({
	             url:'http://10.26.236.3:1234/MgetOrder',
	             dataType: 'json',
	             cache: false,
	             timeout: 5000,
	          success: function(data) {
	          	  for(var i=0;i<data.length;i++){
	 			    data[i].date=new Date(data[i].date).toLocaleString();
	 		     }
	 		     orderPanel.orderList=data;
	            console.log(data);
	         },error: function(jqXHR, textStatus, errorThrown) {
	              console.log(textStatus + ' ' + errorThrown);
	          }
	          });
		},
		get:function(orderNum){
			var driver=getCookie('user');
			var driverTel=getCookie('tel')
			var mymessage=confirm("确认接单？");
                   if(mymessage==true){
                         var data={
                              active:"接单",
                              driver:driver,
                              driverTel:driverTel,
                              condtion:"车在途中",
                              orderNum:orderNum
                       }
		         $.ajax({
		             url:'http://10.26.236.3:1234/opOrder',
		             data: data,
		             dataType: 'json',
		             cache: false,
		             timeout: 5000,
		          success: function(data) {
                    lookOrder.getOrder();
		         },
		          error: function(jqXHR, textStatus, errorThrown) {
		              console.log(textStatus + ' ' + errorThrown);
		          }
		       });
     }
		},
	    seeUser:function(name){
        $.ajax({
                    url: 'http://10.26.236.3:1234/userInfo',
                    dataType: 'json',
                    data:{user:name},
                    cache: false,
                    timeout: 5000,
                success: function(data){
                        showThree.tel=data[0].tel;
                        showThree.userName=name;
                        showThree.sex=data[0].sex+".png";
                        showThree.photo=data[0].picture;
                        window.parent.nav.navStyle.display="none";
                        showThree.showTwoStyle.display="block";
                        showThree.show=true;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ' ' + errorThrown);
                }
            });
             addCookie('lookUser',name);
               
      }
	}
})

//已接订单
var lookOrder=new Vue({
    el:"#lookOrder",
        data:{
        passenger:"",
        date:"",
        city:"",
        startPlace:"",
        endPlace:"",
        orderList:[],
        shown:false
    },
    methods:{
        slide:function(){
            
        },
        getOrder:function(){
             lookOrder.shown=true;
            var name=getCookie('user');
            var data={
                driver:name
             }
             $.ajax({
                 url:'http://10.26.236.3:1234/lookOrder',
                 data: data,
                 dataType: 'json',
                 cache: false,
                 timeout: 5000,
              success: function(data) {
                    lookOrder.btn=[];
                    lookOrder.butn=[];
                for(var i=0;i<data.length;i++){
                    data[i].date=new Date(data[i].date).toLocaleString();
                 }
                 lookOrder.orderList=data;
               // console.log(data);
             },error: function(jqXHR, textStatus, errorThrown) {
                  console.log(textStatus + ' ' + errorThrown);
              }
              });
        },
        opOrder:function(condtion,orderNum,name){
            if(condtion=="评价"){
                orderPanel.seeUser(name);
            }else if(condtion=="取消"){
                this.abolish(orderNum);
            }else if(condtion=="确认"){
                this.confirm(orderNum);
            }else{

            }
        },
        toleft:function(){
            this.shown=false;
        }  
    }
})


//用户留言
var showOneT=new Vue({
    el:"#showOneT",
    data:{
        title:"用户留言",
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
            showOneT.show=false;
            setTimeout(function(){
                showOneT.showOneStyle.display="none";
                showOneT.leaveWord=[];
                showOneT.reply=[];
                // window.parent.nav.navStyle.display="block";
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
                    showOneT.reply=[];
                    for(var i=0;i<data.length;i++){
                         data[i].date=new Date(data[i].date).toLocaleString();
                         showOneT.getleaveWordR(data[i].WId);
                     }
                     showOneT.leaveWord=data;
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
                         showOneT.reply.push(data[i]);
                     }
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                      console.log(textStatus + ' ' + errorThrown);
                  }
              });
        },
         replyPerson:function(name,Id){
            if(name!=undefined){
                showInputT.pla="回复"+name+":";
                showOneT.judge=true;
                showInputT.otherName=name;
                showInputT.WId=Id;
            }else{
                showInputT.pla="想说什么就说什么...";
                showOneT.judge=false;
                // showInput.tId=this.tId;
                // alert(showInput.tId)
            }
            showInputT.showInputStyle.display="block";
            window.parent.nav.navStyle.display="none";
            showInputT.action=true;
        }
    }
})

//用户信息页
var showThree=new Vue({
    el:"#showThree",
    data:{
        title:"用户主页",
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
           // this.showOneStyle.display="none";
          },
          lookLeave:function(){
                var user=getCookie('user');
                var lookUser=getCookie('lookUser');
                if(user==""){
                    alert("您尚未登录")
                }else{
                    addCookie('lookUser',lookUser);
                    window.parent.nav.navStyle.display="none";
                    showOneT.showOneStyle.display="block";
                    showOneT.show=true;
                    showOneT.getleaveWords(lookUser);
                }
          }
        }
})


var showInputT=new Vue({
    el:"#showInputT",
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
                showInputT.showInputStyle.display="none";
            },400);
        },
        subReply:function(){
             if(showOneT.judge==true){
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
                words:showInputT.discuss
            }
            if(nameOfLea==""){
                alert("尚未登录");
            }else{
                $.ajax({
                    url: 'http://10.26.236.3:1234/insertWords',
                    dataType: 'json',
                    data:msg,
                    cache: false,
                    timeout: 5000,
                success: function(data){
                     showInputT.discuss="";
                     showOneT.getleaveWords(getCookie('lookUser'));
                     showInputT.close();
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
                 showInputT.discuss="";
                 showOneT.getleaveWords(getCookie('lookUser'));
                 showInputT.close();
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
