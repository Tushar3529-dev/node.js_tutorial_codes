/* const http =require("http");
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
}); */

/* const http = require("http");
const fs = require("fs");

// Create server
const myServer = http.createServer((req, res) => {
  const log = `${Date.now().toString()}: New Request received for ${req.url}\n`;

  // Save every request in log.txt
  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });

  // Check URL (path) of request using switch
  switch (req.url) {
    case "/": // Home page
      res.end("🏠 Welcome to the Home Page");
      break;

    case "/about": // About page
      res.end("ℹ️ This is the About Page");
      break;

    case "/contact": // Contact page
      res.end("📞 Contact us at contact@example.com");
      break;

    default: // If path doesn’t match
      res.end("❌ 404 Page Not Found");
  }
});

// Server listening on port 8001
myServer.listen(8001, () => {
  console.log("✅ Server is listening on port 8001");
});
 */

const express = require("express");

const app =express();

app.get("/", (req,res)=>{
  res.send("Hello from Express!");
});

app.listen(5726,()=>{
console.log("✅ Server is listening on port 5726");
});


 