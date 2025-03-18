const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

// middleware to convert json data to js object
app.use(express.json());
// middleware to read cookies
app.use(cookieParser());

// routes
const authRouter = require("./routes/authentication");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

// using routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



connectDB()
  .then(() => {
    console.log("Database Connected");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Error in connecting database");
  });
