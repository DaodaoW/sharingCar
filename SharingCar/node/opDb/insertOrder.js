        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 insertOrder:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      //console.log(req.query.localDate2);   
      //console.log('insert into `order`(city,condtion,passenger,driver,date,SPlace,EPlace,picture,driverTel,Ptel)values("'+req.query.city+'","'+req.query.condtion+'","'+req.query.passenger+'","暂无","'+req.query.time+'","'+req.query.SPlace+'","'+req.query.EPlace+'","/avtar.png","暂无","'+req.query.Ptel+'")')
      conn.query('insert into `order`(city,condtion,passenger,driver,date,SPlace,EPlace,driverTel,Ptel)values("'+req.query.city+'","'+req.query.condtion+'","'+req.query.passenger+'","暂无","'+req.query.time+'","'+req.query.SPlace+'","'+req.query.EPlace+'","暂无","'+req.query.Ptel+'")', function(err,rs) { 
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