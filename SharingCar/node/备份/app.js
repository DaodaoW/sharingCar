var express = require('express');
var app = express();
var str={'name':'12312','id':'ggg'};

app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})
 
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})
 
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send(str);
})
 
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})
 
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})
 app.get('/ajax/deal', function(req, res) {
    console.log("server accept: ", req.query.name, req.query.id)
    var data = "{" + "name:'" + str.name + "'," + "id:'" + str.id + "'" + "}";
    var callback = req.query.callback;  //获得请求端回调函数
    var jsonp = callback + '(' + data + ')';
    console.log(jsonp);
    res.send(jsonp);
    res.end();
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log("http://:", host, port);
 
})