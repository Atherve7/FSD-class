const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res)=>{
    if(req.url == '/'){
        fs.readFile('index.html','utf-8',(err, htmlContent)=>{
            if(err){
                res.statusCode(500);
                res.end("Internal server error");
                return;
            }
            res.setHeader('Content-Type','text/html');
            res.end(htmlContent);
        });
    }else if(req.url == '/styles.css'){
        fs.readFile('styles.css','utf-8',(err,htmlContent)=>{
            if(err){
                res.statusCode(500);
                res.end("Internal server error");
                return;
            }
            res.setHeader('Content-Type','text/html');
            res.end(cssContent);
        })
    }else {
        res.statusCode = 404;
        res.end("Page not found");
    }
})
const PORT = 3000;
server.listen(PORT,()=>{
    console.log("Server is running on port", PORT);
});