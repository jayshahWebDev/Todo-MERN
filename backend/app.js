require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/dbConnection");
const titleRoute = require("./routes/title");
const taskroute = require("./routes/task");
const userroute = require("./routes/user");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dbConnection();
app.use("/", userroute);
app.use("/title", titleRoute);
app.use("/task", taskroute);

module.exports = app;
