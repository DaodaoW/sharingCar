        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
    Photo:function(req, res) {
      pool.getConnection(function(err,conn){
      conn.query('update `user` set picture="'+req.query.photo+'" where name="'+req.query.userName+'"', function(err,rs) { 
                       if (err){ 
                          console.log("不可以");
                               return; 
                           }else{
                              res.json(rs);
                              res.end();
                           }
                  });
              conn.release(); //放回连接池
            });
    },
   changeUser:function(req, res) {
      pool.getConnection(function(err,conn){
      conn.query('update `user` set sex="'+req.query.sex+'", tel="'+req.query.tel+'" , `name`="'+req.query.username+'" where name="'+req.query.userName+'"', function(err,rs) { 
                       if (err){ 
                          console.log("不可以");
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