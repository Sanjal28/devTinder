const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// middleware to convert json data to js object
app.use(express.json());
// middleware to read cookies
app.use(cookieParser());
// middleware to enable cross-origin resource sharing
app.use(cors({
  origin: "http://localhost:5173",//frontend url
  credentials: true,
}));

// routes
const authRouter = require("./routes/authentication");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

// using routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/",userRouter)



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
