const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Hello from  server");
});
app.get("/test", (req, res) => {
  res.send("Testing Phase....");
});
app.get("/hello", (req, res) => {
  res.send("Hello");
});
app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
