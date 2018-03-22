        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 leaveWordsRep:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      conn.query('select  LeaveReply.WId,LeaveReply.date,nameOfRep,ReplyWords,`user`.picture,LeaveReply.name from LeaveReply,leaveWords,`user` where LeaveReply.WId='+req.query.WId+' && LeaveReply.nameOfRep=`user`.`name` && LeaveReply.WId=leavewords.WId order by date desc', function(err,rs) { 
                       if (err){ 
                         //console.log("不可以"+req.query.WId)
                               return; 
                           }else{
                              //console.log(rs)
                               res.json(rs);
                               res.end();
                           }
                  });
              conn.release(); //放回连接池
      });
    }
}