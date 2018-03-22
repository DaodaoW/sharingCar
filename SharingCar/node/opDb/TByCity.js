        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 TByCity:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
       // req.query.city=together.city;
       //console.log(req.query.city);
       var select= 'select specificPlace,destination,passPlace,together.tId, picture,identity,sex,date,`user`.`name`,people,city,imageOne,imageTwo,imageThree,imageFour,text from together,user,image where together.tId=image.tId && `user`.name=together.`name`';
       if(req.query.city!=""){
        select=select+"&& together.city="+'"'+req.query.city+'"';
       }
       // if(req.query.passPlace!=""){
       //  select=select+"&& together.passPlace like"+'"%'+req.query.passPlace+'%"';
       // }
       if(req.query.destination!=""){
        select=select+"&& together.destination="+'"'+req.query.destination+'"';
       }
       //  if(req.query.specificPlace!=""){
       //  select=select+"&& together.specificPlace like"+'"%'+req.query.specificPlace+'%"';
       // }
       if(req.query.time!=""){
        select=select+"&& together.date="+'"'+req.query.time+'"';
       }
       if(req.query.people!=""){
        select=select+"&& together.people="+'"'+req.query.people+'"';
       }
       if(req.query.sex!="全部"){
        if(req.query.sex=="男"){
          req.query.sex="man";
          select=select+"&& user.sex="+'"'+req.query.sex+'"';
        }else{
          req.query.sex="woman";
          select=select+"&& user.sex="+'"'+req.query.sex+'"';
        }
       }
       if(req.query.identity!="全部"){
          select=select+"&& user.identity="+'"'+req.query.identity+'"';
       }
       //console.log(select+'order by tId desc')
        conn.query(select+'order by tId desc', function(err, rs) { 
            if (err) { 
                return; 
              }else{
                 res.json(rs);
                 res.end();
              }

              conn.release(); //放回连接池
        });

      });
    }
}