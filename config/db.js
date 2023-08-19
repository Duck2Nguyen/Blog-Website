const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const db = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(
      "mongodb+srv://hainguyenduc:nxh1DtrYvqYu3ZmX@cluster0.rl59x5c.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((result) => {
      console.log("Database connected");
      return true;
    })
    .catch((err) => {
      console.log("errror");
      return false;
    });
};
module.exports = db;
