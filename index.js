const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
require("./models/user");
//It uses model class definitaions hence needs to imported afterwards
require("./services/passport"); // just code from passport js to be executed

const app = express(); // single app - creates app

mongoose.connect(keys.mongoURI);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app); //authorized app route handler

const PORT = process.env.PORT || 5000;

app.listen(PORT);
