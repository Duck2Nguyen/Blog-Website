const Comment = require("../models/commentmodel");

const add_comment = (req, res) => {
    const comment = new Comment({
        blogId: req.body.blogId,
        body: req.body.body,
        username: req.body.username,
        userId: req.body.userId,
        parentId: req.body.parentId ? req.body.parentId : null,
    });
    comment
        .save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
};


const getAllCommentsByBlogId = (req, res) => {
    Comment.find({ blogId: req.query.blogId })
        .sort({ updatedAt: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send("Error");
        });
};




const editComment = (req, res) => {
    const id = req.body.id;
    Comment.findByIdAndUpdate(id, {
        blogId: req.body.blogId,
        body: req.body.body,
        username: req.body.username,
        userId: req.body.userId,
        parentId: req.body.parentId ? req.body.parentId : null,
    })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
};



const deteleComment = (req, res) => {
    const id = req.body.id;
    Comment.findByIdAndDelete(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
};



module.exports = { add_comment, getAllCommentsByBlogId, deteleComment, editComment };