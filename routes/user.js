const express = require("express");
const router = express.Router();
const { handleGetAllUsers,
    handleGetUserById,
    handleIUpdateUserById,
    handleDeleteUserById,
    handleCreateUser} = require('../controllers/user')

router
.route("/")
.get(handleGetAllUsers)
.post(handleCreateUser);


router
.route("/:id").get(handleGetUserById)
.patch(handleIUpdateUserById)
.delete(handleDeleteUserById);


module.exports = router;