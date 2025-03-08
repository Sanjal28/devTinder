const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sanjal:sanjal2004@cluster0.b3gog.mongodb.net/devTinder"
  );
};
 module.exports = connectDB;
