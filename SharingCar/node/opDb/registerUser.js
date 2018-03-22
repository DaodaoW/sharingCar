        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 register:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      console.log('insert into user(password,tel,name,identity,picture,sex)values("'+req.query.password+'",'+req.query.tel+',"'+req.query.userName+'","乘客","/avtar.png","man")');
      conn.query('insert into user(password,tel,name,identity,picture,sex)values("'+req.query.password+'",'+req.query.tel+',"'+req.query.userName+'","乘客","/avtar.png","man")', function(err,rs) { 
                       if (err){ 
                          console.log("不可以");
                               return; 
                           }else{
                              //console.log("可以");
                              var data = {back:"ok"};
                              res.json(data);
                              res.end();
                           }
                  });
              conn.release(); //放回连接池
      });
    }
}