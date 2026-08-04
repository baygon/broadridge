var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var packagesRouter = require("./routes/packages");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/packages", packagesRouter);

module.exports = app;
