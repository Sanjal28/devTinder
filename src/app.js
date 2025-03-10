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
  await user.save();
  res.send("User created successfully");
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
