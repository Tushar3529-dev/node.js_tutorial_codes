const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
/* 
// Old JSON file approach
// const user = require("./MOCK_DATA.json"); 
*/

const app = express();
const PORT = 5726;

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/database-1")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// ✅ Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true , unique: true },
  gender: { type: String, required: true },
  job_title: { type: String, required: true }
}, { timestamps: true });

// ✅ Model (collection will be `users`)
const User = mongoose.model("User", userSchema);

// ✅ Middleware
app.use(express.urlencoded({ extended: false }));

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

// ✅ Get all users
app.get("/api/user", async (req,res)=> {
  res.setHeader('X-MyName', 'Tushar'); // Custom headers
  res.setHeader('X-Custom-Header', 'CustomValue'); // Always add X to custom headers

  const allDBUserJson = await User.find({});
  res.json(allDBUserJson);

  /* // Old JSON file approach
  return res.json(user);
  */
});

// ✅ Render users as HTML
app.get("/user", async (req,res)=> {
  const allDbUser = await User.find({});
  const html =`
    <html>
      <head>
        <title>User List</title>
      </head>
      <body>
        <h1> Users </h1>
        <ul>
          ${allDbUser.map((u) => `<li>${u.firstName} ${u.lastName}  -- ${u.email}</li>`).join('')}
        </ul>
      </body>
    </html>
  `;
  res.send(html);
});

// ✅ Get / Update / Delete by ID
app.route("/api/user/:id")
.get(async (req, res) => {
  const userbyid = await User.findById(req.params.id);
  if(!userbyid){
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  res.json(userbyid);

  /* // Old JSON code
  const id = parseInt(req.params.id);
  const founduser = user.find(u => u.id === id);
  res.json(founduser);
  */
})

.patch(async (req, res) => {
  const body = req.body;
  const update={...body,lastName:"Changed"}
  const updatedUser = await User.findByIdAndUpdate(req.params.id, update, { new:true });
  if (!updatedUser) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  res.json({ status: "success", updatedUser });

  /* // Old JSON code
  const id = parseInt(req.params.id);
  const userIndex = user.findIndex(u => u.id === id);
  user[userIndex] = { ...user[userIndex], ...body };
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err) => {
    if (err) return res.status(500).json({ status: "error" });
    return res.json({ status: "success" });
  });
  */
})

.delete(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  return res.json({ status: "success", deletedUser });

  /* // Old JSON code
  const id = parseInt(req.params.id);
  const userIndex = user.findIndex(u => u.id === id);
  user.splice(userIndex, 1);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err) => {
    if (err) return res.status(500).json({ status: "error" });
    return res.json({ status: "success" });
  });
  */
});

// ✅ Create a new user
app.post("/api/user", async(req, res) => {
  const body = req.body;

  if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }

  console.log("Creating user:", body);

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title
  });

  console.log("User created:", result);
  return res.status(201).json({ status: "success", result });

  /* // Old JSON code
  user.push({...body, id: user.length + 1});
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err) => {
    if (err) return res.status(500).json({ status: "error" });
    return res.status(201).json({ status: "success" });
  });
  */
});

