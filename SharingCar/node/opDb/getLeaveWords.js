        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 leaveWords:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      conn.query('select  WId,date,nameOfLea,words,`user`.picture from leaveWords,`user` where leaveWords.nameOfLea=`user`.`name` && leaveWords.name="'+req.query.lookUser+'"order by date desc', function(err,rs) { 
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