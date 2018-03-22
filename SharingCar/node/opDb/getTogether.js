        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
       
 module.exports={
 together:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
        conn.query('select specificPlace,destination,passPlace,picture,together.tId,identity,sex,date,`user`.`name`,people,city,imageOne,imageTwo,imageThree,imageFour,text from together,user,image where together.tId=image.tId && `user`.name=together.`name` order by date desc limit '+(req.query.page)*4+',4', function(err, rs) { 
            if (err) { 
                return; 
              }else{
                   res.json(rs);
                   res.end();
            }
        });
               conn.release(); //放回连接池
      });
    },
 getOne:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
        conn.query('select specificPlace,destination,passPlace,picture,together.tId,identity,sex,date,`user`.`name`,people,city,imageOne,imageTwo,imageThree,imageFour,text from together,user,image where together.tId=image.tId && `user`.name=together.`name` &&together.tId='+req.query.tId+'', function(err, rs) { 
            if (err) { 
                return; 
              }else{
                   res.json(rs);
                   res.end();
            }
        });
               conn.release();
      });
    },
getsameCity:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
       // console.log('select specificPlace,destination,passPlace,picture,together.tId,identity,sex,date,`user`.`name`,people,city,imageOne,imageTwo,imageThree,imageFour,text from together,user,image where together.tId=image.tId && `user`.name=together.`name` && together.city='+req.query.city+'')
        conn.query('select specificPlace,destination,passPlace,picture,together.tId,identity,sex,date,`user`.`name`,people,city,imageOne,imageTwo,imageThree,imageFour,text from together,user,image where together.tId=image.tId && `user`.name=together.`name` && together.city="'+req.query.city+'" order by date desc', function(err, rs) { 
            if (err) { 
                return; 
              }else{
                   res.json(rs);
                   res.end();
            }
        });
               conn.release();
      });
    }
}