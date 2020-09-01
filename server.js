require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")(session);

const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");

const PORT = process.env.PORT || 3000;

// Database connection
const url = "mongodb://localhost/pizza";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Connection failed...");
  });

//Session store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});
//Session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { max: 1000 * 60 * 60 * 24 },
  })
);

app.use(flash());
// set templating engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "resources/views"));
app.set("view engine", "ejs");

//Assets
app.use(express.static("public"));

app.use(express.json());

//global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
