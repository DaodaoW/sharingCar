var nav=new Vue({
	el:'#nav',
	data:{
		navStyle:{
			display:"block",
		},
		navOne:{
			background:"url(/MhomePage1.png) no-repeat 0px 0px /cover"
		},
		navTwo:{
			background:"url(/together.png) no-repeat 0px 0px /cover"
		},
		navThree:{
			background:"url(/play.png) no-repeat 0px 0px /cover"
		},
		navFour:{
			background:"url(/mine2.png) no-repeat 0px 0px /cover"
		},
		ident:""
	},
	methods:{
		mainPage:function(){
			 main.mainStyle.display="block";
		},
		orderPage:function(){
			 // main.mainStyle.display="none";
			 // window.location.href="http://10.26.236.3:1234/MhomePage.html"
		},
		homePage:function(){
			 main.mainStyle.display="block";
             this.ident="";
			 identification.showIdent.display="none";
		},
		togetherPage:function(){
			 // this.navOne.background="url(/MhomePage1.png) no-repeat 0px 0px /cover";
			 // this.navTwo.background="url(/together2.png) no-repeat 0px 0px /cover";
			 // this.navThree.background="url(/play.png) no-repeat 0px 0px /cover";
			 // this.navFour.background="url(/mine2.png) no-repeat 0px 0px /cover"
			 identification.showIdent.display="block";
			 main.mainStyle.display="none";
			 this.ident ='<object type="text/html" data="http://10.26.236.3:1234/MhomePage.html" width="100%" height="100%"></object>';
		},
		playPage:function(){
			identification.showIdent.display="block";
			main.mainStyle.display="none";
			this.ident ='<object type="text/html" data="http://10.26.236.3:1234/MPlay.html" width="100%" height="100%"></object>';
		},
		minePage:function(){
			identification.showIdent.display="block";
			main.mainStyle.display="none";
			this.ident ='<object type="text/html" data="http://10.26.236.3:1234/Mine.html" width="100%" height="100%"></object>';
		}
	}
})
//真的输入框
var realInput=new Vue({
	el:'#mockInput',
	data:{
		real:{
			display:"none"
		},
		go:false,
		out:false,
		showPlace:""
	},
	methods:{
		close:function(){
			main.mainStyle.display="block";
			this.real.display="none";
		},
		leave:function(){
			this.go=true;
			this.out=false;
		},
		showClose:function(){
			this.out=true;
			this.go=false;
		}
      },
    mounted(){
    	//alert("宝宝晚上好！")
    }

});
//主要显示
var main=new Vue({
	el:'#mapMain',
	data:{
		mainStyle:{
			display:"block"
		},
		end:"",
		real:{
			display:"none"
		},
		showPlace:"",
		start:""
	},
	methods:{
		setPlace:function(){
			this.end=this.showPlace;
		},
		sub:function(){
			if(getCookie('user')==""){
				alert("请先登录")
			}else if(this.end==""||this.start==""){
				alert("请输入目的地");
			}else{
				checkOrder.show=true;
				main.mainStyle.display="none";
				checkOrder.passenger=getCookie('user');
	            var localDate=this.localTime();
	            checkOrder.date=localDate;
	            this.showCityInfo();
	            checkOrder.startPlace=this.start;
	            checkOrder.endPlace=this.end;
	            checkOrder.tel=getCookie('tel');
	            checkOrder.picture=getCookie('picture');
			}
		},
		showRealInput:function(){
			this.mainStyle.display="none";
		    realInput.real.display="block";   
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
    },
     showCityInfo:function(){
        var citysearch = new AMap.CitySearch();
        citysearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city;
                    var citybounds = result.bounds;
                    checkOrder.city=cityinfo;
                    //alert(cityinfo)
                }
            } else {
               alert("网络错误");
            }
        });
     }
	},
	mounted(){
		this.showCityInfo();
	}
});


var identification=new Vue({
	el:'#identification',
	data:{
		showIdent:{
			display:"none"
		}
	},
	methods:{
	
	}

});

var checkOrder=new Vue({
	el:'#checkOrder',
	data:{
		show:false,
		date:"",
		startPlace:"",
		endPlace:"",
		city:"",
		passenger:"",
		tel:"",
		picture:""
	},
	methods:{
		toleft:function(){
			checkOrder.show=false;
			main.mainStyle.display="block";
		},
		subOrder:function(){
			   var data={
                        city:checkOrder.city,
                        time:checkOrder.date,
                        SPlace:checkOrder.startPlace,
                        EPlace:checkOrder.endPlace,
                        Ptel:checkOrder.tel,
                        passenger:checkOrder.passenger,
                        condtion:"未完成"
                      }
				 $.ajax({
	             url:'http://10.26.236.3:1234/insertOrder',
	             data: data,
	             dataType: 'json',
	             cache: false,
	             timeout: 5000,
	          success: function(data) {
	          	checkOrder.toleft();
	          	nav.playPage();
	         },
	          error: function(jqXHR, textStatus, errorThrown) {
	              console.log(textStatus + ' ' + errorThrown);
	          }
	       });
		}
	}

});

