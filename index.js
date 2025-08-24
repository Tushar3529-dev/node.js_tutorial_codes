 const express = require("express");

 const fs =require("fs");

 const user =require("./MOCK_DATA.json");

 const app = express();

 const PORT = 5726;

 // MIdleWare
 app.use(express.urlencoded({extended: false}));


app.use((req,res,next) => {
   console.log("hello from middleware 1");
   next();
});

app.use((req,res,next) => {
   fs.appendFile("./logs.txt", ` \n Request: ${req.method} ${req.url}\n`, (err) => {
       if (err) {
           console.error("Error writing to log file:", err);
       }
   });
   next();
});


 app.listen(PORT, () => {
   console.log(`✅ Server is listening on port ${PORT}`);
 });



 app.get("/api/user", (req,res)=> {

    res.setHeader('X-MyName', 'Tushar'); // Custome headers

    // ALways add X to Custome headers
    res.setHeader('X-Custom-Header', 'CustomValue');

  return  res.json(user);
 });

  app.get("/user", (req,res)=> {
 const html =`
   <html>
     <head>
       <title>User List</title>
     </head>
     <body>
       <h1> Users </h1>
       <ul>
         ${user.map(u => `<li>${u.first_name} ${u.last_name}</li>`).join('')}
       </ul>
     </body>
   </html>
 `;

  res.send(html);
});


app.route("/api/user/:id").get( (req, res) => {
 const id = parseInt(req.params.id);
 if(!user){
    return res.status(404).json({ status: "error", message: "User not found" });
 }
 const founduser = user.find(u => u.id === id);

   res.json(founduser);

}).patch( (req, res) => {
//ToDo : Edit the user information]

const id = parseInt(req.params.id);

const body =req.body;

const userIndex = user.findIndex(u => u.id === id);
if (userIndex === -1) {
    return res.status(404).json({ status: "error", message: "User not found" });
}

user[userIndex] = { ...user[userIndex], ...body };
fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err) => {
    if (err) {
        console.error("Error writing file:", err);
        return res.status(500).json({ status: "error" });
    }

    return res.json({ status: "success" });
});

}).delete( (req, res) => {
    //ToDo: Delete the user

    const id = parseInt(req.params.id);

        // Find the index of the user
    const userIndex = user.findIndex(u => u.id === id);

        if (userIndex === -1) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Remove the user from the array
    user.splice(userIndex, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).json({ status: "error" });
        }

        return res.json({ status: "success" });
    });


});

app.post("/api/user", (req, res) => {
    //ToDO :  Create a user 
    // I have use postman for this 

    const body=req.body;

if(
    !body||
    !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
}

    console.log("Creating user:", body);
       user.push({...body, id: user.length + 1});
fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err) => {
    if (err) {
        console.error("Error writing file:", err);
        return res.status(500).json({ status: "error" });
    }

    return res.status(201).json({ status: "success" });
});
});
