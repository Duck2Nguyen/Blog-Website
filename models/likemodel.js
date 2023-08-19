const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
    {
        blogId: {
            type: String,
            required: true,
        },
        listUserId: {
            type: Array,
        },
        count: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Like", likeSchema);
