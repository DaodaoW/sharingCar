var titpanel=new Vue({
	el:'#titpanel',
	data:{
		page:0,
        articleStyle:{
            background:"#FFFFFF"
        },
        imageStyle:{
            width: "100%",
            height:"3rem",
            paddingLeft: "1.3rem"
        },
        list:[],
        tId:-1,
        high:true
	},
	methods:{
		getTogether:function(){
				var pageNum = {
		           page:this.page
		         };
		       $.ajax({
		            url: 'http://10.26.236.3:1234/together',
		            dataType: 'json',
		            data:pageNum,
		            cache: false,
		            timeout: 5000,
		        success: function(data){
		          titpanel.page=titpanel.page+1;
		          titpanel.setTogether(data);
		        },
		        error: function(jqXHR, textStatus, errorThrown) {
		            console.log(textStatus + ' ' + errorThrown);
		        }
		    });
		},
	 	setTogether:function(data){
	 		for(var i=0;i<data.length;i++){              
	 			 data[i].date=new Date(data[i].date).toLocaleString();
	 			 data[i].src=data[i].sex+".png";
                 this.list.push(data[i]);
	 		}
            
	 	},
        detailA:function(index){
            //alert(this.tId+"$$"+index)
            this.tId=index;
        },
        detailMove:function(index){
            this.tId=100000;
        },
        detailEnd:function(index,tId){
            window.parent.nav.navStyle.display="none";
            showOne.showOneStyle.display="block";
            showOne.tId=tId;
            showOne.getOne(tId);
        },
        preventThis:function(){

        },
        menu:function() {
        this.scroll = document.getElementById('titpanel').scrollTop;
        var bottomHeight=document.getElementById('titpanel').scrollHeight - document.getElementById('titpanel').scrollTop-document.getElementById('titpanel').clientHeight
        // console.log(this.scroll);
        if(bottomHeight==0){
            this.getTogether();
        }
        if(this.scroll<-80){
            this.list=[];
            this.page=0;
            this.getTogether();
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
                        showThree.tel=data[0].tel.substring(0,3)+"****"+data[0].tel.substring(7,11);
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
	},
	mounted(){
		 this.getTogether();
        window.addEventListener('scroll',this.menu,true)
         // document.getElementById('titpanel').onscroll=this.scrollFunc;
         // this.ScollPostion();
         // window.onmousewheel = document.onmousewheel = this.scrollFunc();
	}
});


//详细的文章
var showOne=new Vue({
    el:"#showOne",
    data:{
        showOneStyle:{
            display:"none"
        },
        listOne:[],
        words:[],
        reply:[],
        one:{
            background:""
        },
        two:{
            background:"url(/main.png) no-repeat 0px 0px /cover"
        },
        three:{
            background:"url(/main.png) no-repeat 0px 0px /cover"
        },
        four:{
            background:"url(/main.png) no-repeat 0px 0px /cover"
        },
        judge:false,
        tId:""
    },
    methods:{
        toleft:function(){
             window.parent.nav.navStyle.display="block";
             showOne.showOneStyle.display="none";
             titpanel.detailMove();
        },
        getOne:function(tId){
            $.ajax({
                    url: 'http://10.26.236.3:1234/getOne',
                    dataType: 'json',
                    data:{tId:tId},
                    cache: false,
                    timeout: 5000,
                success: function(data){
                        showOne.listOne=[];
                    for(var i=0;i<data.length;i++){              
                         data[i].date=new Date(data[i].date).toLocaleString();
                         data[i].src=data[i].sex+".png";
                         var imgOne=data[i].imageOne.substring(75,data[i].imageOne.length-50);
                         var imgTwo=data[i].imageTwo.substring(75,data[i].imageTwo.length-50);
                         var imgThree=data[i].imageThree.substring(75,data[i].imageThree.length-50);
                         var imgFour=data[i].imageFour.substring(75,data[i].imageFour.length-50);
                         if(imgOne!=""){
                                data[i].imageOne="<div class='imageOne' onclick='ImageOn(this)'  style='background: url("+imgOne+") no-repeat 0px 0px;background-size:cover;' ></div>";
                         }
                         if(imgTwo!=""){
                                data[i].imageTwo="<div class='imageOne' onclick='ImageOn(this)'  style='background: url("+imgTwo+") no-repeat 0px 0px;background-size:cover;' ></div>";
                         }
                         if(imgThree!=""){
                                data[i].imageThree="<div class='imageOne' onclick='ImageOn(this)'  style='background: url("+imgThree+") no-repeat 0px 0px;background-size:cover;' ></div>"
                         }
                         if(imgFour!=""){
                                data[i].imageFour="<div class='imageOne' onclick='ImageOn(this)'  style='background: url("+imgFour+") no-repeat 0px 0px;background-size:cover;' ></div>";
                         }
                         showOne.listOne.push(data[i]);
                         showOne.getComments(tId);
                   }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ' ' + errorThrown);
                }
            });
        },
        del:function(){
             window.parent.nav.navStyle.display="none";
        },
        getComments:function(comments){
             $.ajax({
                    url: 'http://10.26.236.3:1234/comments',
                    dataType: 'json',
                    data:{comments:comments},
                    cache: false,
                    timeout: 5000,
                success: function(data){
                     showOne.words=[];
                    for(var i=0;i<data.length;i++){
                      data[i].date=new Date(data[i].date).toLocaleString();
                      showOne.words.push(data[i]);
                      showOne.reply=[];
                      showOne.getReply(data[i].CId);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ' ' + errorThrown);
                }
            });
        },
        getReply:function(CId){
             $.ajax({
                    url: 'http://10.26.236.3:1234/getReply',
                    dataType: 'json',
                    data:{CId:CId},
                    cache: false,
                    timeout: 5000,
                success: function(data){
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
            if(name!=undefined){
                showInput.pla="回复"+name+":";
                showOne.judge=true;
                showInput.otherName=name;
                showInput.CId=Id;
            }else{
                showInput.pla="想说什么就说什么...";
                showOne.judge=false;
                showInput.tId=this.tId;
                // alert(showInput.tId)
            }
            showInput.showInputStyle.display="block";
            window.parent.nav.navStyle.display="none";
            showInput.action=true;
        }
     
    }
});

//评论回复
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
        CId:""
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
        test1:function(){

        },
        subReply:function(){
             if(showOne.judge==true){
                if(this.discuss==""){
                    alert("评论不能为空");
                }else{
                    this.subTwo();
                }
                //alert("二级评论")
             }else{
                if(this.discuss==""){
                    alert("评论不能为空");
                }else{
                    this.subOne();
                }
                //alert("一级评论")
             }
        },
        subOne:function(){
            var name=getCookie('user');
            var myDate = new Date();
            var localDate2=this.localTime();
            var msg={
                auther:name,
                localDate2:localDate2,
                tId:showOne.tId,
                discuss:showInput.discuss
            }
            if(name==""){
                alert("尚未登录");
            }else{
                $.ajax({
                    url: 'http://10.26.236.3:1234/insertCom',
                    dataType: 'json',
                    data:msg,
                    cache: false,
                    timeout: 5000,
                success: function(data){
                     showInput.discuss="";
                     showOne.getComments(showOne.tId);
                     showInput.close();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ' ' + errorThrown);
                }
            });
            }

        },
        subTwo:function(){
             var userName=getCookie('user');
             var autherTwo=this.otherName;
             var myDate = new Date();
             var localDate=this.localTime();
             var reply=this.discuss;
             var CId=this.CId;
             var data = {
                   auther:userName,
                   autherTwo:autherTwo,
                   CId:CId,
                   reply:reply,
                   localDate:localDate
                 };
        $.ajax({
            url: 'http://10.26.236.3:1234/insertReply',
            dataType: 'json',
            data:data,
            cache: false,
            timeout: 5000,
        success: function(data){
             showInput.discuss="";
             showOne.getComments(showOne.tId);
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


//我的计划
var headTipM=new Vue({
    el:"#headTipM",
    data:{
        showInputStyle:{
            display:"none"
        },
        discuss:"",
        page:0,
        title:"我的动态"
    },
    methods:{
        myTogether:function(){
            if(this.title=="我的动态"){
                if(getCookie('user')==""){
                    alert("尚未登录");
                }else{
                     City.title="同城";
                    this.title="所有动态";
                    this.page=0;
                    titpanel.list=[];
                    this.getTogether();
                }
            }else{
                City.title="同城";
                this.title="我的动态";
                titpanel.list=[];
                titpanel.page=0;
                titpanel.getTogether();
            } 
        },
        getTogether:function(){
                var userName=getCookie('user');
                var pageNum = {
                   page:this.page,
                   UN:userName
                 };
               $.ajax({
                    url: 'http://10.26.236.3:1234/getpersonT',
                    dataType: 'json',
                    data:pageNum,
                    cache: false,
                    timeout: 5000,
                success: function(data){
                  headTipM.page=headTipM.page+1;
                  headTipM.setTogether(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ' ' + errorThrown);
                }
            });
        },
        setTogether:function(data){
            for(var i=0;i<data.length;i++){              
                 data[i].date=new Date(data[i].date).toLocaleString();
                 data[i].src=data[i].sex+".png";
                 titpanel.list.push(data[i]);
            }
            if(data.length==4){
                 this.getTogether();
            }
        }
    }
})

//相同城市
var City=new Vue({
    el:"#City",
    data:{
        title:"同城"
    },
    methods:{
        sameCity:function(){
            if(this.title=="同城"){
                titpanel.list=[];
                this.title="返回";
                var city=window.parent.checkOrder.city
                this.getsameCity(city);
            }else{
                this.title="同城";
                headTipM.title="我的动态";
                titpanel.list=[];
                titpanel.page=0;
                titpanel.getTogether();
            }
        },
        getsameCity:function(city){
            var data={
                city:city
            }
             $.ajax({
                    url: 'http://10.26.236.3:1234/getsameCity',
                    dataType: 'json',
                    data:data,
                    cache: false,
                    timeout: 5000,
                success: function(data){
                  City.setsameCity(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus + ' ' + errorThrown);
                }
            });
        },
        setsameCity:function(data){
            for(var i=0;i<data.length;i++){              
                 data[i].date=new Date(data[i].date).toLocaleString();
                 data[i].src=data[i].sex+".png";
                 titpanel.list.push(data[i]);
            }
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
          if(getCookie('user')==""){

          }else{
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





