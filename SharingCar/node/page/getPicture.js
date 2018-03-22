        var OptPool = require('../connectionDb/OptPools'); 
        var optPool = new OptPool(); 
        var pool = optPool.getPool();
        var express = require('express');
        var fs=require("fs");
 module.exports={
 getPicture:function(req, res) {
    var imgData = req.query.image;
    //console.log(req.query)
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile("../picture/"+req.query.pictureName+"", dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          var data = {back:"ok"};
          res.json(data);
          res.end();
        }
    });
},
getPhoto:function(req, res) {
    var imgData = req.query.image;
    //console.log(req.query)
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile("../photo/"+req.query.pictureName+"", dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          var data = {back:"ok"};
          res.json(data);
          res.end();
        }
    });
}

}