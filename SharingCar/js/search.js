     var cityChoice=document.getElementById('cityChoice');
     var timeChoose=document.getElementById('timeChoose');
     var peopleChoose=document.getElementById('peopleChoose');
     var sexChoose=document.getElementById('sexChoose');
     var identityChoose=document.getElementById('identityChoose');
     //var passPlace=document.getElementById('passPlace');
     var destination=document.getElementById('destination');
     //var specificPlace=document.getElementById('specificPlace');
	timeChoose.onchange=function(){
		search();
	}
	peopleChoose.onchange=function(){
		search();
	}
	sexChoose.onchange=function(){
		search();
	}
	identityChoose.onchange=function(){
		search();
	}
    // passPlace.onchange=function(){
    //     search();
    // }
    // specificPlace.onchange=function(){
    //     search();
    // }
	function search(){
	  //       var cityChoice=document.getElementById('cityChoice');
      //       var timeChoose=document.getElementById('timeChoose');
      //       var peopleChoose=document.getElementById('peopleChoose');
      //       var sexChoose=document.getElementById('sexChoose');
      //       var identityChoose=document.getElementById('identityChoose');
            var cityC=cityChoice.value;
            var timeC=timeChoose.value;
            var peopleC=peopleChoose.value;
            var sexC=sexChoose.value;
            var identityC=identityChoose.value;
            //var passPlaceC=passPlace.value;
            var destinationC=destination.value;
            //var specificPlaceC=specificPlace.value;
            window.onmousewheel = document.onmousewheel =function(){}; 
            var data = {
            city:cityC,
            time:timeC,
            people:peopleC,
            sex:sexC,
            identity:identityC,
            // passPlace:passPlaceC,
            destination:destinationC
            // specificPlace:specificPlaceC
         };
       $.ajax({
            url: 'http://127.0.0.1:1234/TByCity',
            dataType: 'json',
            data:data,
            cache: false,
            timeout: 5000,
        success: function(data) {
            layout.innerHTML="";
            if(data==""){
                    layout.innerHTML="<div class='txt' style='height:350px;background: url(/sorry2.png) no-repeat 0px 0px;'></div>";
            }else{
                 setTogether(data); 
             if(i=data.length){
               layout.innerHTML=layout.innerHTML+"<div style='text-alian:center;line-height:30px;width: 800px;text-align:center;margin-top: 10px;margin-left:350px;background-color:rgb(218,218,218)'>已加载全部</div>"
             }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
	}