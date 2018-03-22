        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
 module.exports={
 checkUser:function(req, res) {
 	     // var callback = req.query.callback;  //获得请求端回调函数
        //console.log("server accept: ", req.query.user, req.query.password);
       var name=req.query.user; 
       // console.log(req.query.user)
       pool.getConnection(function(err,conn){
        conn.query( 'select * from user where name = '+'"'+name+'"', function(err, rs) { 
            if (err) { 
                //console.log('[query] - :'+err); 
                return; 
              }
        	          if(rs!=""){
                      if(rs[0].password==req.query.password){         
                         //var data = "{" + "name:'" + str.name + "'," + "id:'" + str.id + "'" + "}";
                          var data = { back:'success',order:'http://localhost:1234/order.html',picture:rs[0].picture,user:rs[0].name,tel:rs[0].tel,sex:rs[0].sex,identity:rs[0].identity};
                          //var json = callback + '(' + data + ')';
                          res.json(data);
                          res.end();
                        }else{
                          var data = {back:'fail'};
                          //var json = callback + '(' + data + ')';
                           res.json(data);
                          res.end();
                        }
              }else if(rs==""){
       	                  var data = {back:'fail'};
       	                  //var json = callback + '(' + data + ')';
    	                    res.json(data);  
    	                    res.end();
              }
                conn.release(); //放回连接池
        });
     });
    }
}