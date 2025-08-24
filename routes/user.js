const express = require("express");
const { handleGetAllUser,handleGetUserById,handlePatchUserById, handleDeleteUserById ,handlePostUserById, handleGetUserbyHtml} = require("../controllers/user");

const router = express.Router();


router.route("/").get( handleGetAllUser).post(handlePostUserById);


  

// ✅ Render users as HTML
router.get("/html", handleGetUserbyHtml);

// ✅ Get / Update / Delete by ID
router.route("/:id")
.get(handleGetUserById)
.patch(handlePatchUserById)
.delete(handleDeleteUserById);
module.exports=router;