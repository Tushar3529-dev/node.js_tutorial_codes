 const express = require("express");

 const user =require("./MOCK_DATA.json");

 const app = express();

 const PORT = 5726;

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
    return res.json({status: "pending"});
});
