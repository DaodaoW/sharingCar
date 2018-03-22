        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 reportLeave:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');  
       //console.log('insert into report(reporter,WId,reason,condtion,date)values("'+req.query.reporter+'",'+req.query.WId+',"'+req.query.text+'","待检查","'+req.query.date+'")')
      conn.query('insert into report(reporter,WId,text,reason,condtion,date)values("'+req.query.reporter+'",'+req.query.WId+',"'+req.query.text+'","'+req.query.reason+'","待检查","'+req.query.date+'")', function(err,rs) { 
                       if (err){ 
                          console.log("不可以");
                               return; 
                           }else{
                              var data = {back:"ok"};
                              res.json(data);
                              res.end();
                           }
                  });
              conn.release();
      });
    }
}