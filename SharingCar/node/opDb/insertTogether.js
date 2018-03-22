        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 insertTogether:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      //console.log('insert into together(name,date,text,city,people,specificPlace,destination)values("'+req.query.name+'","'+req.query.date+'","'+req.query.text+'","'+req.query.city+'",'+req.query.people+',"'+req.query.specific+'","'+req.query.destination+'")');   
      conn.query('insert into together(name,date,text,city,people,specificPlace,destination)values("'+req.query.name+'","'+req.query.date+'","'+req.query.text+'","'+req.query.city+'",'+req.query.people+',"'+req.query.specific+'","'+req.query.destination+'")', function(err,rs) { 
                       if (err){ 
                          console.log("不可以");
                               return; 
                           }else{
                            conn.query('select LAST_INSERT_ID() as tid', function(err,rs) {
                              res.json(rs);
                              res.end();
                            });
                           }
                  });
              conn.release(); //放回连接池
      });
    }
}