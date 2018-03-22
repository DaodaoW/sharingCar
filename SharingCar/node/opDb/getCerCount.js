        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 getCerCount:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      //console.log(req.query.localDate2);   
      conn.query('select count(*) as num from certification where condtion="待审核" &&`name`="'+req.query.userName+'"', function(err,rs) { 
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
    },
    insertCer:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      //console.log('insert all into certification(name,plates,color,model,condtion,age) values("'+req.query.userName+'","'+req.query.cer1+'","'+req.query.cer3+'","'+req.query.cer2+'","待审核","'+req.query.cer4+'") into drivercard(realName,licenseNumber,firstDate,startDate,expDate,motor,registerDate,name) values("'+req.query.cer5+'","'+req.query.cer6+'","'+req.query.cer7+'","'+req.query.cer8+'","'+req.query.cer9+'","'+req.query.userName+'")');   
      conn.query('insert into certification(name,plates,color,model,condtion,age) values("'+req.query.userName+'","'+req.query.cer1+'","'+req.query.cer3+'","'+req.query.cer2+'","待审核","'+req.query.cer4+'")', function(err,rs) { 
                       if (err){ 
                          console.log("不可以");
                               return; 
                           }else{
                            //console.log('insert into drivercard(realName,licenseNumber,firstDate,startDate,expDate,motor,registerDate,name) values("'+req.query.cer5+'","'+req.query.cer6+'","'+req.query.cer7+'","'+req.query.cer8+'","'+req.query.cer9+'","'+req.query.cer10+'","'+req.query.cer11+'","'+req.query.userName+'")')
                             conn.query('insert into drivercard(realName,licenseNumber,firstDate,startDate,expDate,motor,registerDate,name) values("'+req.query.cer5+'","'+req.query.cer6+'","'+req.query.cer7+'","'+req.query.cer8+'","'+req.query.cer9+'","'+req.query.cer10+'","'+req.query.cer11+'","'+req.query.userName+'")', function(err,rs) { 
                                if (err){ 
                                  console.log("不可以");
                                  return; 
                                     }else{
                                        var data = {back:"ok"};
                                        res.json(data);
                                        res.end();
                                   }
                               });
                           }
                  });
              conn.release(); //放回连接池
      });
    },
    getCer:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
      //console.log(req.query.localDate2);   
      conn.query('select plates,color,model,age from certification where `name`="'+req.query.userName+'"', function(err,rs) { 
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