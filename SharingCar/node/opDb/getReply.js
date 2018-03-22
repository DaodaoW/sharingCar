        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 reply:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      conn.query('select reply.CId,RId,answer,reply.date,OtherName,reply.name,`user`.picture from reply,discuss,`user` where `user`.name=reply.name && reply.CId=discuss.CId && discuss.CId="'+req.query.CId+'"', function(err,rs) { 
                       if (err){ 
                               return; 
                           }else{
                            if(rs==""){
                              var data = {back:"no"};
                              res.json(data);
                              res.end();
                             }else{
                              //console.log(rs)
                               res.json(rs);
                               res.end();
                             }
                           }
                  });
              conn.release(); //放回连接池
      });
    }
}