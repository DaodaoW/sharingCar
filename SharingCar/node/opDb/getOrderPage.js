var OptPool = require('../connectionDb/OptPools'); 
var optPool = new OptPool(); 
var pool = optPool.getPool();
var express = require('express');
 module.exports={
 getOrderPage:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
       // console.log(req.query.lookOrder)
       if(req.query.lookOrder==0){
           var select='select count(*) as page from `order` where passenger='
       if(req.query.userN!=""){
        select=select+'"'+req.query.userN+'"';
       }
        if(req.query.time!=""){
        select=select+"&&"+"date="+'"'+req.query.time+'"';
       }
        if(req.query.city!=""){
        select=select+"&&"+"city="+'"'+req.query.city+'"';
       }
        if(req.query.fin!=0){
        select=select+"&&"+"condtion='已完成'";
       }
        if(req.query.unfin!=0){
        select=select+"&&"+"condtion='未完成'|| passenger='"+req.query.userN+"' && condtion='已取消'";
       // console.log(select)
       }
        if(req.query.accept!=0){
        select=select+"&&"+"condtion='车在途中'";
       }
        conn.query(select, function(err, rs) { 
            if (err) { 
              return; 
              }else{
              res.json(rs[0]);
              res.end();
            }
        });
       }else{
     var select='select count(*) as page from `order` where condtion="未完成"';
        
       if(req.query.bestNew!=2){
        select='select count(*) as page from `order` where condtion="未完成"';
        if(req.query.time!=""){
        select=select+"&&"+"date="+'"'+req.query.time+'"';
       }
        if(req.query.city!=""){
        select=select+"&&"+"city="+'"'+req.query.city+'"';
       }
       }
        if(req.query.myOrder!=2){
        select='select count(*) as page from `order` where condtion="车在途中" && driver='+'"'+req.query.userN+'"';
        if(req.query.time!=""){
        select=select+"&&"+"date="+'"'+req.query.time+'"';
       }
        if(req.query.city!=""){
        select=select+"&&"+"city="+'"'+req.query.city+'"';
       }
       }
        if(req.query.ap!=2){
        select='select count(*) as page from `order` where condtion="已完成" && driver='+'"'+req.query.userN+'"';
        if(req.query.time!=""){
        select=select+"&&"+"date="+'"'+req.query.time+'"';
       }
        if(req.query.city!=""){
        select=select+"&&"+"city="+'"'+req.query.city+'"';
       }
       }
        //console.log(select)
        conn.query(select, function(err, rs) { 
            if (err) { 
              return; 
              }else{
              //console.log(rs[0]);
              res.json(rs[0]);
              res.end();
            }
        });
       }
               conn.release(); //放回连接池
      });
    }
}