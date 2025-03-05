const express = require("express");
const app = express();

app.use("/admin", (req, res,next) => {
  //middleware
  const token="xyz";
  const isAuthicated= token==="xyz";
  if(!isAuthicated){
    res.status(401).send("Not Authenticated");
  }else{
    next();
  }
});
app.get("/admin/data", (req, res) => {
  res.send("Data Sent Successfully");
});
app.get("/admin/del", (req, res) => {
  res.send("User data deleted successfully");
});


app.use("/", (req, res) => {
  res.send("Hello from  server");
});
app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
