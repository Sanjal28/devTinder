const express = require("express");
const connectDB = require("./config/database");
const User=require("./models/user");
const app = express();

app.post("/signup",async(req,res)=>{
  // creating a new instance of User model
  const  user=new User({
    firstName:"Sanjal",
    lastName:"S",
    emailId:"sanjal@gmail.com",
    password:"sanjal123",
    age:21
  })
  await user.save();
  res.send("User created successfully");
})

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



