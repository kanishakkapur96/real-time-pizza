const express = require("express");
const app = express();
const path = require("path");

const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");

const PORT = process.env.PORT || 3000;

// set templating engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "resources/views"));
app.set("view engine", "ejs");

//Assets
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home"); //relative path to views
});

app.get("/cart", (req, res) => {
  res.render("customers/cart");
});

app.get("/login", (req, res) => {
  res.render("auth/login");
});

app.get("/register", (req, res) => {
  res.render("auth/register");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
