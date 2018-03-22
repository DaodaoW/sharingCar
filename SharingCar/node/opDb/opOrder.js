        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 opOrder:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
       if(req.query.active=="接单"){
        var select='UPDATE `order` SET condtion = "车在途中",driver="'+req.query.driver+'" , driverTel="'+req.query.driverTel+'" WHERE orderNum='+req.query.orderNum+''
             console.log(select)
             conn.query(select, function(err,rs) { 
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
       }else if(req.query.active=="取消"){
             var select='UPDATE `order` SET condtion = "已取消" WHERE orderNum='+req.query.orderNum+''
             console.log(select)
             conn.query(select, function(err,rs) { 
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
       }else if(req.query.active=="确认"){
             var select='UPDATE `order` SET condtion = "已完成" WHERE orderNum='+req.query.orderNum+''
             console.log(select)
             conn.query(select, function(err,rs) { 
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
       }
     
      });
    },
  lookOrder:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
       conn.query('select  * from `order`,`user` where `order`.passenger=`user`.`name` && driver="'+req.query.driver+'" order by date desc', function(err,rs) { 
                       if (err){ 
                        //console.log('select  * from `order`,`user` where order.`passenger`=`user`.`name` && where driver="'+req.query.driver+'" order by date desc')
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