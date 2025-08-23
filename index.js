 const express = require("express");

 const fs =require("fs");

 const user =require("./MOCK_DATA.json");

 const app = express();

 const PORT = 5726;

 // MIdleWare
 app.use(express.urlencoded({extended: false}));

 app.listen(PORT, () => {
   console.log(`✅ Server is listening on port ${PORT}`);
 });



 app.get("/api/user", (req,res)=> {
   res.json(user);
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
 const founduser = user.find(u => u.id === id);

   res.json(founduser);

}).patch( (req, res) => {
//ToDo : Edit the user information
}).delete( (req, res) => {
    //ToDo: Delete the user
});

app.post("/api/user", (req, res) => {
    //ToDO :  Create a user 
    // I have use postman for this 

    const body=req.body;
    console.log("Creating user:", body);
       user.push({...body, id: user.length + 1});
fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err) => {
    if (err) {
        console.error("Error writing file:", err);
        return res.status(500).json({ status: "error" });
    }

    return res.json({ status: "success" });
});
});
