var makePlay=new Vue({
	el:"#makePlay",
	data:{
		action:false,
		Style:{
			display:"none"
		},
		city:"",
		detail:false,
		detailT:false,
		left:"取消",
		right:"下一步",
		det:{
			marginLeft:"100%",
		},
		TogetherText:"",
		city:"请输入",
		destination:"",
		specific:"",
		file:[],
        upImage:[]
	},
	methods:{
		close:function(){
			if(this.left=="取消"){
				makePlay.action=false;
			    //makePlay.Style.display="none";
			    window.parent.nav.navStyle.display="block"
			}else{
				this.detail=false;
			    this.detailT=true;
			    this.left="取消";
			    this.right="下一步";
			}
		},
		rightPage:function(){
			if(this.right=="发表"){
				this.file=document.getElementById("img");
				this.give();
				// console.log(this.file)
				this.subPlay();
			}else{
				this.detail=true;
			    this.detailT=false;
			    this.left="上一步";
			    this.right="发表";
			}
		},
		sub:function(){
			document.getElementById("img").click();
		},
		subPlay:function(){
			    var localDate=showInput.localTime();
			    var nameUser=getCookie('user');
			    var cityC=window.parent.checkOrder.city;
			    var destination=this.destination;
			    var specific=this.specific;
			    var personNum=1;
			    var data={
			    	date:localDate,
			    	text:this.TogetherText,
			    	name:nameUser,
			    	people:personNum,
			    	city:cityC,
			    	destination:destination,
			    	specific:specific
			    }
			    if(destination==""){
			    	alert("目的城市为空");
			    }else if(specific==""){
			    	alert("具体地点为空");
			    }else{
			    	    $.ajax({
					      url: 'http://10.26.236.3:1234/insertTogether', 
					      data: data,
					      async: true,
					      dataType: 'json',
					      success: function(data){
					      	var space=[];
					      	console.log(makePlay.upImage)
					      	if(makePlay.upImage.length!=0){
					      		for(var i=0;i<makePlay.upImage.length;i++){
			           			 var objUrl=makePlay.getObjectURL(makePlay.upImage[i]); 
			           			 space[i]=objUrl;
			                 	 var size=makePlay.upImage[i].size/1024;     
			      			 	 makePlay.listen(objUrl,size);
			                     }
					      	makePlay.subImage(data[0].tid,space);
					      }else{
					      	makePlay.subImage(data[0].tid,space);
					      }
					    },
					      error: function(err){
					           //alert('网络故障');
					        }
					    });
                  }
              },
           getObjectURL:function(file){   
		            var url=null     
		            if(window.createObjectURL!=undefined){ // basic    
		                url=window.createObjectURL(file)    
		            }else if(window.URL!=undefined){ // mozilla(firefox)  
		                url=window.URL.createObjectURL(file)    
		            } else if(window.webkitURL!=undefined){ // webkit or chrome    
		                url=window.webkitURL.createObjectURL(file)  
		            }    
		            return url;  
            },
           give:function(){
				 	var j=makePlay.upImage.length;
				 	if((makePlay.file.files.length+makePlay.upImage.length)>4){
						for(var i=0;i<4;i++){
							makePlay.upImage[i+j]=makePlay.file.files[i];
						}	
					}else{
						for(var i=0;i<makePlay.file.files.length;i++){
							makePlay.upImage[i+j]=makePlay.file.files[i];
						}
					}
				},
		   listen:function(space,size){        
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
                          makePlay.dealImage(space,imageSize); 
                       }else{
                       	  var imageSize={
                       	    width:width,
                       	    height:height
                           };
                          makePlay.dealImage(space,imageSize); 
                       }      
                 }; 
                image.src= space;  
     			},
          dealImage:function(path, obj){
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
					  if(obj.quality && obj.quality <= 1 && obj.quality > 0){
					   quality = obj.quality;
					  }
					  var base64 = canvas.toDataURL('image/jpeg', quality );
					     $.ajax({
					      url: 'http://10.26.236.3:1234/getPicture', 
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
			  },
	  subImage:function(id,space){
	 	var images=[];
	 	for(var i=0;i<space.length;i++){
	 		images[i]=space[i].substring(28)+".png";
	 	}
	 	var data={
	 		tId:id,
	 		images:images
	 	}
	 	 $.ajax({
	 		      url: 'http://10.26.236.3:1234/insertImage', 
	 		      data: data,
	 		      async: true,
	 		      dataType: 'json',
	 		      success: function(data){
	 		      	makePlay.action=false;
			        window.parent.nav.navStyle.display="block"
			         titpanel.list=[];
           			 titpanel.page=0;
            		 titpanel.getTogether();
	 		    },error: function(err){
	 		           alert('网络故障');
	 		        }
	 		    });
	       }
			}
})


var edit=new Vue({
	el:"#edit",
	data:{

	},
	methods:{
		playPage:function(){
			makePlay.city=window.parent.checkOrder.city;
			makePlay.action=true;
			makePlay.Style.display="block";
			window.parent.nav.navStyle.display="none"
		}
	}
})


// var chooseCity=new Vue({
// 	el:"#chooseCity",
// 	data:{
// 		show:{
// 			display:"block"
// 		},
// 		cityChoose:"<object type='text/html' data='http://10.26.236.3:1234/index.html' width='100%' height='100%'></object>"
// 	},
// 	methods:{

// 	},
// 	mounted(){

// 	}
// })