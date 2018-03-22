        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 insertCom:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      console.log('insert into discuss(comment,tId,name,date)values("'+req.query.discuss+'",'+req.query.tId+',"'+req.query.auther+'","'+req.query.localDate2+'")');   
      conn.query('insert into discuss(comment,tId,name,date)values("'+req.query.discuss+'",'+req.query.tId+',"'+req.query.auther+'","'+req.query.localDate2+'")', function(err,rs) { 
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