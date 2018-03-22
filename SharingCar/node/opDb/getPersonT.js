        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');  
 module.exports={
 personT:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
        conn.query('select  specificPlace,destination,passPlace,picture,identity,together.tId,sex,date,`user`.`name`,people,city,imageOne,imageTwo,imageThree,imageFour,text from together,user,image where together.tId=image.tId && `user`.name=together.`name` && together.`name`="'+req.query.UN+'" order by tId desc limit '+(req.query.page)*4+',4', function(err, rs) { 
            if (err) { 
                return; 
              }else{
                   res.json(rs);
                   res.end();
            }
        });
               conn.release(); //放回连接池
      });
    }
}