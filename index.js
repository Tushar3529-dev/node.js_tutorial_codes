const http =require("http");
const fs =require("fs");

const myServer= http.createServer((req,res)=>{
const log =` ${Date.now().toString()}: New Request recived\n`;

fs.appendFile("log.txt", log, (err,data) => {
if (err) {
console.error("Error writing to log file:", err);
}

res.end("hello from server ");

});
});

myServer.listen(8001,()=>{
console.log("server is listening on port 8001");
});