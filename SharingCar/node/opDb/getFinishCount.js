        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 getFinishCount:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      //console.log(req.query.localDate2);   
      conn.query('select count(*) as num from `order` where condtion="已完成" && passenger="'+req.query.name+'"', function(err,rs) { 
                       if (err){ 
                          console.log("不可以");
                               return; 
                           }else{
                              //console.log("可以");
                              console.log(rs)
                              res.json(rs);
                              res.end();
                           }
                  });
              conn.release(); //放回连接池
      });
    }
}