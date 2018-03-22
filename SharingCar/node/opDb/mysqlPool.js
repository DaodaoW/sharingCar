var OptPool = require('../connectionDb/OptPools'); 
var optPool = new OptPool(); 
var pool = optPool.getPool(); 
//执行SQL语句 
pool.getConnection(function(err,conn){ 
    //----插入 
    var userAddSql = 'insert into User (id,userName,password) values(?,?,?)'; 
    var param = [3,'bbb','ccc'];
    conn.query(userAddSql,param,function(err,rs){
        if(err){ 
            console.log('insert err:',err.message); 
            return; 
        } 
        console.log('insert success'); 
        //conn.release(); //放回连接池
    })
    //查询 
    conn.query('SELECT * from user', function(err, rs) { 
        if (err) { 
            console.log('[query] - :'+err); 
            return; 
        }   
        for(var i=0;i<rs.length;i++){
            console.log(rs[i].userName); 
        }
        conn.release(); //放回连接池
    });
});