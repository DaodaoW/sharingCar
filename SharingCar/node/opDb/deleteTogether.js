        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');  
 module.exports={
 delete:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
        conn.query('delete from together where tId='+req.query.tId+'', function(err, rs) { 
            if (err) { 
              console.log('delete from together where tId='+req.query.tId+'')
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