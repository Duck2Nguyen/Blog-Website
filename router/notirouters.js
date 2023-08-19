const express = require("express");

const { init_noti, getNotiByUserId } = require("../controllers/notiController");

const route_noti = express.Router();

route_noti.route("/init-noti").post(init_noti);
route_noti.route("/get-noti").get(getNotiByUserId);
// route_noti.route("/edit-like").put(editLike);

module.exports = route_noti;
