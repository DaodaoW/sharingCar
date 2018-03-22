function getOrderPage(){
  var fin=document.getElementById('finish').value;
  var unfin=document.getElementById('unfinish').value;
  var accept=document.getElementById('accept').value;
  var city=document.getElementById('cityChoice').value;
  var time=document.getElementById('timeChoice').value;
  var bestNew=document.getElementById('bestNew').value;
  var myOrder=document.getElementById('myOrder').value;
  var ap=document.getElementById('ap').value;
  var lookOrder=document.getElementById('lookOrder').getAttribute("name");
  console.log(lookOrder)
  //var orderTake=document.getElementById('orderTake').value;
  var userName=getCookie("user");
  var userN={
      userN:userName,
      city:city,
      fin:fin,
      unfin:unfin,
      accept:accept,
      time:time,
      lookOrder:lookOrder,
      ap:ap,
      bestNew:bestNew,
      myOrder:myOrder
  }
  $.ajax({
            url:'http://127.0.0.1:1234/getOrderPage',
            data: userN,
            dataType: 'json',
            cache: false,
            timeout: 5000,
        success: function(data) {
            var page1=Math.ceil(data.page/4);
            if(page1==0){
            	var time=document.getElementById('timeChoice').value="";
            	var city=document.getElementById('cityChoice').value="";
            	var bestNew=document.getElementById('bestNew').value=3;
                var myOrder=document.getElementById('myOrder').value=2;
                var ap=document.getElementById('ap').value=2;
                var fin=document.getElementById('finish').value=0;
  				var unfin=document.getElementById('unfinish').value=0;
  				var accept=document.getElementById('accept').value=0;
            	alert("暂无订单")
            }else{
            //console.log(page1)
            var pageList=document.getElementById('pageList');
            pageList.innerHTML=null;
            page(page1);
            getOrder(1);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
}
 getOrderPage();


// function orderTakePage(){
// 	 var bestNew=document.getElementById('bestNew').value;
//      var myOrder=document.getElementById('myOrder').value;
//      var ap=document.getElementById('ap').value;
//      var city=document.getElementById('cityChoice').value;
//      var time=document.getElementById('timeChoice').value;
//      var userName=getCookie("user");
//       var userN={
//       userN:userName,
//       bestNew:bestNew,
//       myOrder:myOrder,
//       ap:ap,
//       city:city,
//       time:time
//   }
//       $.ajax({
//             url:'http://127.0.0.1:1234/orderTakePage',
//             data: userN,
//             dataType: 'json',
//             cache: false,
//             timeout: 5000,
//         success: function(data) {
//             var page1=Math.ceil(data.page/3);
//             console.log(data.page);
//             if(page1==0){
//             	var time=document.getElementById('timeChoice').value="";
//             	var city=document.getElementById('cityChoice').value="";
//             	alert("暂无订单")
//             }else{
//             var pageList=document.getElementById('pageList');
//             pageList.innerHTML=null;
//             page(page1);
//             orderTaking(1);
//             }
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             console.log(textStatus + ' ' + errorThrown);
//         }
//     });
// }
// orderTakePage();

function page(pageNo){
	if(pageNo<=10){
		var place=document.getElementById("place");
	    place.style.marginLeft=300+(200-20*pageNo)+"px";
	}
			 if(pageNo==1){
					    	$("#pageList").append('<li class="lock" id="notLast" style="border-radius: 25px;height: 28px;width: 60px;text-align: center;margin-left: 10px;float: left;font-size: large;"><a><<</a></li>');
					    	$("#pageList").append('<li name="bad" id="page1" class="backg-two" style="border-radius: 5px;height: 28px;width: 28px;text-align: center;margin-left: 10px;float: left;font-size: large;"><a>1</a></li>');
					    	$("#pageList").append('<li class="lock" id="notNext" style="border-radius: 25px;height: 28px;width: 60px;text-align: center;margin-left: 10px;float: left;font-size: large;"><a>>></a>');
					    }else{
						$("#pageList").append('</li><li class="lock" id="notLast" style="border-radius: 25px;height: 28px;width: 60px;text-align: center;margin-left: 10px;float: left;font-size: large;color:blue"><a><<</a></li>');
						for (var i = 1; i <= pageNo; i++) {
							if (i > 9) {
								$("#pageList").append('<li name="nice" id="page' + i + '" style="display:none;border-radius: 5px;height: 28px;width: 28px;text-align: center;margin-left: 10px;float: left;font-size: large;"><a>' + i + '</a></li>');
							} else if (i == 1) {
								$("#pageList").append('<li name="bad" id="page' + i + '" class="backg-two" style="border-radius: 5px;height: 28px;width: 28px;text-align: center;margin-left: 10px;float: left;font-size: large;"><a>' + i + '</a></li>');
							} else {
								$("#pageList").append('<li name="nice" id="page' + i + '" style="border-radius: 5px;height: 28px;width: 28px;text-align: center;margin-left: 10px;float: left;font-size: large;"><a>' + i + '</a></li>');
							}
						}
						$("#pageList").append('<li id="nextPage" style="border-radius: 25px;height: 28px;width: 60px;text-align: center;margin-left: 10px;float: left;font-size: large;color:blue"><a>>></a></li>');
					  }
			
					$("#pageList").on("mouseover", "li", function() {
						$(this).addClass("backg").siblings().removeClass("backg");
					});
					$("#pageList").on("mouseleave", "li", function() {
						$(this).removeClass("backg");
					});
             }


	$("#pageList").on("click", "[name='nice']", function() {
						var page = parseInt($(this).text());
						var pageNo=parseInt($("#pageList li").eq(($("#pageList li").length-2)).text());
						$(this).parent().children("#page" + page).addClass("backg-two").siblings().removeClass("backg-two");
						$(this).parent().children("#page" + page).attr("name","bad").siblings().attr("name","nice");
						if (page == 1) {
							$(this).parent().children("#lastPage").addClass("lock");
							$(this).parent().children("#lastPage").attr("id", "notLast");
							$(this).parent().children("#notNext").removeClass("lock");
							$(this).parent().children("#notNext").attr("id", "nextPage");
							getOrder(page);
						} else if (page == pageNo) {
							$(this).parent().children("#nextPage").addClass("lock");
							$(this).parent().children("#nextPage").attr("id", "notNext");
							$(this).parent().children("#notLast").removeClass("lock");
							$(this).parent().children("#notLast").attr("id", "lastPage");
							getOrder(page);
						} else if ((page - 5) >= 0 && (page + 4) <= pageNo) {
							$(this).parent().parent().children().children("#notNext").removeClass("lock");
							$(this).parent().parent().children().children("#notNext").attr("id", "nextPage");
							$(this).parent().parent().children().children("#notLast").attr("id", "lastPage");
							for (var j = (page + 4); j >= page; j--) {
								$(this).parent().children("#page" + j).css("display", "");
							}
							for (var k = (page - 5); k >= 1; k--) {
								$(this).parent().children("#page" + k).css("display", "none");
							}
							for (var h = pageNo; h >= (page + 5); h--) {
								$(this).parent().children("#page" + h).css("display", "none");
							}
							for (var i = (page - 4); i <= page; i++) {
								$(this).parent().children("#page" + i).css("display", "");
							}
							getOrder(page);
						} else if (page < 5) {
							$(this).parent().parent().children().children("#notNext").removeClass("lock");
							$(this).parent().parent().children().children("#notLast").removeClass("lock");
							$(this).parent().parent().children().children("#notNext").attr("id", "nextPage");
							$(this).parent().parent().children().children("#notLast").attr("id", "lastPage");
							for (var a = page; a >= 1; a--) {
								$(this).parent().children("#page" + a).css("display", "");
							}
							for (var b = 10; b <= pageNo; b++) {
								$(this).parent().children("#page" + b).css("display", "none");
							}
							getOrder(page);
						} else if ((page + 4) > pageNo) {
							$(this).parent().parent().children().children("#notNext").removeClass("lock");
							$(this).parent().parent().children().children("#notNext").attr("id", "nextPage");
							$(this).parent().parent().children().children("#notLast").attr("id", "lastPage");
							$(this).parent().parent().children().children("#lastPage").removeClass("lock");
							for (var x = page; x <= pageNo; x++) {
								$(this).parent().children("#page" + x).css("display", "");
							}
							for (var y = 1; y <= (pageNo-9); y++) {
								$(this).parent().children("#page" + y).css("display", "none");
							}
							getOrder(page);
						}
						
					});
					//点击页数触发
					$("#pageList").on("mouseover", "#nextPage", function() {
						$(this).addClass("backg");
					});
					$("#pageList").on("mouseleave", "#nextPage", function() {
						$(this).removeClass("backg");
					});
					$("#pageList").on("click", "#nextPage", function() {
						var pid = parseInt($(this).parent().children(".backg-two").text()) + 1;
						var pageNo=parseInt($("#pageList li").eq(($("#pageList li").length-2)).text());
						getOrder(pid);
						$(this).parent().children("#page" + pid).attr("name","bad").siblings().attr("name","nice");
						$(this).parent().parent().children().children("#notLast").attr("id", "lastPage");
						$(this).parent().parent().children().children("#notFirst").attr("id", "firstPage");
						$(this).parent().parent().children().children("#firstPage").removeClass("lock");
						$(this).parent().parent().children().children("#lastPage").removeClass("lock");
						$(this).parent().children(".backg-two").removeClass("backg-two");
						$(this).parent().children("#page" + pid).addClass("backg-two");
						if (pid > 5 && pid < (pageNo - 3)) {
							$("#page" + (pid - 5).toString()).css("display", "none");
							$("#page" + (pid + 4).toString()).css("display", "");
						} else if ((pid) == pageNo) {
							$(this).removeClass("backg");
							$(this).attr("id", "notNext");
							$(this).addClass("lock");
							$(this).parent().parent().children().children("#endPage").addClass("lock");
							$(this).parent().parent().children().children("#endPage").attr("id", "notEnd");
							getOrder(pid);
						}
				       
					});
					//点击下一页触发
					$("#pageList").on("click", "#lastPage", function() {
						var pid = parseInt($(this).parent().children(".backg-two").text()) - 1;
						var pageNo=parseInt($("#pageList li").eq(($("#pageList li").length-2)).text());
						getOrder(pid);
						$(this).parent().children("#page" + pid).attr("name","bad").siblings().attr("name","nice");
						$(this).parent().parent().children().children("#notNext").removeClass("lock");
						$(this).parent().parent().children().children("#notEnd").removeClass("lock");
						$(this).parent().parent().children().children("#notNext").attr("id", "nextPage");
						$(this).parent().parent().children().children("#notEnd").attr("id", "endPage");
						 //alert(pid)
						if ((pid) == 1) {
							$(this).parent().parent().children().children("#firstPage").addClass("lock");
							$(this).parent().parent().children().children("#firstPage").attr("id", "notFirst");
							$(this).addClass("lock");
							$(this).attr("id", "notLast");
							//getOrder(pid);
						}
						if ((pid - 1) > 3) {
							$("#page" + (pid + 5).toString()).css("display", "none");
							$("#page" + (pid - 4).toString()).css("display", "");
							$(this).parent().children(".backg-two").removeClass("backg-two");
							$(this).parent().children("#page" + pid).addClass("backg-two");
							//getOrder(pid);
						}else {
							$(this).parent().children(".backg-two").removeClass("backg-two");
							$(this).parent().children("#page" + pid).addClass("backg-two");
							// getOrder(pid);
						}
				          
					});
					//点击上一页触发				   

        