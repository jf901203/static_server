var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')


function staticRoot(staticPath, req, res){
     
    var pathObj = url.parse(req.url, true)
    console.log(pathObj)
    if(pathObj.pathname==='/'){
        pathObj.pathname+='index.html'
    }
    var filePath = path.join(staticPath, pathObj.pathname)
    // 以同步二进制读取文件内容
    // var fileContent = fs.readFileSync(filePath,'binary')
    // // 
    // res.write(fileContent, 'binary')
    // res.end()
    
    //  以异步的方式读取文件内容
    fs.readFile(filePath,'binary',function (err,data) {
     if(err){
       res.writeHead(404,'not find')
       res.end("<h1>404 not find<h1>")
     }else{
       res.writeHead(200,'ok')
       res.write(data,'linary')
       res.end()
     }

      })
  

  

}

var server = http.createServer(function(req, res){
    // __dirname:当前执行代码的文件夹
    staticRoot(path.join(__dirname, 'static'), req, res)
  })

server.listen(8080)




