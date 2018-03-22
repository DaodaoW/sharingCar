        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 insertImage:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
       console.log(req.query.images);
       var image1,image2,image3,image4="";
       if(req.query.images==undefined){
            image1="";
            image2="";
            image3="";
            image4="";
       }else{
        if(req.query.images[0]==undefined){
              image1="";  
          }else{
              image1="<div class='imageOne' onclick='ImageOnClick(this)' style='background: url("+req.query.images[0]+") no-repeat 0px 0px;background-size:cover;'></div>";
          }
          if(req.query.images[1]==undefined){
              image2="";  
          }else{
              image2="<div class='imageOne' onclick='ImageOnClick(this)' style='background: url("+req.query.images[1]+") no-repeat 0px 0px;background-size:cover;'></div>";
          }
          if(req.query.images[2]==undefined){
              image3="";  
          }else{
              image3="<div class='imageOne' onclick='ImageOnClick(this)' style='background: url("+req.query.images[2]+") no-repeat 0px 0px;background-size:cover;'></div>";
          }
          if(req.query.images[3]==undefined){
              image4="";  
          }else{
              image4="<div class='imageOne' onclick='ImageOnClick(this)' style='background: url("+req.query.images[3]+") no-repeat 0px 0px;background-size:cover;'></div>";
          } 
       }
          
       conn.query('insert into image(tId,imageOne,imageTwo,imageThree,imageFour)values('+req.query.tId+',"'+image1+'","'+image2+'","'+image3+'","'+image4+'")', function(err,rs) {
                             if(err){
                                    res.send(err);
                                    }else{ 
                                    var data = {back:"ok"};
                                    res.json(data);
                                    res.end();           
                                 }
                            });
             conn.release();
      });
    }
}