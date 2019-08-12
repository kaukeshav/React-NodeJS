const express = require("express");
const app = express(); // single app - creates app

app.get("/", (req, res) => {
  res.send({ hi: "Akshay Lr." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
