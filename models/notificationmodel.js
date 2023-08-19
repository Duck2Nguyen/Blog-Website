const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        data: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Noti", notificationSchema);
