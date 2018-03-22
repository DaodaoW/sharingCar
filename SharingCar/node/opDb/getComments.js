        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 comments:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      conn.query('select  discuss.CId,`user`.picture,discuss.date,discuss.name,discuss.tId,comment from discuss,`user` where discuss.`name`=`user`.`name` && discuss.tId="'+req.query.comments+'"order by CId desc', function(err,rs) { 
                       if (err){ 
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