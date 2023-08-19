const express = require("express");

const { add_comment, getAllCommentsByBlogId, deteleComment, editComment } = require("../controllers/commentController");

const route_comment = express.Router();

route_comment.route("/createcomment").post(add_comment);
route_comment.route("/getallcomments").get(getAllCommentsByBlogId);
route_comment.route("/editcomment").post(editComment);
route_comment.route("/deletecomment").post(deteleComment);

module.exports = route_comment;
