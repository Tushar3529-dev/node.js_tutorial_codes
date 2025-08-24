const User=require("../models/user.js");


async function handleGetAllUser(req,res){
  const allDBUserJson = await User.find({});
  res.json(allDBUserJson);
}


async function handleGetUserById(req,res){
      const userbyid = await User.findById(req.params.id);
  if(!userbyid){
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  res.json(userbyid);
}

async function handlePatchUserById(req,res){
    const body = req.body;
  const update={...body,lastName:"Changed"}
  const updatedUser = await User.findByIdAndUpdate(req.params.id, update, { new:true });
  if (!updatedUser) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  res.json({ status: "success", updatedUser });
}

async function handleDeleteUserById(req,res){
      const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  return res.json({ status: "success", deletedUser });
}

async function handlePostUserById(req,res){
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
  return res.status(201).json({ status: "success", id: result._id });
}

async function handleGetUserbyHtml(req,res){
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
}

module.exports={handleGetAllUser, handleGetUserById, handlePatchUserById, handleDeleteUserById, handlePostUserById,handleGetUserbyHtml}; 