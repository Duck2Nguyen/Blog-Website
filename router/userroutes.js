const express = require("express");
const {
  signup,
  login,
  update_profile,
  getUserByUsername
} = require("../controllers/userController");
const router_user = express.Router();

router_user.route("/signup").post(signup);
router_user.route("/login").post(login);
router_user.route("/update").post(update_profile);
router_user.route("/getUserByUsername").get(getUserByUsername);


module.exports = router_user;
