require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/dbConnection");
const titleRoute = require("./routes/title");
const taskroute = require("./routes/task");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();
app.use("/", titleRoute);
app.use("/task", taskroute);

module.exports = app;
