        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
 module.exports={
 userInfo:function(req, res) {
       pool.getConnection(function(err,conn){
        conn.query( 'select * from user where name = "'+req.query.user+'"', function(err, rs) { 
            if (err) { 
                //console.log('[query] - :'+err); 
                return; 
              }else{
                          //console.log(rs)
                          res.send(rs);
                          res.end();
              }
                conn.release(); //放回连接池
        });
      });
    }
}