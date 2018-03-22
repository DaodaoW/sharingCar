        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
 module.exports={
 getPhoto:function(req, res) {
 	      var callback = req.query.callback;  //获得请求端回调函数
        //console.log("server accept: ", req.query.user, req.query.password);
        var name=req.query.user; 
       pool.getConnection(function(err,conn){
        conn.query( 'select * from user where name = '+'"'+name+'"', function(err, rs) { 
            if (err) { 
                //console.log('[query] - :'+err); 
                return; 
              }else{
                var data = "{"+"picture:'"+rs[0].picture+"'}";
                          var jsonp = callback + '(' + data + ')';
                          res.send(jsonp);
                          res.end();
              }
                conn.release(); //放回连接池
        });
      });
    }
}