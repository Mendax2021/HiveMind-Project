import express from "express";
const app = express(); // creates an express application
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT);
