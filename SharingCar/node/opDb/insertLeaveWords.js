        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 insertWords:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      //console.log('insert into leavewords(name,nameOfLea,words,date)values("'+req.query.nameBe+'",'+req.query.nameOfLea+',"'+req.query.words+'","'+req.query.date+'")');   
      conn.query('insert into leavewords(name,nameOfLea,words,date)values("'+req.query.nameBe+'","'+req.query.nameOfLea+'","'+req.query.words+'","'+req.query.date+'")', function(err,rs) { 
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