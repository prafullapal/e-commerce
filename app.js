var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRoutes");
var authRouter = require("./routes/authRoutes");
var productRouter = require("./routes/productRoutes");
var cartRouter = require("./routes/cartRoutes");

const {
  handle_custom_error,
  page_not_found_error,
} = require("./middleware/errorHandler");

var app = express();
const db = require("./models");

app.use(logger("common"));
app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, x-access-token, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

// 404 and other custom error handler
app.use(page_not_found_error);
app.use(handle_custom_error);

module.exports = app;
