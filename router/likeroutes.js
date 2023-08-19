const express = require("express");

const { init_like, getLikeByBlogId, editLike } = require("../controllers/likeController");

const route_like = express.Router();

route_like.route("/init-like").post(init_like);
route_like.route("/get-like").get(getLikeByBlogId);
route_like.route("/edit-like").put(editLike);

module.exports = route_like;
