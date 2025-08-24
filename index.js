const express = require("express");
const fs = require("fs");

const {logReqRes}=require("./middlewares/index.js")

const { connectMongoDb }=require("./connection.js");

const userRouter=require("./routes/user");


const app = express();
const PORT = 5726;

// ✅ MongoDB Connection
/* mongoose.connect("mongodb://127.0.0.1:27017/database-1")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err)); */


connectMongoDb("mongodb://127.0.0.1:27017/database-1");


// ✅ Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next) => {
  console.log("hello from middleware 1");
  next();
});

app.use(logReqRes("log.txt"));



app.use("/user",userRouter);

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});

// ✅ Get all users
