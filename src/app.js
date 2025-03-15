const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

// middleware to convert json data to js object
app.use(express.json());
app.post("/signup", async (req, res) => {
  // creating a new instance of User model
  const user = new User(req.body);
  // const  user=new User({
  //   firstName:"Sanjal",
  //   lastName:"S",
  //   emailId:"sanjal@gmail.com",
  //   password:"sanjal123",
  //   age:21
  // })
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.send("Error in creating user!!!");
  }
});
//getting user form DB
app.get("/users", async (req, res) => {
  const userMail = req.body.emailId;
  try {
    const usersData = await User.find({ emailId: userMail });
    if (usersData.length === 0) {
      res.send("User not found");
    } else {
      res.send(usersData);
    }
  } catch (err) {
    res.send("Error in fetching user");
  }
});
// getting all users from DB
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.send("Error in fetching users");
  }
});
// updating user in DB
app.patch("/users/:userId", async (req, res) => {
  const userId=req.params?.userId;
  try{
    const AllowedUpdates=["photoUrl","about","skills","gender","age"];
    const isAllowedUpdates=Object.keys(req.body).every((k)=>AllowedUpdates.includes(k));
    if(!isAllowedUpdates){
      throw new Error("Invalid updates");
    }
    if(req.body?.skills.length>10){
      throw new Error("Skills should not be more than 10");
    }
    await User.findByIdAndUpdate(userId,req.body,{
      // options
      runValidators:true,
      returnDocument:"after",
    });
    res.send("User updated successfully");
  }catch(err){
    res.send("Error in updating user!!!"+err.message);
  }
});
// deleting user from DB
app.delete("/users", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.send("Error in deleting users");
  }
});
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
