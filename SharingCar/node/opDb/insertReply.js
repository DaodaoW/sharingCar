        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 insertReply:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      console.log('insert into reply(answer,CId,name,date,OtherName)values("'+req.query.reply+'",'+req.query.CId+',"'+req.query.auther+'","'+req.query.localDate+'","'+req.query.autherTwo+'")');
      conn.query('insert into reply(answer,CId,name,date,OtherName)values("'+req.query.reply+'",'+req.query.CId+',"'+req.query.auther+'","'+req.query.localDate+'","'+req.query.autherTwo+'")', function(err,rs) { 
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