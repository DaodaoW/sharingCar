        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
 module.exports={
 order:function(req, res) {
       pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
       if(req.query.lookOrder==0){
            var select='select Ptel,driverTel,city,condtion,passenger,driver,date,orderNum,SPlace,EPlace from `order` where  passenger=';
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

        select=select+"&&"+"condtion='未完成' || passenger='"+req.query.userN+"' && condtion='已取消'";
        console.log(select)
       }
        if(req.query.accept!=0){
        select=select+"&&"+"condtion='车在途中'";
       }
       //console.log(select+"order by orderNum desc limit "+''+(req.query.page-1)*3+''+",3")
        conn.query(select+"order by orderNum desc limit "+''+(req.query.page-1)*4+''+",4", function(err, rs) { 
            if (err) { 
              return; 
              }else{
              res.json(rs);
              res.end();
            }
        });
       }else{
       var select='select Ptel,driverTel,city,condtion,passenger,driver,date,orderNum,SPlace,EPlace from `order` where  driver="无"';
       // console.log(select+"order by orderNum desc limit "+''+(req.query.page-1)*3+''+",3") 
        if(req.query.bestNew!=2){
          // 'select count(*) as page from `order` where condtion="未完成"';
        select='select Ptel,driverTel,city,condtion,passenger,driver,date,orderNum,SPlace,EPlace from `order` where  condtion="未完成"';
        if(req.query.time!=""){
        select=select+"&&"+"date="+'"'+req.query.time+'"';
       }
        if(req.query.city!=""){
        select=select+"&&"+"city="+'"'+req.query.city+'"';
       }
       }
        if(req.query.myOrder!=2){
        select='select Ptel,driverTel,city,condtion,passenger,driver,date,orderNum,SPlace,EPlace from `order` where condtion="车在途中" && driver='+'"'+req.query.userN+'"';
        if(req.query.time!=""){
        select=select+"&&"+"date="+'"'+req.query.time+'"';
       }
        if(req.query.city!=""){
        select=select+"&&"+"city="+'"'+req.query.city+'"';
       }
       }
        if(req.query.ap!=2){
        select='select Ptel,driverTel,city,condtion,passenger,driver,date,orderNum,SPlace,EPlace from `order` where condtion="已完成" && driver='+'"'+req.query.userN+'"';
        if(req.query.time!=""){
        select=select+"&&"+"date="+'"'+req.query.time+'"';
       }
        if(req.query.city!=""){
        select=select+"&&"+"city="+'"'+req.query.city+'"';
       }
       }
        conn.query(select+"order by orderNum desc limit "+''+(req.query.page-1)*3+''+",3", function(err, rs) { 
            if (err) { 
              return; 
              }else{
              res.json(rs);
              res.end();
            }
        });
       }
        conn.release(); //放回连接池
      });
    },
  MOrder:function(req,res){
      pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
        conn.query('select `user`.picture,Ptel,driverTel,city,condtion,passenger,driver,date,orderNum,SPlace,EPlace from `order`,`user` where  passenger="'+req.query.userName+'" && `user`.name=passenger order by date desc', function(err, rs) { 
            if (err) { 
                return; 
              }else{
                   res.json(rs);
                   res.end();
            }
        });
               conn.release();
      });
  },
   MgetOrder:function(req,res){
      pool.getConnection(function(err,conn){
       res.set('Content-Type','application/json');
        conn.query('select `user`.picture,Ptel,driverTel,city,condtion,passenger,driver,date,orderNum,SPlace,EPlace from `order`,`user` where `user`.name=`order`.passenger && condtion="未完成" order by date desc', function(err, rs) { 
            if (err) { 
                return; 
              }else{
                   res.json(rs);
                   res.end();
            }
        });
               conn.release();
      });
  }
}