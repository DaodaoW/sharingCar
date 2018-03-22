var fs=require("fs");
 module.exports={
  going:function(request, response) {
     fs.readFile("../html/"+request.path.substr(1),function(err,data){
  if(err){
   console.log(err);
   response.writeHead(404,{"Content-Type":"text/html"});
  }
  else{
   response.writeHead(200,{"Content-Type":"text/html"});
   response.write(data.toString());
  }
  response.end();
 });
    }
}