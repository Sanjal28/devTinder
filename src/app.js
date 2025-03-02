const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send("This handles the GET request for /user");
});
app.post("/user", (req, res) => {
  res.send("This handles the POST request for /user");
});
app.use("/hello/2", (req, res) => {
  res.send("Hello");
});
app.use("/hello", (req, res) => {
  res.send("Testing Phase....");
});

app.use("/", (req, res) => {
  res.send("Hello from  server");
});
app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
