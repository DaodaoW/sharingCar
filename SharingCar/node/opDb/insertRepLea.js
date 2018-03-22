        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 insertRepLea:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      // console.log('insert into LeaveReply(WId,nameOfRep,name,date,replyWords)values('+req.query.WId+',"'+req.query.nameOfRep+'","'+req.query.nameBe+'","'+req.query.date+'","'+req.query.words+'")')
      conn.query('insert into LeaveReply(WId,nameOfRep,name,date,replyWords)values('+req.query.WId+',"'+req.query.nameOfRep+'","'+req.query.nameBe+'","'+req.query.date+'","'+req.query.words+'")', function(err,rs) { 
                       if (err){ 
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