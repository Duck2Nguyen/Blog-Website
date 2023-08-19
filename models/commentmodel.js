// id: "1",
// body: "First comment",
// username: "Jack",
// userId: "1",
// parentId: null,
// createdAt: "2021-08-16T23:00:33.010+02:00",

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        blogId: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        parentId: {
            type: String,
            // required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Comment", commentSchema);